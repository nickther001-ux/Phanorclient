import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLang } from '../context/LangContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { key: 'nav_home' as const, path: '/' },
    { key: 'nav_shop' as const, path: '/shop' },
    { key: 'nav_bookHonors' as const, path: '/book-honors' },
    { key: 'nav_logistics' as const, path: '/logistics' },
    { key: 'nav_about' as const, path: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-onyx/90 backdrop-blur-md py-4 shadow-lg border-b border-gold/10'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Phanor Logo"
            className="h-10 w-auto gold-filter transition-transform duration-500 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="heading-bebas text-2xl tracking-widest text-gold leading-none">PHANOR</span>
            <span className="heading-mont text-[0.6rem] tracking-[0.3em] text-white/70 uppercase">
              Distribution Inc.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className={`heading-mont text-xs tracking-widest font-medium transition-colors hover:text-gold ${
                location.pathname === path ? 'text-gold' : 'text-white'
              }`}
            >
              {t(key)}
            </Link>
          ))}

          {/* FR | EN Toggle */}
          <div
            className="heading-mont text-xs tracking-widest font-medium flex items-center border border-gold/40 overflow-hidden"
            style={{ borderRadius: 0 }}
          >
            <button
              onClick={() => setLang('fr')}
              style={{
                padding: '0.35rem 0.65rem',
                background: lang === 'fr' ? 'var(--gold)' : 'transparent',
                color: lang === 'fr' ? 'var(--onyx)' : 'rgba(197,160,89,0.7)',
                transition: 'all 0.2s',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              FR
            </button>
            <span style={{ color: 'rgba(197,160,89,0.3)', fontSize: '0.6rem' }}>|</span>
            <button
              onClick={() => setLang('en')}
              style={{
                padding: '0.35rem 0.65rem',
                background: lang === 'en' ? 'var(--gold)' : 'transparent',
                color: lang === 'en' ? 'var(--onyx)' : 'rgba(197,160,89,0.7)',
                transition: 'all 0.2s',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              EN
            </button>
          </div>

          <Link
            to="/shop"
            className="bg-gold text-onyx heading-bebas px-6 py-2 text-xl tracking-wider hover:bg-white transition-colors uppercase"
          >
            {t('nav_order')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-onyx border-b border-gold/20 flex flex-col items-center py-8 gap-6 md:hidden shadow-2xl">
          {navLinks.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className={`heading-mont text-lg tracking-widest font-medium ${
                location.pathname === path ? 'text-gold' : 'text-white'
              }`}
            >
              {t(key)}
            </Link>
          ))}

          {/* Mobile FR|EN */}
          <div className="flex items-center gap-4 heading-mont text-sm tracking-widest">
            <button
              onClick={() => setLang('fr')}
              style={{ color: lang === 'fr' ? 'var(--gold)' : 'rgba(245,245,245,0.5)', cursor: 'pointer', border: 'none', background: 'none', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.15em' }}
            >
              FR
            </button>
            <span style={{ color: 'rgba(197,160,89,0.3)' }}>|</span>
            <button
              onClick={() => setLang('en')}
              style={{ color: lang === 'en' ? 'var(--gold)' : 'rgba(245,245,245,0.5)', cursor: 'pointer', border: 'none', background: 'none', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.15em' }}
            >
              EN
            </button>
          </div>

          <Link
            to="/shop"
            className="bg-gold text-onyx heading-bebas px-8 py-3 text-2xl tracking-wider mt-2"
          >
            {t('nav_order')}
          </Link>
        </div>
      )}
    </nav>
  );
}
