'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import Vision from './sections/Vision';
import Gallery from './sections/Gallery';
import Sponsors from './sections/Sponsors';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.defaults({ toggleActions: 'play none none reverse' });

    // Dynamic Background Colors
    const sections = gsap.utils.toArray<HTMLElement>('section');
    const bgColors = ['#0a1628', '#111d32', '#0f172a', '#1e1b4b', '#0a1628']; // Hero, Vision, Gallery, Sponsors, Contact

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => gsap.to(containerRef.current, { backgroundColor: bgColors[i], duration: 1, ease: 'power2.out' }),
        onEnterBack: () => gsap.to(containerRef.current, { backgroundColor: bgColors[i], duration: 1, ease: 'power2.out' }),
      });
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen transition-colors duration-1000 ease-out">
      <main>
        <Hero />
        <Vision />
        <Gallery />
        <Sponsors />
        <Contact />
      </main>
    </div>
  );
}
