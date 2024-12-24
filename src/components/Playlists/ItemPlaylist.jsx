import React from 'react';
import { Link } from 'react-router-dom';

const ItemPlaylist = ({ playlist, onHandleDelete }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card shadow-sm song-item h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="card-title mb-1">{playlist.name}</h5>
              {/* <p className="text-muted mb-2">{song.performer}</p> */}
            </div>
            <span className="badge genre-badge-rock"></span>
          </div>
          <small className="text-muted">ID: {playlist.id}</small>
        </div>
        <div className="card-footer bg-transparent">
          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/playlist/${playlist.id}`}>
              <button className="btn btn-sm btn-outline-primary">
                <i className="fas fa-play me-1"></i> Detail
              </button>
            </Link>
            <button
              onClick={() => onHandleDelete(playlist.id)}
              className="btn btn-sm btn-outline-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPlaylist;
