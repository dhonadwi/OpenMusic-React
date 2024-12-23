import React from 'react';
import ItemSong from './ItemSong';
import { useState } from 'react';
import { useEffect } from 'react';

const LikedSongs = ({ genres }) => {
  const [songLikes, setSongLikes] = useState([]);
  const [activeGenre, setActiveGenre] = useState('all');
  const [filterSongs, setFilterSongs] = useState([]);
  // const filterSongs = JSON.parse(localStorage.getItem('favoriteSongs') || '[]');
  // console.log(filterSongs);
  const handleGenres = (genre) => {
    setActiveGenre(genre);
    if (genre === 'all') {
      setFilterSongs(songLikes);
    } else {
      const filtered = songLikes.filter((song) => song.genre === genre);
      setFilterSongs(filtered);
    }
  };

  const getSongLikes = () => {
    const filterSongs = JSON.parse(
      localStorage.getItem('favoriteSongs') || '[]'
    );
    setSongLikes(filterSongs);
    setFilterSongs(filterSongs);
  };

  useEffect(() => {
    getSongLikes();
  }, []);
  return (
    <main className="main">
      <div className="container text-center ">
        <div className="row m-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">
                <i className="fas fa-music me-2 text-primary"></i>
                Music Collection
              </h2>
            </div>
            <hr />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className={`btn btn-sm ${
                      activeGenre === 'all'
                        ? 'btn-primary'
                        : 'btn-outline-primary'
                    }`}
                    onClick={() => handleGenres('all')}
                  >
                    All
                  </button>
                  {genres.map((genre, i) => (
                    <button
                      onClick={() => handleGenres(genre)}
                      key={i}
                      className={`btn btn-sm ${
                        activeGenre === genre
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      } capital`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {filterSongs.map((song) => (
            <ItemSong song={song} key={song.id} />
          ))}
        </div>
      </div>
    </main>
    // <>
    //   <main className="main">
    //     <h4>Liked Song</h4>
    //     {filterSongs.map((song) => (
    //       <p key={song.id}>{song.title}</p>
    //     ))}
    //   </main>
    // </>
  );
};

export default LikedSongs;
