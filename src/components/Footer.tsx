import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useLang } from '../context/LangContext';

export default function Footer() {
  const { t } = useLang();

  const navLinks = [
    { key: 'nav_home' as const, path: '/' },
    { key: 'nav_shop' as const, path: '/shop' },
    { key: 'nav_bookHonors' as const, path: '/book-honors' },
    { key: 'nav_logistics' as const, path: '/logistics' },
    { key: 'nav_about' as const, path: '/about' },
  ];

  return (
    <footer style={{ background: 'var(--onyx)', borderTop: '1px solid rgba(197,160,89,0.2)', paddingTop: '5rem', paddingBottom: '2.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <img src="/logo.png" alt="Phanor Logo" className="gold-filter" style={{ height: '4rem', width: 'auto', marginBottom: '1.5rem' }} />
            <p style={{ color: 'rgba(245,245,245,0.55)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem', fontWeight: 300 }}>
              {t('footer_tagline')}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'var(--gold)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gold)')}><Instagram size={18} /></a>
              <a href="#" style={{ color: 'var(--gold)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gold)')}><Facebook size={18} /></a>
              <a href="#" style={{ color: 'var(--gold)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gold)')}><Twitter size={18} /></a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="heading-bebas text-gold" style={{ fontSize: '1.25rem', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
              {t('footer_nav')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map(({ key, path }) => (
                <li key={key}>
                  <Link
                    to={path}
                    className="heading-mont"
                    style={{ color: 'rgba(245,245,245,0.6)', fontSize: '0.875rem', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,245,245,0.6)')}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="heading-bebas text-gold" style={{ fontSize: '1.25rem', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
              {t('footer_contact')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'rgba(245,245,245,0.6)', fontSize: '0.875rem' }}>
                <MapPin size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '0.1rem' }} />
                <span>Montréal, QC<br />Zone de livraison 1–5</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(245,245,245,0.6)', fontSize: '0.875rem' }}>
                <Phone size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span>438-373-7253</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(245,245,245,0.6)', fontSize: '0.875rem' }}>
                <Mail size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span>feedme.meat01@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="heading-bebas text-gold" style={{ fontSize: '1.25rem', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
              {t('footer_newsletter')}
            </h4>
            <p style={{ color: 'rgba(245,245,245,0.55)', fontSize: '0.875rem', fontWeight: 300, marginBottom: '1rem' }}>
              {t('footer_newsletter_sub')}
            </p>
            <form
              style={{ display: 'flex', border: '1px solid rgba(197,160,89,0.3)', transition: 'border-color 0.2s' }}
              onSubmit={(e) => e.preventDefault()}
              onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)')}
              onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(197,160,89,0.3)')}
            >
              <input
                type="email"
                placeholder={t('footer_email_placeholder')}
                style={{ background: 'transparent', color: 'var(--white)', padding: '0.625rem 1rem', width: '100%', outline: 'none', fontSize: '0.875rem', border: 'none' }}
              />
              <button
                type="submit"
                className="heading-bebas bg-gold text-onyx"
                style={{ padding: '0.625rem 1rem', fontSize: '0.9rem', letterSpacing: '0.12em', border: 'none', cursor: 'pointer', flexShrink: 0, transition: 'background 0.25s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--white)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--gold)')}
              >
                {t('footer_join')}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ color: 'rgba(245,245,245,0.35)', fontSize: '0.75rem', fontWeight: 300 }}>
            &copy; {new Date().getFullYear()} {t('footer_rights')}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {([['footer_privacy', '#'], ['footer_terms', '#']] as const).map(([key, href]) => (
              <a
                key={key}
                href={href}
                style={{ color: 'rgba(245,245,245,0.35)', fontSize: '0.75rem', fontWeight: 300, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,245,245,0.35)')}
              >
                {t(key)}
              </a>
            ))}
          </div>
        </div>

        {/* Builder credit */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a
            href="https://ntwebux.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(245,245,245,0.25)', fontSize: '0.7rem', fontWeight: 300, letterSpacing: '0.08em', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,245,245,0.25)')}
          >
            built by ntwebUX.com
          </a>
        </div>
      </div>
    </footer>
  );
}
