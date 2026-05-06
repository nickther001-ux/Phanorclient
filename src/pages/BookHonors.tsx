import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';

export default function BookHonors() {
  const { t } = useLang();

  return (
    <div className="bg-onyx text-white min-h-screen relative overflow-hidden">

      {/* Background image */}
      <div className="absolute top-0 right-0 w-1/2 h-full z-0 pointer-events-none">
        <img
          src="/images/book-honors.png"
          alt="Luxury Catering"
          className="w-full h-full object-cover"
          style={{ opacity: 0.15 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, #1A1A1A 30%, rgba(26,26,26,0.75) 70%, rgba(26,26,26,0.2))' }}
        />
      </div>

      <div className="page-top" style={{ paddingBottom: '7rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: '3rem' }}
            >
              <p
                className="heading-mont text-gold"
                style={{ fontSize: '0.7rem', letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: '1.25rem' }}
              >
                {t('bh_eyebrow')}
              </p>
              <h1
                className="heading-bebas"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1, letterSpacing: '0.06em', marginBottom: '1.25rem' }}
              >
                {t('bh_title')}<br />{t('bh_title2')}
              </h1>
              <span className="gold-rule" />
              <p style={{ color: 'rgba(245,245,245,0.75)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.75, maxWidth: '34rem' }}>
                {t('bh_sub')}
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(197,160,89,0.22)',
                padding: '2.5rem',
                backdropFilter: 'blur(8px)',
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-row-2" style={{ marginBottom: '1.75rem' }}>
                <div>
                  <label className="form-label">{t('bh_label_name')}</label>
                  <input type="text" className="form-input" />
                </div>
                <div>
                  <label className="form-label">{t('bh_label_company')}</label>
                  <input type="text" className="form-input" />
                </div>
                <div>
                  <label className="form-label">{t('bh_label_email')}</label>
                  <input type="email" className="form-input" />
                </div>
                <div>
                  <label className="form-label">{t('bh_label_phone')}</label>
                  <input type="tel" className="form-input" />
                </div>
              </div>

              <div className="form-row-3" style={{ marginBottom: '1.75rem' }}>
                <div>
                  <label className="form-label">{t('bh_label_type')}</label>
                  <select className="form-input" style={{ background: 'var(--onyx)', cursor: 'pointer' }}>
                    <option>{t('bh_type_corp')}</option>
                    <option>{t('bh_type_wedding')}</option>
                    <option>{t('bh_type_private')}</option>
                    <option>{t('bh_type_other')}</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">{t('bh_label_guests')}</label>
                  <input type="number" className="form-input" />
                </div>
                <div>
                  <label className="form-label">{t('bh_label_date')}</label>
                  <input type="date" className="form-input" />
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label className="form-label">{t('bh_label_details')}</label>
                <textarea rows={4} className="form-input" style={{ resize: 'none' }} />
              </div>

              <button
                type="submit"
                className="heading-bebas bg-gold text-onyx"
                style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', letterSpacing: '0.18em', transition: 'background 0.3s', border: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--white)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--gold)')}
              >
                {t('bh_submit')}
              </button>
            </motion.form>

          </div>
        </div>
      </div>
    </div>
  );
}
