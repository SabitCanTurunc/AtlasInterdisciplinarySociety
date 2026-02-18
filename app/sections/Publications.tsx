import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Newspaper, FileText, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Publications = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pub-header', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );

      gsap.fromTo('.pub-card', 
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, scrollTrigger: { trigger: '.pub-grid', start: 'top 70%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const publications = [
    {
      title: 'Atlas Bilim Dergisi - Sayı 1',
      desc: 'Yapay Zeka ve Etik: Geleceği Şekillendiren Kararlar.',
      type: 'Dergi',
      date: 'Ocak 2026',
      icon: BookOpen,
      color: '#3b82f6',
      link: '#'
    },
    {
      title: 'Disiplinlerarası Araştırma Raporu',
      desc: 'Mühendislik ve Tıp Fakültesi ortak çalışması: Biyomekanik İnovasyonlar.',
      type: 'Rapor',
      date: 'Aralık 2025',
      icon: FileText,
      color: '#10b981',
      link: '#'
    },
    {
      title: 'Teknoloji Bülteni - Şubat',
      desc: 'Kampüsümüzde geliştirilen en son projeler ve teknoloji haberleri.',
      type: 'Bülten',
      date: 'Şubat 2026',
      icon: Newspaper,
      color: '#f59e0b',
      link: '#'
    }
  ];

  return (
    <section ref={sectionRef} id="yayinlar" className="section-padding bg-[#0a1628] text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3b82f6]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="lg:w-1/2 pub-header">
            <span className="section-label text-[#d4af37] mb-4 block">Kütüphane</span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Bilgiyi Paylaşarak Çoğaltıyoruz
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Kulübümüzün ürettiği dergiler, araştırma raporları ve bültenlerle akademik dünyaya katkı sağlıyoruz. Öğrenci çalışmaları, makaleler ve daha fazlası burada.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-[#d4af37] font-semibold hover:text-white transition-colors group">
              Tüm Yayınları İncele
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Content - Cards */}
          <div className="lg:w-1/2 w-full pub-grid space-y-6">
            {publications.map((pub, idx) => (
              <a key={idx} href={pub.link} className="pub-card group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" 
                       style={{ backgroundColor: `${pub.color}20`, color: pub.color }}>
                    <pub.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{pub.type}</span>
                      <span className="text-xs text-slate-500">{pub.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {pub.desc}
                    </p>
                  </div>
                  <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
                    <ArrowRight className="w-5 h-5 text-[#d4af37]" />
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Publications;
