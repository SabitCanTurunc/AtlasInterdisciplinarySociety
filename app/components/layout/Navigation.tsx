'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { useRef } from 'react';
import { Session } from 'next-auth';
import { login, logout } from '@/app/actions/auth';
import { useLanguage } from '@/app/context/LanguageContext';

const Navigation = ({ session }: { session: Session | null }) => {
  const adminLink = session?.user &&
    ((session.user as any).role === 'admin' || (session.user as any).role === 'super_admin');

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { language, t: allTranslations, toggleLanguage } = useLanguage();
  const t = allTranslations.header;
  const common = allTranslations.common;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    // eslint-disable-next-line
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: t.about, href: '/about' },
    { label: t.disciplines, href: '/disciplines' },
    { label: t.projects, href: '/projects' },
    { label: t.events, href: '/events' },
    { label: t.publications, href: '/publications' },
    { label: t.team, href: '/team' },
    { label: t.contact, href: '/contact' },
  ];

  const isSolid = isScrolled || pathname !== '/';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`}
        style={{
          background: isSolid ? 'rgba(10, 22, 40, 0.95)' : 'transparent',
          backdropFilter: isSolid ? 'blur(12px)' : 'none',
          borderBottom: isSolid ? '1px solid rgba(26, 39, 68, 0.5)' : 'none',
        }}>
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14 flex items-center justify-center bg-white rounded-full p-1">
                <Image
                  src="/images/general/atlaslogo.png"
                  alt={common.logoAlt}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-white block leading-tight">{common.logoAbbr}</span>
                <span className="text-xs text-[#94a3b8]">{common.logoText}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 group ${pathname === link.href ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}>
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#d4af37] transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </Link>
              ))}
            </div>

            {/* CTA Button / User Menu */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="text-sm font-bold text-white/70 hover:text-white transition-colors flex items-center gap-1 mr-2"
                aria-label={common.toggleLanguage}
              >
                <span className={language === 'tr' ? 'text-white' : ''}>TR</span>
                <span className="text-white/40 font-normal">|</span>
                <span className={language === 'en' ? 'text-white' : ''}>EN</span>
              </button>

              {session?.user ? (
                <div className="flex items-center gap-4">
                  {adminLink && (
                    <Link href="/admin" className="text-sm font-medium text-[#d4af37] hover:text-[#fcd34d] transition-colors">
                      {t.admin}
                    </Link>
                  )}
                  <Link href="/profile" className="flex items-center gap-2 group">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || common.userAlt}
                        width={32}
                        height={32}
                        className="rounded-full border border-[#1e3a5f] group-hover:border-[#d4af37] transition-colors"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#1e3a5f] group-hover:bg-[#1a2744] transition-colors flex items-center justify-center text-white text-xs">
                        {session.user.name?.charAt(0) || common.userAlt.charAt(0)}
                      </div>
                    )}
                  </Link>
                  <form action={logout}>
                    <button type="submit" className="text-sm text-white/70 hover:text-white transition-colors">
                      {t.logout}
                    </button>
                  </form>
                </div>
              ) : (
                <Link href="/login" className="btn-primary text-sm py-3 px-6">
                  {t.login}
                </Link>
              )}
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
                <Link key={index} href={link.href}
                  className={`block text-lg font-medium transition-all duration-300 py-3 px-4 rounded-lg ${pathname === link.href ? 'text-white bg-[#1a2744]' : 'text-white/80 hover:text-white hover:bg-[#1a2744]'
                    }`}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-[#1a2744]">
              <button
                onClick={toggleLanguage}
                className="w-full flex justify-center items-center gap-2 py-3 mb-4 text-white/80 hover:text-white border border-[#1a2744] hover:bg-[#1a2744] rounded-lg transition-colors"
                aria-label={common.toggleLanguage}
              >
                <span className={language === 'tr' ? 'font-bold text-white' : ''}>TR</span>
                <span className="text-white/40">|</span>
                <span className={language === 'en' ? 'font-bold text-white' : ''}>EN</span>
              </button>

              {session?.user ? (
                <div className="space-y-4">
                  <Link href="/profile" className="flex items-center gap-3 px-4 hover:bg-[#1a2744] py-2 rounded-lg transition-colors">
                    {session.user.image && (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || common.userAlt}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <div className="text-white font-medium">{session.user.name}</div>
                      <div className="text-xs text-[#94a3b8]">{session.user.email}</div>
                    </div>
                  </Link>
                  {adminLink && (
                    <Link href="/admin" className="block text-center py-2 text-[#d4af37] border border-[#d4af37]/30 rounded-lg">
                      {t.adminPanel}
                    </Link>
                  )}
                  <form action={logout}>
                    <button type="submit" className="w-full py-2 text-white/70 hover:text-white border border-[#1a2744] rounded-lg">
                      {t.logout}
                    </button>
                  </form>
                </div>
              ) : (
                <Link href="/login" className="btn-primary w-full text-center flex justify-center">
                  {t.login}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
