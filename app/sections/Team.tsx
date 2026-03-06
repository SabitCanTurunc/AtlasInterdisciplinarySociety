'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface TeamProps {
  initialTeamMembers?: any[];
}

const Team = ({ initialTeamMembers = [] }: TeamProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t: allTranslations } = useLanguage();
  const t = allTranslations.team;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-header', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });

      gsap.fromTo('.team-card', { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: '.team-grid', start: 'top 70%' }, delay: 0.3 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ekip" className="section-padding relative overflow-hidden" style={{ background: '#111d32' }}>
      <div className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{ background: 'radial-gradient(ellipse at top center, #1e3a5f 0%, transparent 60%)' }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="team-header text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">{t.label}</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t.headline}
          </h2>
          <p className="text-lg text-[#94a3b8]">
            {t.desc}
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {initialTeamMembers.map((member, index) => (
            <div key={index} className="team-card group">
              {/* Image */}
              <div className="relative mb-4 overflow-hidden rounded-xl aspect-[3/4]">
                <Image src={member.imageUrl} alt={member.name}
                  fill
                  className="object-cover transition-all duration-500 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== '/images/general/hero-image.jpg') {
                      target.src = '/images/general/hero-image.jpg';
                      target.srcset = '/images/general/hero-image.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(10, 22, 40, 0.9) 0%, transparent 60%)' }}>
                  <div className="flex gap-3">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#d4af37]"
                        style={{ background: '#1a2744' }}>
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#d4af37]"
                        style={{ background: '#1a2744' }}>
                        <Instagram className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-[#d4af37] transition-colors leading-tight">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm mb-1 text-[#d4af37] font-medium">
                  {t.roles[member.role as keyof typeof t.roles] || member.role}
                </p>
                <p className="text-[10px] sm:text-xs text-[#64748b] leading-tight">
                  {member.faculty ? (t.faculties[member.faculty as keyof typeof t.faculties] || member.faculty) : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
