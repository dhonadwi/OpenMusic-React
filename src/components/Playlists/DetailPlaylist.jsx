import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';

const DetailPlaylist = () => {
  const { id } = useParams();
  const { authenticatedFetch } = useAuth();
  const [playlist, setPlaylist] = useState();
  console.log(id);

  const handlePlaylist = async () => {
    try {
      const response = await authenticatedFetch(
        `${import.meta.env.VITE_BASEURL}/playlists/${id}`
      );
      const data = await response.json();
      const getPlaylist = data.data;
      console.log(getPlaylist);
    } catch (error) {}
  };

  useEffect(() => {
    // handlePlaylist();
  }, []);
  return (
    <main className="main">
      <h3>Detail Playlist</h3>
    </main>
  );
};

export default DetailPlaylist;
