import AOS from 'aos';
import 'aos/dist/aos.css';
import About from './About';
import Contact from './Contact';
import Hero from './Hero';
import Portfolio from './Portfolio';
import Resume from './Resume';
import Services from './Services';
import Skill from './Skill';
import Status from './Status';
import Testimonials from './Testimonials';
import { useEffect } from 'react';

export default function Main() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <main className="main">
      <Hero />
      <About />
      <Status />
      <Skill />

      <Resume />

      <Portfolio />
      <Services />
      <Testimonials />

      <Contact />
    </main>
  );
}
