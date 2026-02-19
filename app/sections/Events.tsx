import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Users, Video } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.events-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );

      // Cards Animation
      gsap.fromTo('.event-card',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: '.events-grid', start: 'top 70%' } }
      );

      // Featured Event Animation
      gsap.fromTo('.featured-event',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, scrollTrigger: { trigger: '.featured-event', start: 'top 80%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const eventCategories = [
    { title: 'Sosyal Sorumluluk', desc: 'Topluma değer katan projeler.', icon: Users },
    { title: 'Akademi ve Bilim', desc: 'Sektör liderleriyle söyleşiler.', icon: Video },
    { title: 'Liderlik Atölyeleri', desc: 'Kişisel ve profesyonel gelişim.', icon: MapPin },
    { title: 'Atlas Summit', desc: 'Disiplinlerarası büyük zirve.', icon: Calendar },
  ];

  return (
    <section ref={sectionRef} id="etkinlikler" className="section-padding relative overflow-hidden bg-[#f8fafc]">
      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="events-header text-center max-w-3xl mx-auto mb-16">
          <span className="section-label text-[#d4af37]">Etkinliklerimiz</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1628] mb-6">
            Bilgiyi Eyleme Dönüştür
          </h2>
          <p className="text-lg text-[#64748b]">
            Teorik bilginin ötesine geçen, interaktif ve geliştirici etkinlikler.
          </p>
        </div>

        {/* Event Categories Grid */}
        <div className="events-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {eventCategories.map((cat, idx) => (
            <div key={idx} className="event-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="w-12 h-12 rounded-lg bg-[#0a1628]/5 flex items-center justify-center mb-4 text-[#0a1628]">
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1628] mb-2">{cat.title}</h3>
              <p className="text-sm text-[#64748b]">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* Featured Event / Promotion Area */}
        <div className="featured-event relative rounded-2xl overflow-hidden bg-[#0a1628] text-white">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 bg-[url('/images/general/innovation.jpg')] bg-cover bg-center mix-blend-overlay" />

          <div className="relative z-10 p-8 md:p-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#d4af37] text-[#0a1628] text-xs font-bold mb-4">
                YAKLAŞAN ETKİNLİK
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Atlas Interdisciplinary Summit &apos;26
              </h3>
              <p className="text-slate-300 mb-8 text-lg">
                Farklı disiplinlerden uzmanların bir araya geleceği, geleceğin teknolojilerinin tartışılacağı büyük zirveye hazır mısın?
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="https://forms.google.com/..." target="_blank" rel="noopener noreferrer"
                  className="btn-primary bg-[#d4af37] text-[#0a1628] hover:bg-[#c4a030] border-none px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105">
                  Hemen Kayıt Ol
                </a>
                <button className="px-8 py-4 rounded-lg font-bold border border-white/20 hover:bg-white/10 transition-colors">
                  Detaylı Bilgi
                </button>
              </div>
            </div>

            {/* Event Details Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-[#d4af37] mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">Tarih</h4>
                    <p className="text-slate-300">15 Mayıs 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#d4af37] mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">Konum</h4>
                    <p className="text-slate-300">Vadi Yerleşkesi Konferans Salonu</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-slate-400">
                    * Kontenjan sınırlıdır. Erken kayıt avantajlarından yararlanmak için formu doldurmayı unutmayın.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Events;
