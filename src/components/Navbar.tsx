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

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 50,
    transition: 'all 0.3s',
    ...(scrolled
      ? { background: 'rgba(26,26,26,0.92)', backdropFilter: 'blur(12px)', padding: '1rem 0', boxShadow: '0 4px 24px rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(197,160,89,0.1)' }
      : { background: 'transparent', padding: '1.5rem 0' }),
  };

  const langBtn = (code: 'fr' | 'en'): React.CSSProperties => ({
    padding: '0.35rem 0.65rem',
    background: lang === code ? 'var(--gold)' : 'transparent',
    color: lang === code ? 'var(--onyx)' : 'rgba(197,160,89,0.7)',
    transition: 'all 0.2s',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    border: 'none',
  });

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/logo.png" alt="Phanor Logo" className="gold-filter" style={{ height: '2.5rem', width: 'auto' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="heading-bebas text-gold" style={{ fontSize: '1.5rem', letterSpacing: '0.15em', lineHeight: 1 }}>PHANOR</span>
            <span className="heading-mont" style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(245,245,245,0.6)', textTransform: 'uppercase' }}>
              Distribution Inc.
            </span>
          </div>
        </Link>

        {/* Desktop Nav — uses CSS class with @media query */}
        <div className="nav-desktop">
          {navLinks.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className="heading-mont"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                fontWeight: 500,
                color: location.pathname === path ? 'var(--gold)' : 'var(--white)',
                transition: 'color 0.2s',
                textTransform: 'uppercase',
              }}
            >
              {t(key)}
            </Link>
          ))}

          {/* FR | EN Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(197,160,89,0.4)', overflow: 'hidden' }}>
            <button onClick={() => setLang('fr')} style={langBtn('fr')}>FR</button>
            <span style={{ color: 'rgba(197,160,89,0.3)', fontSize: '0.6rem', lineHeight: 1 }}>|</span>
            <button onClick={() => setLang('en')} style={langBtn('en')}>EN</button>
          </div>

          <Link
            to="/shop"
            className="heading-bebas bg-gold text-onyx"
            style={{ padding: '0.5rem 1.5rem', fontSize: '1.1rem', letterSpacing: '0.12em', transition: 'background 0.2s', textTransform: 'uppercase' }}
          >
            {t('nav_order')}
          </Link>
        </div>

        {/* Mobile hamburger — uses CSS class with @media query */}
        <button
          className="nav-mobile-btn"
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, width: '100%',
          background: 'var(--onyx)', borderBottom: '1px solid rgba(197,160,89,0.2)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '2rem 0', gap: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          {navLinks.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className="heading-mont"
              style={{ fontSize: '1rem', letterSpacing: '0.2em', fontWeight: 500, textTransform: 'uppercase', color: location.pathname === path ? 'var(--gold)' : 'var(--white)' }}
            >
              {t(key)}
            </Link>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setLang('fr')} style={{ ...langBtn('fr'), background: 'none', fontSize: '0.85rem' }}>FR</button>
            <span style={{ color: 'rgba(197,160,89,0.3)' }}>|</span>
            <button onClick={() => setLang('en')} style={{ ...langBtn('en'), background: 'none', fontSize: '0.85rem' }}>EN</button>
          </div>
          <Link
            to="/shop"
            className="heading-bebas bg-gold text-onyx"
            style={{ padding: '0.75rem 2.5rem', fontSize: '1.4rem', letterSpacing: '0.12em' }}
          >
            {t('nav_order')}
          </Link>
        </div>
      )}
    </nav>
  );
}
