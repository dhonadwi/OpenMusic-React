import React from 'react';
import { Link } from 'react-router-dom';

const ItemSong = ({ song }) => {
  return (
    // <div className="col m-2 p-2">
    //   <div className="card ">
    //     <div className="card-body">
    //       <h5 className="card-title">{song.title}</h5>
    //       <p className="card-text">{song.performer}</p>
    //       <p className="card-text">{song.genre}</p>

    //     </div>
    //   </div>
    // </div>
    <div className="col-md-6 col-lg-4">
      <div className="card shadow-sm song-item h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="card-title mb-1">{song.title}</h5>
              <p className="text-muted mb-2">{song.performer}</p>
            </div>
            <span className="badge genre-badge-rock">{song.genre}</span>
          </div>
          <small className="text-muted">ID: {song.id}</small>
        </div>
        <div className="card-footer bg-transparent">
          <div className="d-flex justify-content-between align-items-center">
            {/* <button className="btn btn-sm btn-outline-primary">
              <i className="fas fa-play me-1"></i> Play
            </button> */}
            <Link
              to={`/song/${song.id}`}
              className="btn btn-sm btn-outline-primary"
            >
              Detail
            </Link>
            <div>
              <button className="btn btn-sm btn-light">
                <i className="far fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSong;
