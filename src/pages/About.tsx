import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';

export default function About() {
  const { t } = useLang();

  const stats = [
    { valKey: 'about_stat1_val' as const, labelKey: 'about_stat1_label' as const },
    { valKey: 'about_stat2_val' as const, labelKey: 'about_stat2_label' as const },
    { valKey: 'about_stat3_val' as const, labelKey: 'about_stat3_label' as const },
  ];

  return (
    <div className="bg-onyx text-white min-h-screen">

      {/* Hero header */}
      <section
        className="page-top"
        style={{
          paddingBottom: '4rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '52rem' }}
          >
            <p
              className="heading-mont text-gold"
              style={{ fontSize: '0.7rem', letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: '1.25rem' }}
            >
              {t('about_eyebrow')}
            </p>
            <h1
              className="heading-bebas"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1, letterSpacing: '0.06em', marginBottom: '1.25rem' }}
            >
              {t('about_title')}<br />{t('about_title2')}
            </h1>
            <span className="gold-rule" />
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'flex-start' }}>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ order: 2 }}
            >
              <p style={{ fontSize: '1.15rem', fontWeight: 300, color: 'rgba(245,245,245,0.9)', lineHeight: 1.8, marginBottom: '2rem' }}>
                {t('about_lead')}
              </p>
              <p style={{ color: 'rgba(245,245,245,0.72)', fontWeight: 300, lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.9375rem' }}>
                {t('about_p1')}
              </p>
              <p style={{ color: 'rgba(245,245,245,0.72)', fontWeight: 300, lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.9375rem' }}>
                {t('about_p2')}
              </p>

              <blockquote style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '2rem', margin: '3rem 0' }}>
                <p
                  className="heading-bebas"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '0.04em', lineHeight: 1.25, marginBottom: '1rem', color: 'var(--white)' }}
                >
                  {t('about_quote')}
                </p>
                <footer
                  className="heading-mont text-gold"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  {t('about_quote_attr')}
                </footer>
              </blockquote>

              <p style={{ color: 'rgba(245,245,245,0.72)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.9375rem' }}>
                {t('about_p3')}
              </p>

              {/* Stats */}
              <div className="stats-grid" style={{
                marginTop: '3.5rem',
                paddingTop: '2.5rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}>
                {stats.map(({ valKey, labelKey }) => (
                  <div key={valKey}>
                    <p className="heading-bebas text-gold" style={{ fontSize: '2.25rem', lineHeight: 1, marginBottom: '0.35rem' }}>
                      {t(valKey)}
                    </p>
                    <p style={{ color: 'rgba(245,245,245,0.55)', fontSize: '0.7rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {t(labelKey)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual column */}
            <div style={{ order: 1 }}>
              <div style={{ position: 'sticky', top: '6rem' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                  style={{ border: '1px solid rgba(197,160,89,0.22)', padding: '1rem', aspectRatio: '3/4', position: 'relative' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: '1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(197,160,89,0.15)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2.5rem',
                      textAlign: 'center',
                    }}
                  >
                    <img src="/logo.png" alt="Logo" className="gold-filter" style={{ width: '5.5rem', height: 'auto', marginBottom: '2rem', opacity: 0.6 }} />
                    <h3 className="heading-bebas" style={{ fontSize: '1.75rem', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                      {t('about_card_title')}<br />{t('about_card_title2')}
                    </h3>
                    <div style={{ width: '2.5rem', height: '1px', background: 'var(--gold)', marginBottom: '1rem' }} />
                    <p style={{ color: 'rgba(245,245,245,0.58)', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.65 }}>
                      {t('about_card_sub')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
