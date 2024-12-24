import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import ItemSong from '../Songs/ItemSong';

const DetailPlaylist = () => {
  const { id } = useParams();
  const { authenticatedFetch } = useAuth();
  const [playlist, setPlaylist] = useState([]);
  const [songs, setSongs] = useState([]);
  console.log(id);

  const handlePlaylist = async () => {
    try {
      const response = await authenticatedFetch(
        `${import.meta.env.VITE_BASEURL}/playlists/${id}/songs`
      );
      const data = await response.json();
      const getPlaylist = data.data.playlist;
      const getSongs = data.data.playlist.songs;
      console.log(getPlaylist);
      setPlaylist(getPlaylist);
      setSongs(getSongs);
    } catch (error) {
      console.log('terjadi kesalahan saat ambil detail playlist', error);
    }
  };

  useEffect(() => {
    handlePlaylist();
  }, []);
  return (
    <main className="main mt-5">
      <div className="container">
        <h3>Detail Playlist {playlist.name}</h3>
        <div className="row g-4">
          {songs.map((song) => (
            <ItemSong song={song} key={song.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default DetailPlaylist;
