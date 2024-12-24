import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ItemPlaylist from './ItemPlaylist';
import Loading from '../Loading.jsx';

const ListPlaylists = ({ playlists, isLoading, onHandlePlaylists }) => {
  // const [playlists, setPlaylists] = useState([]);
  const { authenticatedFetch, tokens } = useAuth();
  const [name, setName] = useState('');
  // const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (id) => {
    try {
      const response = await authenticatedFetch(
        `${import.meta.env.VITE_BASEURL}/playlists/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();

      if (data.status === 'success') {
        await onHandlePlaylists();
        // setName('');
      } else {
        alert('gagal delete playlist');
      }
    } catch (error) {
      console.log('terjadi kesalahan saat nambah playlist', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      name,
    };
    try {
      const response = await authenticatedFetch(
        `${import.meta.env.VITE_BASEURL}/playlists`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ name: name }),
          body: JSON.stringify(options),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.status === 'success') {
        await onHandlePlaylists();
        setName('');
      } else {
        alert('gagal membuat playlist');
      }
    } catch (error) {
      console.log('terjadi kesalahan saat nambah playlist', error);
    }
  };

  // const handlePlaylists = async () => {
  //   try {
  //     const response = await authenticatedFetch(
  //       `${import.meta.env.VITE_BASEURL}/playlists`,
  //       {
  //         method: 'GET',
  //       }
  //     );
  //     const data = await response.json();
  //     const getPlaylists = data.data.playlists;
  //     onHandlePlaylists(getPlaylists);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log('Terjadi kesalahan pada playlists', error);
  //   }
  // };

  // useEffect(() => {
  //   handlePlaylists();
  //   console.log('effect playlist');
  // }, []);

  if (isLoading)
    return (
      <main className="main mt-3">
        <div className="container text-center ">
          {/* <!-- Songs List --> */}
          <div className="row g-4">
            <Loading />
          </div>
          {/* end list */}
        </div>
        <div className="container mt-5">
          <div className="login-card mx-auto">
            <form onSubmit={handleSubmit}>
              <h4>Add Playlist</h4>
              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text border-0 bg-transparent">
                    <i className="bi bi-file-earmark-music"></i>
                  </span>
                  <input
                    id="playlist"
                    type="text"
                    className="form-control"
                    placeholder="Enter your playlist name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  return (
    <main className="main mt-3">
      <div className="container text-center ">
        {/* <!-- Songs List --> */}
        <div className="row g-4">
          {playlists.length === 0 ? (
            <h4>Anda belum mempunyai Playlist</h4>
          ) : (
            playlists.map((playlist) => (
              <ItemPlaylist
                key={playlist.id}
                playlist={playlist}
                onHandleDelete={handleDelete}
              />
            ))
          )}
        </div>
        {/* end list */}
      </div>
      <div className="container mt-5">
        <div className="login-card mx-auto">
          <form onSubmit={handleSubmit}>
            <h4>Add Playlist</h4>
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text border-0 bg-transparent">
                  <i className="bi bi-file-earmark-music"></i>
                </span>
                <input
                  id="playlist"
                  type="text"
                  className="form-control"
                  placeholder="Enter your playlist name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ListPlaylists;
