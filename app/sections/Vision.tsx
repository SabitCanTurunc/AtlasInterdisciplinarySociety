import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Users, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Vision = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vision-label', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });

      gsap.fromTo('.vision-headline span', { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }, delay: 0.1 });

      gsap.fromTo('.vision-body', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }, delay: 0.4 });

      gsap.fromTo('.pillar-card', { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: '.pillars-grid', start: 'top 70%' }, delay: 0.6 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Target,
      title: 'Sürekli Gelişim',
      description: 'Değişime açık, gelişime odaklı bir yaklaşımla kendimizi sürekli yeniliyoruz.',
    },
    {
      icon: Users,
      title: 'Birlikte Güçlenme',
      description: 'Kolektif bilgi ve deneyimle güçlü bireyler yetiştiriyoruz.',
    },
    {
      icon: Lightbulb,
      title: 'Fark Yaratmak',
      description: 'Özgür alanlarda büyüyen fikirlerle topluma değer katıyoruz.',
    },
  ];

  return (
    <section ref={sectionRef} id="vizyon" className="section-padding relative overflow-hidden" style={{ background: '#0a1628' }}>
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30"
        style={{ background: 'radial-gradient(ellipse at top right, #111d32 0%, transparent 60%)' }} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-start">
          {/* Left Content */}
          <div>
            <span className="vision-label section-label">Vizyonumuz</span>
            
            <h2 className="vision-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              {'Bireysel Güç, Kolektif Akıl'.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]">{word}</span>
              ))}
            </h2>

            <div className="vision-body space-y-6">
              <p className="text-lg leading-relaxed text-[#94a3b8]">
                ATLAS INTERDISCIPLINARY SOCIETY (A.I.S.), öğrencilerini özgür düşünmeye, 
                yenilik üretmeye ve geleceği şekillendirmeye teşvik eden bir vizyon platformudur.
              </p>
              <p className="text-lg leading-relaxed text-[#94a3b8]">
                Multidisipliner ekibi ve temsilcileri ile sürekli gelişim, değişim ve 
                birlik içinde güçlenmeyi hedefler.
              </p>
              <p className="text-xl font-medium text-[#d4af37] italic border-l-4 border-[#d4af37] pl-6 py-2">
                &ldquo;Bireysel gücü kolektif akılla buluşturur; fark yaratan fikirler, özgür alanlarda büyür.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Content - Pillars */}
          <div className="pillars-grid space-y-6">
            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-card group p-6 rounded-xl border transition-all duration-300 hover:-translate-y-2"
                style={{ background: '#111d32', borderColor: '#1a2744' }}>
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-[#d4af37]"
                    style={{ background: '#1a2744' }}>
                    <pillar.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-[#94a3b8]">{pillar.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
