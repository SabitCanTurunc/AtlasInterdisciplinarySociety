import { useEffect, useState, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, Code, HeartPulse, Palette, FlaskConical, Stethoscope, Briefcase, 
  Mic2, Activity, Gamepad2, Laptop, MonitorPlay, Zap, PencilRuler 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  { name: 'Tıp', icon: Stethoscope },
  { name: 'Diş Hekimliği', icon: Activity },
  { name: 'Hemşirelik', icon: HeartPulse },
  { name: 'Ebelik', icon: HeartPulse },
  { name: 'Fizyoterapi ve Rehabilitasyon', icon: Activity },
  { name: 'Dil ve Konuşma Terapisi', icon: Mic2 },
  { name: 'Psikoloji', icon: Brain },
  { name: 'Moleküler Biyoloji ve Genetik', icon: FlaskConical },
  { name: 'Bilgisayar Mühendisliği', icon: Laptop },
  { name: 'Yazılım Mühendisliği', icon: Code },
  { name: 'Endüstri Mühendisliği', icon: Briefcase },
  { name: 'Elektrik Elektronik Müh.', icon: Zap },
  { name: 'Dijital Oyun Tasarımı', icon: Gamepad2 },
  { name: 'Görsel İletişim Tasarımı', icon: MonitorPlay },
  { name: 'İç Mimarlık ve Çevre Tasarımı', icon: PencilRuler },
  { name: 'Mütercim Tercümanlık', icon: Mic2 },
  { name: 'İşletme', icon: Briefcase },
];

const Disciplines = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Default to horizontal layout for SSR/initial render
  const [layout, setLayout] = useState<number[]>([6, 5, 6]); 

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) { 
        setLayout([6, 5, 6]); // XL Screens: Çok geniş yatay (17 items)
      } else if (width >= 1024) { 
        setLayout([5, 4, 5, 3]); // Laptop: Dengeli
      } else if (width >= 768) { 
        setLayout([4, 3, 4, 3, 3]); // Tablet
      } else { 
        setLayout([3, 2, 3, 2, 3, 2, 2]); // Mobile: Dikey
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Fade In
      gsap.fromTo('.discipline-header', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );

      // Hexagon Entry Animation
      gsap.fromTo('.hex-wrapper', 
        { opacity: 0, scale: 0, rotation: 15 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 0.8, 
          stagger: { amount: 0.8, grid: 'auto', from: 'center' },
          ease: 'elastic.out(1, 0.7)',
          scrollTrigger: { trigger: '.honeycomb-container', start: 'top 80%' } 
        }
      );

      // Floating Animation (Subtle)
      gsap.to('.hex-wrapper', {
        y: 'random(-3, 3)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { amount: 2, from: 'random' }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [layout]);

  const chunks = useMemo(() => {
    let currentIndex = 0;
    return layout.map(count => {
      const chunk = disciplines.slice(currentIndex, currentIndex + count);
      currentIndex += count;
      return chunk;
    });
  }, [layout]);

  return (
    <section 
      ref={sectionRef} 
      id="disiplinler" 
      className="section-padding relative overflow-hidden bg-[#020202] text-white py-32"
      onMouseMove={handleMouseMove}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-[#050505] to-black pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="discipline-header text-center max-w-4xl mx-auto mb-24">
          <span className="text-red-600/80 font-mono text-xs tracking-[0.4em] uppercase mb-4 block animate-pulse">
            :: SYSTEM_NODE_NETWORK ::
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tighter">
            DİSİPLİNLER<span className="text-red-600">.AĞ</span>
          </h2>
          <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Yatayda genişleyen, birbirine kenetlenmiş kolektif zeka hücreleri.
          </p>
        </div>

        {/* Honeycomb Container - Full Width Logic */}
        <div className="w-full max-w-7xl mx-auto px-4">
          <div 
            ref={containerRef} 
            className="honeycomb-container flex flex-col items-center justify-center relative group select-none py-10"
            style={{ '--mouse-x': '0px', '--mouse-y': '0px' } as React.CSSProperties}
          >
            {/* Global Spotlight (Background Glow) */}
            <div 
              className="pointer-events-none absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
              style={{
                background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(220, 38, 38, 0.06), transparent 60%)`,
                inset: -400,
                zIndex: 0
              }}
            />

            {chunks.map((rowItems, rowIndex) => (
              <div 
                key={rowIndex} 
                className="flex justify-center gap-[4px] sm:gap-[6px] -mt-[20px] sm:-mt-[28px] md:-mt-[34px] lg:-mt-[42px] first:mt-0 relative z-10"
              >
                {rowItems.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className="hex-wrapper relative w-[100px] h-[115px] sm:w-[130px] sm:h-[150px] md:w-[150px] md:h-[173px] lg:w-[170px] lg:h-[196px] xl:w-[190px] xl:h-[220px] flex-shrink-0 transition-all duration-300 hover:z-50 hover:scale-110"
                  >
                    {/* Hexagon Clip Container */}
                    <div 
                      className="absolute inset-[2px] bg-[#080808] transition-all duration-500"
                      style={{ 
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    >
                      {/* 1. Static Border */}
                      <div 
                        className="absolute inset-0 bg-[#1a1a1a]"
                        style={{ 
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        }}
                      />
                      
                      {/* 2. Inner Black Background */}
                      <div 
                        className="absolute inset-[1px] bg-[#050505] group-hover:bg-[#0a0a0a] transition-colors duration-300"
                        style={{ 
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        }}
                      >
                          {/* 3. Spotlight Reflection */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover/hex:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(220, 38, 38, 0.4), transparent 100%)`,
                              mixBlendMode: 'screen'
                            }}
                          />
                      </div>

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center z-20">
                        {/* Icon */}
                        <div className="mb-3 text-gray-700 transition-all duration-300 group-hover:text-red-500 group-hover:drop-shadow-[0_0_12px_rgba(220,38,38,0.8)] transform group-hover:-translate-y-1 group-hover:scale-110">
                          <item.icon className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" strokeWidth={1.5} />
                        </div>
                        
                        {/* Text */}
                        <h3 className="text-[9px] sm:text-[10px] md:text-xs font-bold text-gray-800 uppercase tracking-widest transition-all duration-300 group-hover:text-white group-hover:tracking-[0.15em]">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Outer Glow (active on hover) */}
                    <div 
                      className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl bg-red-600"
                      style={{ 
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Disciplines;
