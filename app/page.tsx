'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import Vision from './sections/Vision';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    ScrollTrigger.defaults({ toggleActions: 'play none none reverse' });
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1628]">
      <main>
        <Hero />
        <Vision />
        <Gallery />
        <Contact />
      </main>
    </div>
  );
}
