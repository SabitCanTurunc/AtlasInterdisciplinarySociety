'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { getGalleryImages } from '../actions/gallery';
import { useLanguage } from '@/app/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

type GalleryImage = {
    _id: string;
    title: string;
    imageUrl: string;
};

const defaultImages: GalleryImage[] = [
    { _id: 'static-1', title: 'Atlas Society', imageUrl: '/images/galery/gallery-1.jpeg' },
    { _id: 'static-2', title: 'Atlas Society', imageUrl: '/images/galery/gallery-2.jpeg' },
    { _id: 'static-3', title: 'Atlas Society', imageUrl: '/images/galery/gallery-3.jpeg' },
];

const Gallery = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [images, setImages] = useState<GalleryImage[]>(defaultImages);
    const [isLoading, setIsLoading] = useState(true);
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.home.gallery;

    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: 'start', dragFree: true },
        [Autoplay({ delay: 3000, stopOnInteraction: false })]
    );

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await getGalleryImages();
                if (data && data.length > 0) {
                    setImages([...defaultImages, ...data]);
                }
            } catch (error) {
                console.error("Failed to fetch gallery images", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.gallery-header',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
            );

            gsap.fromTo('.gallery-carousel',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: '.gallery-carousel', start: 'top 70%' } }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [images.length]);

    return (
        <section ref={sectionRef} id="gallery" className="section-padding bg-transparent relative overflow-hidden text-white min-h-screen flex flex-col justify-center snap-start snap-always">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1e3a5f]/20 via-transparent to-transparent pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="gallery-header text-center mb-16">
                    <span className="section-label text-[#d4af37]">{t.label}</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        {t.headline}
                    </h2>
                    <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
                        {t.desc}
                    </p>
                </div>

                <div className="gallery-carousel overflow-hidden cursor-grab active:cursor-grabbing border-y border-[#1e3a5f]/20 py-8" ref={emblaRef}>
                    <div className="flex touch-pan-y ml-[-1rem]">
                        {images.map((img) => (
                            <div key={img._id} className="relative flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_35%] pl-[1rem] min-w-0">
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-[#1e3a5f] bg-[#111d32]">
                                    <Image
                                        src={img.imageUrl}
                                        alt={img.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 35vw"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-sm text-center font-medium text-white">{img.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="relative flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_35%] pl-[1rem] min-w-0 flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-[#d4af37] rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
