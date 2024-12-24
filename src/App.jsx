import Header from './components/Header';
import Hero from './components/Hero';
import Main from './components/Main';
import About from './components/About';
import {
  Route,
  Routes,
  useLocation,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import NotFound from './components/NotFound';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import EmbedInstagram from './components/EmbedInstagram';
import Login from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import ListSongs from './components/Songs/ListSongs';
import DetailSong from './components/Songs/DetailSong';
import LikedSongs from './components/Songs/LikedSongs';
import LoginOpenMusic from './components/LoginOpenMusic';
import ListPlaylists from './components/Playlists/ListPlaylists';
import DetailPlaylist from './components/Playlists/DetailPlaylist';
import Profile from './components/Users/Profile';

// Wrapper komponen untuk mengecek autentikasi
const RedirectIfAuthenticated = ({ children }) => {
  const { tokens } = useAuth();

  // Jika sudah login, redirect ke dashboard
  if (tokens.accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};
function App() {
  const [songs, setSongs] = useState([]);
  const [filterSongs, setFilterSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState('all');
  const [loading, setLoading] = useState(true);

  const handleSongs = async () => {
    const data = await fetch(`${import.meta.env.VITE_BASEURL}/songs`);
    const dataJson = await data.json();
    const songsData = dataJson.data.songs;
    setSongs(songsData);
    const uniqueGenres = [
      ...new Set(dataJson.data.songs.map((song) => song.genre)),
    ];
    setGenres(uniqueGenres);
    setFilterSongs(songsData);
    setLoading(false);
  };

  const handleGenres = (genre) => {
    setActiveGenre(genre);
    if (genre === 'all') {
      setFilterSongs(songs);
    } else {
      const filtered = songs.filter((song) => song.genre === genre);
      setFilterSongs(filtered);
    }
  };

  useEffect(() => {
    AOS.init();
    handleSongs();
  }, []);

  return (
    <AuthProvider>
      {/* {login ? <Header active={active} /> : ''} */}
      {/* <PrivateHeader>
        <Header active={active} />
      </PrivateHeader> */}
      <Router>
        {/* <main className="main"> */}
        <Routes>
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <LoginOpenMusic />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                {/* <Hero /> */}
                <ListSongs
                  filterSongs={filterSongs}
                  genres={genres}
                  activeGenre={activeGenre}
                  loading={loading}
                  onHandleGenres={handleGenres}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="favorite"
            element={
              <PrivateRoute>
                <LikedSongs
                  genres={genres}
                  activeGenre={activeGenre}
                  loading={loading}
                  onHandleGenres={handleGenres}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="playlist"
            element={
              <PrivateRoute>
                <ListPlaylists />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="resume"
            element={
              <PrivateRoute>
                <Resume />
              </PrivateRoute>
            }
          />
          <Route
            path="portfolio"
            element={
              <PrivateRoute>
                <Portfolio />
              </PrivateRoute>
            }
          />
          <Route
            path="services"
            element={
              <PrivateRoute>
                <Services />
              </PrivateRoute>
            }
          />
          <Route
            path="contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="song/:id"
            element={
              <PrivateRoute>
                <DetailSong />
              </PrivateRoute>
            }
          />
          <Route
            path="playlist/:id"
            element={
              <PrivateRoute>
                <DetailPlaylist />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<EmbedInstagram />} />
        </Routes>
        {/* </main> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
