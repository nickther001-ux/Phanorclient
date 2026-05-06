import { motion } from 'framer-motion';

const stats = [
  { value: '8', label: "Années d'expertise" },
  { value: '500+', label: 'Clients servis' },
  { value: '3', label: 'Divisions actives' },
];

export default function About() {
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
        <div className="container mx-auto">
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
              L'Histoire
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
              DE BOUCHER À<br />L'EMPIRE
            </h1>
            <span className="gold-rule" />
          </motion.div>
        </div>
      </section>

      {/* Story content */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div className="container mx-auto">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5rem',
              alignItems: 'flex-start',
            }}
          >

            {/* Text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ flex: '1 1 340px', order: 2 }}
            >
              <p style={{ fontSize: '1.2rem', fontWeight: 300, color: 'rgba(245,245,245,0.9)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Fondée par Widler Junior Phanor, Phanor Distribution Inc. n'est pas née dans une salle de conférence, mais derrière le comptoir d'une boucherie de quartier.
              </p>

              <p style={{ color: 'rgba(245,245,245,0.72)', fontWeight: 300, lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.9375rem' }}>
                Il y a 8 ans, Widler a commencé avec un seul objectif : maîtriser l'art de la coupe. De la compréhension des muscles, du persillage et du vieillissement à sec, il a forgé une expertise que peu possèdent. Mais le comptoir de boucherie était trop petit pour sa vision. Il a vu comment l'industrie fonctionnait — les intermédiaires, les marges, la perte de qualité en transit — et a décidé de tout rebâtir.
              </p>

              <p style={{ color: 'rgba(245,245,245,0.72)', fontWeight: 300, lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.9375rem' }}>
                Phanor Distribution a été créée pour combler le vide entre la ferme et la table des chefs. En éliminant les compromis, Widler a construit un réseau logistique intégré verticalement. Aujourd'hui, l'entreprise approvisionne les restaurants les plus exigeants de Montréal, les marchés premium et les foyers qui refusent la médiocrité.
              </p>

              <blockquote
                style={{
                  borderLeft: '2px solid var(--gold)',
                  paddingLeft: '2rem',
                  margin: '3rem 0',
                }}
              >
                <p
                  className="heading-bebas"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', letterSpacing: '0.04em', lineHeight: 1.25, marginBottom: '1rem', color: 'var(--white)' }}
                >
                  "NOUS NE VENDONS PAS DE LA VIANDE. NOUS VENDONS DE LA PRÉCISION, DE LA FIABILITÉ ET DU RESPECT POUR LE PRODUIT."
                </p>
                <footer
                  className="heading-mont text-gold"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  — Widler Junior Phanor
                </footer>
              </blockquote>

              <p style={{ color: 'rgba(245,245,245,0.72)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.9375rem' }}>
                De la division Book Honors qui élève le service traiteur à un niveau Michelin, jusqu'aux Sélect Bundles qui apportent la qualité restaurant aux familles, l'empire de Widler continue de s'étendre. La couronne et le taureau de notre logo ne sont pas qu'un symbole ; c'est un sceau de souveraineté sur l'industrie.
              </p>

              {/* Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.5rem',
                  marginTop: '3.5rem',
                  paddingTop: '2.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="heading-bebas text-gold" style={{ fontSize: '2.25rem', lineHeight: 1, marginBottom: '0.35rem' }}>
                      {s.value}
                    </p>
                    <p style={{ color: 'rgba(245,245,245,0.55)', fontSize: '0.7rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual column */}
            <div style={{ flex: '1 1 280px', order: 1 }}>
              <div style={{ position: 'sticky', top: '6rem' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                  style={{ border: '1px solid rgba(197,160,89,0.22)', padding: '1rem', aspectRatio: '3/4' }}
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
                      8 ANNÉES<br />D'EXCELLENCE
                    </h3>
                    <div style={{ width: '2.5rem', height: '1px', background: 'var(--gold)', marginBottom: '1rem' }} />
                    <p style={{ color: 'rgba(245,245,245,0.58)', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.65 }}>
                      Une fondation bâtie sur la maîtrise absolue du produit.
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
