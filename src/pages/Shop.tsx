import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, AlertCircle, Home, Building2 } from 'lucide-react';
import { useLang } from '../context/LangContext';

const B2C_PRODUCTS = [
  { id: 1, name: 'Sélect Bundle: Le Classique', desc: '4x Ribeye Prime, 2x Saumon, 1kg Viande Hachée Maigre', price: 145, weight: '3.5 kg', lowStock: false, image: '/images/packaging.png' },
  { id: 2, name: 'Sélect Bundle: Le Souverain', desc: '2x Wagyu A5 Striploin, 4x Filet Mignon, Pattes de Crabe', price: 380, weight: '2.8 kg', lowStock: true, image: '/images/hero.png' },
  { id: 3, name: 'Pack Grillade', desc: 'Saucisses artisanales, Brisket 2kg, Poulet entier', price: 110, weight: '4.5 kg', lowStock: false, image: '/images/packaging.png' },
];

const B2B_PRODUCTS = [
  { id: 4, name: 'Caisse: Ribeye AAA', desc: 'Coupe entière, non parée, emballage sous vide industriel', price: 450, weight: '12–14 kg', lowStock: false, image: '/images/storage.png' },
  { id: 5, name: "Caisse: Saumon de l'Atlantique", desc: 'Filets entiers, qualité sushi', price: 280, weight: '10 kg', lowStock: false, image: '/images/seafood.png' },
  { id: 6, name: 'Caisse: Poitrine de Boeuf (Brisket)', desc: 'Idéal pour fumoir commercial', price: 310, weight: '15 kg', lowStock: true, image: '/images/storage.png' },
  { id: 7, name: 'Caisse: Pattes de Crabe Royal', desc: 'Congélation rapide, qualité supérieure', price: 650, weight: '9 kg', lowStock: false, image: '/images/seafood.png' },
];

export default function Shop() {
  const [mode, setMode] = useState<'b2c' | 'b2b'>('b2c');
  const { t } = useLang();

  const products = mode === 'b2c' ? B2C_PRODUCTS : B2B_PRODUCTS;

  return (
    <div className="bg-onyx text-white min-h-screen page-top" style={{ paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header & Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-bebas"
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', textAlign: 'center', marginBottom: '2.5rem', letterSpacing: '0.06em' }}
          >
            {t('shop_title')} <span className="text-gold">{t('shop_highlight')}</span>
          </motion.h1>

          {/* Visual mode selector cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%', maxWidth: '52rem' }}>
            {([
              { key: 'b2c' as const, img: '/images/packaging.png', Icon: Home, btnKey: 'shop_b2c_btn' as const, tagKey: 'shop_b2c_tag' as const, subKey: 'shop_b2c_sub' as const },
              { key: 'b2b' as const, img: '/images/storage.png',   Icon: Building2, btnKey: 'shop_b2b_btn' as const, tagKey: 'shop_b2b_tag' as const, subKey: 'shop_b2b_sub' as const },
            ]).map(({ key, img, Icon, btnKey, tagKey, subKey }) => {
              const active = mode === key;
              return (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  style={{
                    position: 'relative', overflow: 'hidden', height: '9rem',
                    border: active ? '2px solid var(--gold)' : '2px solid rgba(197,160,89,0.2)',
                    background: 'none', cursor: 'pointer', padding: 0,
                    transition: 'border-color 0.3s',
                    outline: 'none',
                  }}
                >
                  {/* Background image */}
                  <img
                    src={img} alt=""
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: active ? 0.35 : 0.15, transition: 'opacity 0.4s' }}
                  />
                  {/* Dark overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: active ? 'rgba(26,26,26,0.55)' : 'rgba(26,26,26,0.78)', transition: 'background 0.4s' }} />

                  {/* Gold bottom bar when active */}
                  {active && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'var(--gold)' }} />}

                  {/* Content */}
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '0.5rem', padding: '1rem' }}>
                    <span
                      className="heading-bebas"
                      style={{ fontSize: '1.75rem', letterSpacing: '0.12em', color: active ? 'var(--white)' : 'rgba(245,245,245,0.45)', transition: 'color 0.3s', lineHeight: 1 }}
                    >
                      {t(btnKey)}
                    </span>
                    <span
                      className="heading-mont"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: active ? 'rgba(245,245,245,0.7)' : 'rgba(245,245,245,0.3)', transition: 'color 0.3s' }}
                    >
                      {t(subKey)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'border-color 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.5)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              >
                <div style={{ height: '16rem', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, transition: 'transform 0.7s, opacity 0.3s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '0.8'; }}
                  />
                  {product.lowStock && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(220,38,38,0.9)', color: 'white', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', backdropFilter: 'blur(4px)' }}>
                      <AlertCircle size={13} />
                      <span className="heading-bebas" style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>{t('shop_low_stock')}</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(26,26,26,0.9)', color: 'var(--gold)', padding: '0.2rem 0.65rem', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid rgba(197,160,89,0.3)', fontFamily: 'Montserrat, sans-serif' }}>
                    {product.weight}
                  </div>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 className="heading-bebas" style={{ fontSize: '1.5rem', letterSpacing: '0.06em', marginBottom: '0.5rem', color: 'var(--white)', transition: 'color 0.3s' }}>
                    {product.name}
                  </h3>
                  <p style={{ color: 'rgba(245,245,245,0.5)', fontSize: '0.875rem', fontWeight: 300, marginBottom: '1.5rem', flexGrow: 1 }}>
                    {product.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <span className="heading-mont" style={{ fontSize: '1.5rem', fontWeight: 500 }}>${product.price}</span>
                    <button
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 1rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', background: 'none', color: 'var(--white)', cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--onyx)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--white)'; }}
                    >
                      <ShoppingCart size={14} /> {t('shop_add')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
