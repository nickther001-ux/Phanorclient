import { motion } from 'framer-motion';

export default function BookHonors() {
  return (
    <div className="bg-onyx text-white min-h-screen relative overflow-hidden">

      {/* Background image — right side panel */}
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
        <div className="container mx-auto px-6 relative z-10">
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
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                Service Traiteur Exclusif
              </p>
              <h1
                className="heading-bebas"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  lineHeight: 1,
                  letterSpacing: '0.06em',
                  marginBottom: '1.25rem',
                }}
              >
                BOOK<br />HONORS
              </h1>
              <span className="gold-rule" />
              <p
                style={{
                  color: 'rgba(245,245,245,0.75)',
                  fontSize: '1rem',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  maxWidth: '34rem',
                }}
              >
                Pour les événements qui exigent l'absolu. Notre division traiteur de luxe transforme la viande de qualité supérieure en une expérience culinaire inoubliable. Mariages, galas d'entreprise, soirées privées.
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
              {/* Row 1 */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.75rem',
                  marginBottom: '1.75rem',
                }}
              >
                <div>
                  <label className="form-label">Nom Complet</label>
                  <input type="text" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Compagnie (Optionnel)</label>
                  <input type="text" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Courriel</label>
                  <input type="email" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Téléphone</label>
                  <input type="tel" className="form-input" />
                </div>
              </div>

              {/* Row 2 */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.75rem',
                  marginBottom: '1.75rem',
                }}
              >
                <div>
                  <label className="form-label">Type d'Événement</label>
                  <select
                    className="form-input"
                    style={{
                      background: 'var(--onyx)',
                      cursor: 'pointer',
                    }}
                  >
                    <option>Corporatif</option>
                    <option>Mariage</option>
                    <option>Privé</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Invités (approx.)</label>
                  <input type="number" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Date Prévue</label>
                  <input type="date" className="form-input" />
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '2rem' }}>
                <label className="form-label">Détails de l'expérience souhaitée</label>
                <textarea
                  rows={4}
                  className="form-input"
                  style={{ resize: 'none' }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="heading-bebas bg-gold text-onyx"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.2rem',
                  letterSpacing: '0.18em',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--white)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--gold)')}
              >
                SOUMETTRE LA REQUÊTE
              </button>
            </motion.form>

          </div>
        </div>
      </div>
    </div>
  );
}
