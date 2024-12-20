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
  const [active, setActive] = useState('Home');
  // const location = useLocation(); // Hook untuk mendapatkan lokasi saat ini

  // useEffect(() => {
  //   // Perbarui state active berdasarkan path
  //   switch (location.pathname) {
  //     case '/':
  //       setActive('Home');
  //       break;
  //     case '/about':
  //       setActive('About');
  //       break;
  //     case '/resume':
  //       setActive('Resume');
  //       break;
  //     case '/portfolio':
  //       setActive('Portfolio');
  //       break;
  //     case '/services':
  //       setActive('Services');
  //       break;
  //     case '/contact':
  //       setActive('Contact');
  //       break;
  //     default:
  //       setActive('');
  //   }
  // }, [location.pathname]);

  useEffect(() => {
    AOS.init();
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
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                {/* <Hero /> */}
                <ListSongs />
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
          <Route path="*" element={<EmbedInstagram />} />
        </Routes>
        {/* </main> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
