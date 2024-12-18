import Header from './components/Header';
import Hero from './components/Hero';
import Main from './components/Main';
import About from './components/About';
import { Route, Routes, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import NotFound from './components/NotFound';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
  const [active, setActive] = useState('Home');
  const location = useLocation(); // Hook untuk mendapatkan lokasi saat ini

  useEffect(() => {
    // Perbarui state active berdasarkan path
    switch (location.pathname) {
      case '/':
        setActive('Home');
        break;
      case '/about':
        setActive('About');
        break;
      case '/resume':
        setActive('Resume');
        break;
      case '/portfolio':
        setActive('Portfolio');
        break;
      case '/services':
        setActive('Services');
        break;
      case '/contact':
        setActive('Contact');
        break;
      default:
        setActive('');
    }
  }, [location.pathname]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Header active={active} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="about" element={<About />} />
          <Route path="resume" element={<Resume />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
