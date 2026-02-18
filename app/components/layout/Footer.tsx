import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Mail, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom TikTok Icon Component
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-accent', { scaleX: 0 },
        { scaleX: 1, duration: 0.6, scrollTrigger: { trigger: footerRef.current, start: 'top 90%' } });

      gsap.fromTo('.footer-logo', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, scrollTrigger: { trigger: footerRef.current, start: 'top 85%' }, delay: 0.1 });

      gsap.fromTo('.footer-column', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: footerRef.current, start: 'top 80%' }, delay: 0.2 });

      gsap.fromTo('.footer-bottom', { opacity: 0 },
        { opacity: 1, duration: 0.3, scrollTrigger: { trigger: footerRef.current, start: 'top 70%' }, delay: 0.6 });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const linkColumns = [
    { title: 'Kurumsal', links: ['Hakkımızda', 'Vizyon', 'Ekip', 'Kariyer'] },
    { title: 'Programlar', links: ['Fakülteler', 'Projeler', 'Etkinlikler', 'Araştırma'] },
    { title: 'İletişim', links: ['Bize Ulaşın', 'Üyelik', 'SSS', 'Basın'] },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/atlas.interdisciplinary.soc', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/atlas-interdisciplinary-society-a-i-s1', label: 'LinkedIn' },
    { icon: TiktokIcon, href: 'https://www.tiktok.com/@a.interdisciplinary.soc', label: 'TikTok' },
    { icon: Globe, href: 'https://www.qampusapp.com/club/atlas-interdisciplinary-society-ais', label: 'Qampus' },
    { icon: Mail, href: 'mailto:kulup.ais@atlas.edu.tr', label: 'Email' },
  ];

  return (
    <footer ref={footerRef} className="relative" style={{ background: '#0a1628' }}>
      {/* Top Accent Line */}
      <div className="footer-accent absolute top-0 left-0 right-0 h-[2px] origin-left"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)' }} />

      <div className="container-custom pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          {/* Logo + Tagline */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 footer-logo">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#d4af37' }}>
                <span className="text-[#0a1628] font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-white">A.I.S.</span>
            </div>
            <p className="text-sm mb-6 max-w-xs text-[#64748b]">
              Bireysel güç, kolektif akıl. Geleceği birlikte inşa ediyoruz.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[#d4af37] group"
                  style={{ background: '#1a2744' }}>
                  <social.icon className="w-4 h-4 text-white group-hover:text-[#0a1628]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {linkColumns.map((column, index) => (
            <div key={index} className="footer-column">
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-sm transition-colors duration-300 hover:text-white text-[#64748b]">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#1a2744] pt-8">
          <div className="footer-bottom flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#64748b]">
              © 2026 ATLAS INTERDISCIPLINARY SOCIETY. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm transition-colors duration-300 hover:text-white text-[#64748b]">Gizlilik Politikası</a>
              <a href="#" className="text-sm transition-colors duration-300 hover:text-white text-[#64748b]">Kullanım Koşulları</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
