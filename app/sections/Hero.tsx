import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Headline animation
      tl.fromTo(
        '.headline-line',
        { clipPath: 'inset(100% 0 0 0)', y: 50 },
        { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 0.7, stagger: 0.1 },
        0.4
      );

      // Subtitle
      tl.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.9
      );

      // CTA
      tl.fromTo(
        '.hero-cta',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
        1.1
      );

      // Stats
      tl.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        1.2
      );

      // Floating orbs
      gsap.to('.gradient-orb', {
        y: '+=15',
        x: '+=10',
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 2, from: 'random' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '500+', label: 'Aktif Üye' },
    { value: '10+', label: 'Fakülte' },
    { value: '50+', label: 'Proje' },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #111d32 50%, #1e3a5f 100%)' }}
    >
      {/* Gradient Orbs */}
      <div className="gradient-orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[100px]" 
        style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)' }} />
      <div className="gradient-orb absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-[100px]" 
        style={{ background: 'radial-gradient(circle, rgba(30, 58, 95, 0.5) 0%, transparent 70%)' }} />
      <div className="gradient-orb absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 blur-[80px]" 
        style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)' }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Headline */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight">
              <span className="headline-line block overflow-hidden">
                <span className="inline-block text-white">Geleceği</span>
              </span>
              <span className="headline-line block overflow-hidden">
                <span className="inline-block text-white">Birlikte</span>
              </span>
              <span className="headline-line block overflow-hidden">
                <span className="inline-block text-[#d4af37]">Şekillendiriyoruz</span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed text-[#94a3b8]">
            İstanbul Atlas Üniversitesi&apos;nin disiplinlerarası vizyon platformu
          </p>

          {/* CTA */}
          <div className="hero-cta mb-16">
            <a href="#vizyon" className="btn-primary text-lg px-10 py-5 group">
              Keşfet
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-[#64748b]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0a1628, transparent)' }} />
    </section>
  );
};

export default Hero;
