import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, TrendingUp, Droplets } from 'lucide-react';
import { useLang } from '../context/LangContext';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

export default function Home() {
  const { t } = useLang();

  const features = [
    { icon: Shield, titleKey: 'feat1_title' as const, descKey: 'feat1_desc' as const },
    { icon: Droplets, titleKey: 'feat2_title' as const, descKey: 'feat2_desc' as const },
    { icon: TrendingUp, titleKey: 'feat3_title' as const, descKey: 'feat3_desc' as const },
  ];

  const tiers = [
    { key: 'tier_or' as const, color: 'var(--gold)' },
    { key: 'tier_argent' as const, color: '#d1d5db' },
    { key: 'tier_bronze' as const, color: '#fca5a1' },
  ];

  return (
    <div className="bg-onyx text-white min-h-screen">

      {/* Hero */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src="/images/hero.png"
            alt="Wagyu Marbling"
            animate={{
              scale: [1, 1.18, 1.08, 1.2, 1],
              x: [0, -30, 20, -15, 0],
              y: [0, -12, 10, -8, 0],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, display: 'block', transformOrigin: 'center center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            src="/logo.png"
            alt="Crown & Bull"
            className="h-32 md:h-48 w-auto gold-filter mb-8"
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="heading-bebas text-6xl md:text-8xl tracking-widest text-white mb-4"
          >
            {t('hero_title')} <span className="text-gold">{t('hero_highlight')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="heading-mont text-base md:text-xl tracking-[0.2em] text-white/75 uppercase mb-10 max-w-2xl"
          >
            {t('hero_sub')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link
              to="/shop"
              className="group flex items-center gap-4 bg-gold text-onyx heading-bebas px-8 py-4 text-2xl tracking-wider hover:bg-white transition-all"
            >
              <span>{t('hero_cta')}</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Standard */}
      <section style={{ padding: '8rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2
              className="heading-bebas text-gold"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.1em', marginBottom: '1.25rem' }}
            >
              {t('standard_eyebrow')}
            </h2>
            <p style={{ color: 'rgba(245,245,245,0.65)', maxWidth: '36rem', margin: '0 auto', fontSize: '1rem', fontWeight: 300, lineHeight: 1.75, textAlign: 'center' }}>
              {t('standard_sub')}
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '2rem' }}>
            {features.map(({ icon: Icon, titleKey, descKey }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                style={{
                  border: '1px solid rgba(197,160,89,0.2)',
                  padding: '2.5rem',
                  background: 'rgba(255,255,255,0.04)',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.7)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.2)')}
              >
                <Icon style={{ color: 'var(--gold)', width: '3rem', height: '3rem', marginBottom: '1.5rem' }} />
                <h3 className="heading-bebas" style={{ fontSize: '1.75rem', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                  {t(titleKey)}
                </h3>
                <p style={{ color: 'rgba(245,245,245,0.65)', fontWeight: 300, lineHeight: 1.7 }}>
                  {t(descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax break */}
      <section className="h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/coldroom.png"
            alt="Cold Storage"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              imageRendering: 'auto',
              display: 'block',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0.35) 0%, rgba(26,26,26,0.55) 100%)' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2
            {...fadeIn}
            className="heading-bebas text-white/90 drop-shadow-2xl text-center"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.12em' }}
          >
            {t('parallax_line1')}<br /><span className="text-gold">{t('parallax_line2')}</span>
          </motion.h2>
        </div>
      </section>

      {/* Sovereign Circle — strict 2-column */}
      <section style={{ padding: '6rem 0', background: 'rgba(197,160,89,0.04)', borderTop: '1px solid rgba(197,160,89,0.2)', borderBottom: '1px solid rgba(197,160,89,0.2)' }}>
        {/* centering wrapper */}
        <div style={{ width: '100%', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

            {/* Left: text */}
            <motion.div {...fadeIn} style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Star style={{ color: 'var(--gold)', width: '1rem', height: '1rem', fill: 'var(--gold)', flexShrink: 0 }} />
                <span className="heading-mont text-gold" style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                  {t('circle_eyebrow')}
                </span>
              </div>
              <h2
                className="heading-bebas"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.05, marginBottom: '1.25rem' }}
              >
                {t('circle_title')}<br />{t('circle_title2')}
              </h2>
              <p style={{ color: 'rgba(245,245,245,0.72)', fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.75, marginBottom: '1.25rem' }}>
                {t('circle_body')}
              </p>
              <p style={{ color: 'rgba(245,245,245,0.72)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--white)', fontWeight: 500 }}>{t('circle_b2b')}</strong>{' '}
                {t('circle_b2b_desc')}
              </p>
              <p style={{ color: 'rgba(245,245,245,0.72)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, marginBottom: '2rem' }}>
                <strong style={{ color: 'var(--white)', fontWeight: 500 }}>{t('circle_b2c')}</strong>{' '}
                {t('circle_b2c_desc')}
              </p>
              <button
                style={{
                  border: '1px solid var(--gold)',
                  color: 'var(--gold)',
                  background: 'transparent',
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '1.1rem',
                  letterSpacing: '0.18em',
                  padding: '0.7rem 2rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--onyx)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}
              >
                {t('circle_cta')}
              </button>
            </motion.div>

            {/* Right: tier cards */}
            <div style={{ position: 'relative', width: '100%' }}>
              <img
                src="/logo.png" alt="" aria-hidden="true" className="gold-filter"
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', height: '80%', objectFit: 'contain', opacity: 0.07, pointerEvents: 'none' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
                {tiers.map(({ key, color }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    style={{
                      background: 'var(--onyx)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '1.25rem 1.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span className="heading-bebas" style={{ fontSize: '1.4rem', letterSpacing: '0.1em', color }}>{t(key)}</span>
                    <div style={{ width: '3rem', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Secret Cuts SMS — guaranteed center */}
      <section style={{ padding: '7rem 1.5rem' }}>
        {/* outer flex centers the inner box horizontally */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            {...fadeIn}
            style={{ width: '100%', maxWidth: '640px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
          >
            <h2
              className="heading-bebas"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '0.08em', marginBottom: '1.25rem' }}
            >
              {t('sms_title')} <span style={{ color: '#ef4444' }}>{t('sms_highlight')}</span>
            </h2>
            <p style={{ color: 'rgba(245,245,245,0.65)', fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.75, marginBottom: '2.5rem' }}>
              {t('sms_sub')}
            </p>
            <div style={{ display: 'flex', width: '100%', maxWidth: '32rem', alignItems: 'stretch' }}>
              <input
                type="tel"
                placeholder={t('sms_placeholder')}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRight: 'none',
                  padding: '0.875rem 1.25rem',
                  color: 'var(--white)',
                  outline: 'none',
                  fontSize: '0.9375rem',
                  minWidth: 0,
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; e.target.style.borderRight = 'none'; }}
              />
              <button
                className="heading-bebas"
                style={{
                  background: 'var(--gold)',
                  color: 'var(--onyx)',
                  padding: '0.875rem 1.5rem',
                  fontSize: '1.1rem',
                  letterSpacing: '0.15em',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  transition: 'background 0.25s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--white)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--gold)')}
              >
                {t('sms_cta')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
