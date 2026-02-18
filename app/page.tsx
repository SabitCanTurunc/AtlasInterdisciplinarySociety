'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/layout/Navigation';
import Hero from './sections/Hero';
import Vision from './sections/Vision';
import Disciplines from './sections/Disciplines';
import Events from './sections/Events';
import Publications from './sections/Publications';
import Team from './sections/Team';
import Contact from './sections/Contact';
import Footer from './components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    ScrollTrigger.defaults({ toggleActions: 'play none none reverse' });
    ScrollTrigger.refresh();
    return () => { ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#0a1628' }}>
      <Navigation />
      <main>
        <Hero />
        <Vision />
        <Disciplines />
        <Events />
        <Publications />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
