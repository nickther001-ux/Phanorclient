import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'ACCUEIL', path: '/' },
    { name: 'LA BOUTIQUE', path: '/shop' },
    { name: 'BOOK HONORS', path: '/book-honors' },
    { name: 'LOGISTIQUE', path: '/logistics' },
    { name: 'À PROPOS', path: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-onyx/90 backdrop-blur-md py-4 shadow-lg border-b border-gold/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Phanor Logo"
            className="h-10 w-auto gold-filter transition-transform duration-500 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="heading-bebas text-2xl tracking-widest text-gold leading-none">PHANOR</span>
            <span className="heading-mont text-[0.6rem] tracking-[0.3em] text-white/70 uppercase">Distribution Inc.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`heading-mont text-sm tracking-widest font-medium transition-colors hover:text-gold ${
                location.pathname === link.path ? 'text-gold' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/shop"
            className="bg-gold text-onyx heading-bebas px-6 py-2 text-xl tracking-wider hover:bg-white transition-colors uppercase"
          >
            Commander
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-onyx border-b border-gold/20 flex flex-col items-center py-8 gap-6 md:hidden shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`heading-mont text-lg tracking-widest font-medium ${
                location.pathname === link.path ? 'text-gold' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/shop"
            className="bg-gold text-onyx heading-bebas px-8 py-3 text-2xl tracking-wider mt-4"
          >
            Commander
          </Link>
        </div>
      )}
    </nav>
  );
}
