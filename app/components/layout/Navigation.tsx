import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Vizyon', href: '#vizyon' },
    { label: 'Disiplinler', href: '#disiplinler' },
    { label: 'Etkinlikler', href: '#etkinlikler' },
    { label: 'Yayınlar', href: '#yayinlar' },
    { label: 'Ekip', href: '#ekip' },
    { label: 'İletişim', href: '#iletisim' },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`}
        style={{
          background: isScrolled ? 'rgba(10, 22, 40, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(26, 39, 68, 0.5)' : 'none',
        }}>
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#d4af37' }}>
                <span className="text-[#0a1628] font-bold text-xl">A</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-white block leading-tight">A.I.S.</span>
                <span className="text-xs text-[#94a3b8]">Atlas Interdisciplinary Society</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a key={index} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="relative text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a href="#iletisim" onClick={(e) => { e.preventDefault(); scrollToSection('#iletisim'); }}
                className="btn-primary text-sm py-3 px-6">
                Üye Ol
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#1a2744' }}>
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#0a1628]/90 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 w-full max-w-sm h-full transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ background: '#111d32', borderLeft: '1px solid #1a2744' }}>
          <div className="p-6 pt-24">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <a key={index} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="block text-lg font-medium text-white/80 hover:text-white hover:bg-[#1a2744] transition-all duration-300 py-3 px-4 rounded-lg">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-[#1a2744]">
              <a href="#iletisim" onClick={(e) => { e.preventDefault(); scrollToSection('#iletisim'); }}
                className="btn-primary w-full text-center justify-center">
                Üye Ol
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
