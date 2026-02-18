import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-bg', { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });

      gsap.fromTo('.contact-headline span', { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }, delay: 0.3 });

      gsap.fromTo('.contact-body', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }, delay: 0.6 });

      gsap.fromTo('.contact-cta', { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)', scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }, delay: 0.8 });

      gsap.fromTo('.contact-info', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: sectionRef.current, start: 'top 50%' }, delay: 1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="iletisim" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/general/ahtapot.jpeg')" }}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-[#0a1628]/80" />
      </div>

      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, #d4af37 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="container-custom relative z-10 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="contact-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
            {'Bize Katıl'.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-[0.25em]">{word}</span>
            ))}
          </h2>

          {/* Body */}
          <p className="contact-body text-lg sm:text-xl max-w-2xl mx-auto mb-12 text-[#94a3b8]">
            Geleceği şekillendirmek için ilk adımı at. A.I.S. ailesine katıl, fark yarat.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#" className="contact-cta btn-primary text-lg px-10 py-5 group">
              Üye Ol
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#" className="contact-cta btn-secondary text-lg px-10 py-5">
              İletişime Geç
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="contact-info flex items-center gap-3 text-[#64748b]">
              <Mail className="w-5 h-5" />
              <span className="text-sm">info@aisatlas.edu.tr</span>
            </div>
            <div className="contact-info flex items-center gap-3 text-[#64748b]">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">İstanbul Atlas Üniversitesi</span>
            </div>
            <div className="contact-info flex items-center gap-3 text-[#64748b]">
              <Phone className="w-5 h-5" />
              <span className="text-sm">+90 212 000 00 00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
