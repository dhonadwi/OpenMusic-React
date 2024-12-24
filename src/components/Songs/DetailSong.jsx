import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DetailSong = ({ playlists }) => {
  const params = useParams();
  const [song, setSong] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authenticatedFetch } = useAuth();

  const handleSong = async () => {
    const data = await fetch(
      `${import.meta.env.VITE_BASEURL}/songs/${params.id}`
    );
    const dataJson = await data.json();
    setSong(dataJson.data.song);
    setLoading(false);
  };

  const handleButtonPlaylist = async (playlistId) => {
    const dataBody = {
      songId: song.id,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataBody),
    };
    try {
      const response = await authenticatedFetch(
        `${import.meta.env.VITE_BASEURL}/playlists/${playlistId}/songs`,
        options
      );
      const data = await response.json();
      console.log(data.message);
      // const dataUser = data.data.user;
      // setUser(dataUser);
    } catch (error) {
      console.log('terjadi kesalahan saat mendapatkan data user', error);
    }
  };

  useEffect(() => {
    // console.log('fetch songs');
    handleSong();
  }, []);

  if (loading)
    return (
      <main className="main">
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </main>
    );
  // console.log(song);
  return (
    <main className="main">
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg">
              <div className="card-header bg-primary bg-gradient text-white p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Song Detail</h4>
                  <span className="badge bg-light text-primary">
                    {song.genre}
                  </span>
                </div>
              </div>

              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h2 className="display-6 mb-2">{song.title}</h2>
                  <h5 className="text-muted">{song.performer}</h5>
                </div>

                <div className="row g-3">
                  <div className="col-6">
                    <div className="p-3 border rounded bg-light">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-calendar-alt text-primary me-2"></i>
                        <div>
                          <small className="text-muted d-block">
                            Tahun Rilis
                          </small>
                          <strong>{song.year}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 border rounded bg-light">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-clock text-primary me-2"></i>
                        <div>
                          <small className="text-muted d-block">Durasi</small>
                          <strong>{song.duration} menit</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="bg-light p-3 rounded">
                    <small className="text-muted d-block">Song ID:</small>
                    <code>{song.id}</code>
                    <small className="text-muted d-block mt-2">Album ID:</small>
                    <code>{song.albumId}</code>
                  </div>
                </div>
              </div>

              <div className="card-footer bg-white p-3">
                <div className="d-flex justify-content-between align-items-center">
                  {/* <button className="btn btn-outline-primary">
                    <i className="fas fa-play me-2"></i>Play
                  </button> */}
                  <Link to="/">
                    <button className="btn btn-outline-danger">
                      <i className="fa fa-arrow-left"></i> Back
                    </button>
                  </Link>
                  <div className="btn-group">
                    <div className="btn-group dropend">
                      <button type="button" className="btn btn-primary">
                        Add To
                      </button>
                      <button
                        type="button"
                        className="btn btn-success dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="visually-hidden">Toggle Dropend</span>
                      </button>
                      <ul className="dropdown-menu">
                        {playlists.map((playlist) => (
                          <li key={playlist.id}>
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => handleButtonPlaylist(playlist.id)}
                            >
                              {playlist.name}
                            </button>
                          </li>
                        ))}
                        {/* <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                        <li>
                          <span className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Separated link
                          </a>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailSong;
