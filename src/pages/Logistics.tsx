import { motion } from 'framer-motion';
import { Truck, ThermometerSnowflake, PackageCheck, Clock, MapPin } from 'lucide-react';

const pillars = [
  { icon: ThermometerSnowflake, title: 'Froid Absolu', desc: 'Contrôle de température en temps réel dans nos entrepôts et nos camions. La chaîne n\'est jamais brisée.' },
  { icon: PackageCheck, title: 'Sous Vide Industriel', desc: 'Chaque coupe est scellée sous vide pour préserver l\'intégrité, la couleur et le goût pendant le transport.' },
  { icon: Truck, title: 'Flotte Dédiée', desc: 'Camions réfrigérés exclusifs à Phanor Distribution. Pas d\'intermédiaires, pas de compromis.' },
  { icon: Clock, title: 'Juste à Temps', desc: 'Routage optimisé pour les restaurants. Livraisons précises pour respecter vos horaires de service.' },
];

const zones = [
  { zone: 'Zone 1', desc: 'Centre-Ville, Vieux-Montréal, Griffintown — Quotidien' },
  { zone: 'Zone 2', desc: 'Plateau, Mile-End, Outremont — Mar–Sam' },
  { zone: 'Zone 3', desc: 'Ouest de l\'Île, NDG, Westmount — Mer–Ven' },
  { zone: 'Zone 4', desc: 'Est de Montréal, Anjou — Jeu–Sam' },
  { zone: 'Zone 5', desc: 'Laval & Rive-Sud — Sur demande / B2B' },
];

export default function Logistics() {
  return (
    <div className="bg-onyx text-white min-h-screen page-top" style={{ paddingBottom: '7rem' }}>
      <div className="container mx-auto px-6">

        {/* Page header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="heading-mont text-gold"
            style={{ fontSize: '0.7rem', letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: '1.25rem' }}
          >
            Infrastructure & Distribution
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-bebas"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '0.06em', marginBottom: '1.25rem' }}
          >
            LA LOGISTIQUE <span className="text-gold">PHANOR</span>
          </motion.h1>
          <div style={{ width: '4rem', height: '1px', background: 'var(--gold)', margin: '0 auto 1.75rem' }} />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: 'rgba(245,245,245,0.75)', maxWidth: '38rem', margin: '0 auto', fontWeight: 300, lineHeight: 1.75, fontSize: '1rem' }}
          >
            La qualité de la viande ne vaut rien si la chaîne de froid échoue. Notre infrastructure logistique est conçue avec une précision militaire pour garantir la perfection, de nos chambres froides à votre porte.
          </motion.p>
        </div>

        {/* Four pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem',
          }}
        >
          {pillars.map((item, i) => (
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
              <item.icon style={{ color: 'var(--gold)', width: '2.25rem', height: '2.25rem', marginBottom: '1.5rem' }} />
              <h3
                className="heading-bebas"
                style={{ fontSize: '1.35rem', letterSpacing: '0.06em', marginBottom: '0.75rem' }}
              >
                {item.title}
              </h3>
              <p style={{ color: 'rgba(245,245,245,0.70)', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Delivery zones */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(197,160,89,0.25)',
            padding: '4rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Text */}
          <div style={{ flex: '1 1 320px' }}>
            <p
              className="heading-mont text-gold"
              style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}
            >
              Couverture Géographique
            </p>
            <h2
              className="heading-bebas"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.06em', marginBottom: '1rem', lineHeight: 1.1 }}
            >
              ZONES DE LIVRAISON<br />MONTRÉAL
            </h2>
            <div style={{ width: '3rem', height: '1px', background: 'var(--gold)', marginBottom: '1.75rem' }} />
            <p style={{ color: 'rgba(245,245,245,0.75)', fontWeight: 300, lineHeight: 1.75, marginBottom: '2rem', fontSize: '0.9375rem' }}>
              Notre réseau couvre la grande région de Montréal en 5 zones distinctes. La livraison B2B est quotidienne pour le centre-ville (Zone 1). La livraison B2C s'effectue sur des fenêtres horaires strictes.
            </p>
            <ul style={{ listStyle: 'none' }}>
              {zones.map((z, i) => (
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
                    style={{ minWidth: '4rem', fontSize: '1.1rem', paddingTop: '0.1rem' }}
                  >
                    {z.zone}
                  </span>
                  <span style={{ color: 'rgba(245,245,245,0.78)', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6 }}>
                    {z.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map placeholder */}
          <div style={{ flex: '1 1 280px' }}>
            <div
              style={{
                aspectRatio: '1',
                border: '1px solid rgba(197,160,89,0.2)',
                background: 'rgba(255,255,255,0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: '2rem',
              }}
            >
              <MapPin style={{ color: 'var(--gold)', width: '3rem', height: '3rem', opacity: 0.65 }} />
              <p
                className="heading-bebas text-gold"
                style={{ letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.9rem', opacity: 0.6 }}
              >
                Carte Interactive
              </p>
              <p style={{ color: 'rgba(245,245,245,0.35)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                En développement
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
