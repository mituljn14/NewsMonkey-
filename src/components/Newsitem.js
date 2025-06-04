import React from 'react';
const Newsitem = (props) => { 
    let { title, description, author, url, date,imageurl} = props;
    return (
    
      <div className='my-3'>
        <div className="card" style={{ display: "flex", position: "absolute", justifyContent: "flex-end", right: "0", width: "18rem" }}> 
      
      </div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageurl?"https://static.clubs.nfl.com/image/upload/t_editorial_landscape_12_desktop/bills/udjbfztcent1cksdku82":imageurl}className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">by {!author? "unknown" :author} on {date} </small></p>
            <a rel="noreferrer" href={url} target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  }


export default Newsitem;
