import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import PropTypes from 'prop-types'; 
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    try {
      document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`;
      props.setProgress(10);
      setLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c3747d33ae0c404caae20d97b087673c&page=${page}&pageSize=${props.pageSize}`;
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles(parsedData.articles || []); // Ensure articles is always an array
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [page]);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      setPage(nextPage);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c3747d33ae0c404caae20d97b087673c&page=${nextPage}&pageSize=${props.pageSize}`;
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles((prevArticles) => prevArticles.concat(parsedData.articles || []));
    } catch (error) {
      console.error("Failed to fetch more news:", error);
    }
  };

  return (
    <div className='container my-3'>
      <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px' }}>
        NewsMonkey - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines
      </h1>
      {loading && <h4>Loading...</h4>}
      <InfiniteScroll
        dataLength={articles.length || 0} // Use fallback for undefined length
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<h4>Loading more news...</h4>}
      >
        <div className='row'>
          {articles?.map((element, index) => (
            <div className='col-md-4' key={element?.url || index}>
              <Newsitem
                title={element?.title ? element.title.slice(0, 45) : "No Title"} 
                description={element?.description ? element.description.slice(0, 88) : "No Description"}
                imageurl={element?.urlToImage} 
                url={element?.url}
                author={element?.author || "Unknown"} 
                date={element?.publishedAt || "Unknown"} 
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;
