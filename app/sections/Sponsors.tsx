'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { getSponsors } from '../actions/sponsors';
import { useLanguage } from '@/app/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

type SponsorData = {
    _id: string;
    name: string;
    imageUrl: string;
    websiteUrl: string | null;
};

const Sponsors = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [sponsors, setSponsors] = useState<SponsorData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.home.sponsors;

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const data = await getSponsors();
                setSponsors(data);
            } catch (error) {
                console.error("Failed to fetch sponsors", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSponsors();
    }, []);

    useEffect(() => {
        if (sponsors.length === 0 && !isLoading) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.sponsors-header',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
            );

            gsap.fromTo('.sponsor-item',
                { opacity: 0, scale: 0.9, y: 20 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1,
                    scrollTrigger: { trigger: '.sponsors-grid', start: 'top 80%' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [sponsors.length, isLoading]);

    if (!isLoading && sponsors.length === 0) {
        return null;
    }

    return (
        <section ref={sectionRef} id="sponsors" className="section-padding bg-transparent relative overflow-hidden text-white border-t border-[#1e3a5f]/30 min-h-screen flex flex-col justify-center snap-start snap-always">
            {/* Background Ambience */}
            <div className="absolute inset-x-0 -top-40 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e3a5f]/20 via-transparent to-transparent pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="sponsors-header text-center mb-16">
                    <span className="section-label text-[#d4af37]">{t.label}</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        {t.headline}
                    </h2>
                    <p className="text-base text-[#94a3b8] max-w-2xl mx-auto">
                        {t.desc}
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-[#d4af37] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="sponsors-grid flex flex-wrap justify-center items-center gap-8 sm:gap-12 max-w-5xl mx-auto">
                        {sponsors.map((sponsor) => {
                            const SponsorLogo = (
                                <div className="relative w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 flex items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] grayscale hover:grayscale-0">
                                    <Image
                                        src={sponsor.imageUrl}
                                        alt={sponsor.name}
                                        fill
                                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                                        sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                                    />
                                </div>
                            );

                            return (
                                <div key={sponsor._id} className="sponsor-item">
                                    {sponsor.websiteUrl ? (
                                        <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
                                            {SponsorLogo}
                                        </a>
                                    ) : (
                                        <div title={sponsor.name}>
                                            {SponsorLogo}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Sponsors;
