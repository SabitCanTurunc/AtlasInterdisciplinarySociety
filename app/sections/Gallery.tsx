'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const images = [
  '/images/galery/gallery-1.jpeg',
  '/images/galery/gallery-2.jpeg',
  '/images/galery/gallery-3.jpeg',
];

const Gallery = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo('.gallery-header',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
            );

            // Horizontal Scroll Animation
            // Creating a seamless loop or just a horizontal move depending on content width
            // Since we have few images, let's make them display nicely in a grid or a large slider
            // For 3 images, a grid or a simple layout might be better than an infinite loop unless we duplicate them.

            gsap.fromTo('.gallery-image-container',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: '.gallery-grid',
                        start: 'top 70%'
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="gallery" className="section-padding bg-[#0a1628] relative overflow-hidden text-white">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1e3a5f]/20 via-[#0a1628] to-[#0a1628] pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="gallery-header text-center mb-16">
                    <span className="section-label text-[#d4af37]">Galeri</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        Anılarımız
                    </h2>
                    <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
                        Birlikte başardığımız, eğlendiğimiz ve öğrendiğimiz anlardan kareler.
                    </p>
                </div>

                <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((src, index) => (
                        <div key={index} className="gallery-image-container relative aspect-[4/3] rounded-2xl overflow-hidden group border border-[#1e3a5f]">
                            <Image
                                src={src}
                                alt={`Atlas Gallery ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
