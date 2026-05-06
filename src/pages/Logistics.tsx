import { motion } from 'framer-motion';
import { Truck, ThermometerSnowflake, PackageCheck, Clock } from 'lucide-react';
import { useLang } from '../context/LangContext';
import DeliveryMap from '../components/DeliveryMap';
import { useWindowSize } from '../hooks/useWindowSize';

export default function Logistics() {
  const { t } = useLang();
  const { isMobile, isTablet } = useWindowSize();

  const pillars = [
    { icon: ThermometerSnowflake, titleKey: 'log_p1_title' as const, descKey: 'log_p1_desc' as const },
    { icon: PackageCheck,        titleKey: 'log_p2_title' as const, descKey: 'log_p2_desc' as const },
    { icon: Truck,               titleKey: 'log_p3_title' as const, descKey: 'log_p3_desc' as const },
    { icon: Clock,               titleKey: 'log_p4_title' as const, descKey: 'log_p4_desc' as const },
  ];

  const zones = [
    { label: 'Zone 1', descKey: 'log_zone1' as const },
    { label: 'Zone 2', descKey: 'log_zone2' as const },
    { label: 'Zone 3', descKey: 'log_zone3' as const },
    { label: 'Zone 4', descKey: 'log_zone4' as const },
    { label: 'Zone 5', descKey: 'log_zone5' as const },
  ];

  return (
    <div className="bg-onyx text-white min-h-screen page-top" style={{ paddingBottom: '7rem', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle meat background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
      }}>
        <img
          src="/images/hero.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.07 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,26,0.5) 0%, transparent 30%, transparent 70%, rgba(26,26,26,0.7) 100%)' }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Page header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="heading-mont text-gold"
            style={{ fontSize: '0.7rem', letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: '1.25rem' }}
          >
            {t('log_eyebrow')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-bebas"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '0.06em', marginBottom: '1.25rem' }}
          >
            {t('log_title')} <span className="text-gold">{t('log_highlight')}</span>
          </motion.h1>
          <div style={{ width: '4rem', height: '1px', background: 'var(--gold)', margin: '0 auto 1.75rem' }} />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: 'rgba(245,245,245,0.75)', maxWidth: '38rem', margin: '0 auto', fontWeight: 300, lineHeight: 1.75, fontSize: '1rem' }}
          >
            {t('log_sub')}
          </motion.p>
        </div>

        {/* Four pillars — equal 4-column grid, centered */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, minmax(0, 1fr))', gap: isMobile ? '1rem' : '1.5rem', marginBottom: '5rem' }}>
          {pillars.map(({ icon: Icon, titleKey, descKey }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '2rem',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.5)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            >
              <Icon style={{ color: 'var(--gold)', width: '2.25rem', height: '2.25rem', marginBottom: '1.5rem' }} />
              <h3
                className="heading-bebas"
                style={{ fontSize: '1.25rem', letterSpacing: '0.06em', marginBottom: '0.75rem' }}
              >
                {t(titleKey)}
              </h3>
              <p style={{ color: 'rgba(245,245,245,0.70)', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.7 }}>
                {t(descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Delivery zones — strict 50/50 grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'grid',
            gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
            gap: isTablet ? '2rem' : '3rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(197,160,89,0.25)',
            padding: isTablet ? '1.5rem' : '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: text + zone list */}
          <div>
            <p
              className="heading-mont text-gold"
              style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}
            >
              {t('log_zones_eyebrow')}
            </p>
            <h2
              className="heading-bebas"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '0.06em', marginBottom: '1rem', lineHeight: 1.1 }}
            >
              {t('log_zones_title')}<br />{t('log_zones_title2')}
            </h2>
            <div style={{ width: '3rem', height: '1px', background: 'var(--gold)', marginBottom: '1.5rem' }} />
            <p style={{ color: 'rgba(245,245,245,0.75)', fontWeight: 300, lineHeight: 1.75, marginBottom: '2rem', fontSize: '0.9rem' }}>
              {t('log_zones_body')}
            </p>
            <ul style={{ listStyle: 'none' }}>
              {zones.map(({ label, descKey }, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    paddingBottom: '1rem',
                    marginBottom: '1rem',
                    borderBottom: i < zones.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  <span
                    className="heading-bebas text-gold"
                    style={{ minWidth: '4rem', fontSize: '1rem', paddingTop: '0.1rem' }}
                  >
                    {label}
                  </span>
                  <span style={{ color: 'rgba(245,245,245,0.78)', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6 }}>
                    {t(descKey)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: interactive delivery map */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '420px' }}>
            <DeliveryMap />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
