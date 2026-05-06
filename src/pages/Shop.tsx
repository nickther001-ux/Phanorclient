import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, AlertCircle } from 'lucide-react';

const B2C_PRODUCTS = [
  { id: 1, name: 'Sélect Bundle: Le Classique', desc: '4x Ribeye Prime, 2x Saumon, 1kg Viande Hachée Maigre', price: 145, weight: '3.5 kg', lowStock: false, image: '/images/packaging.png' },
  { id: 2, name: 'Sélect Bundle: Le Souverain', desc: '2x Wagyu A5 Striploin, 4x Filet Mignon, Pattes de Crabe', price: 380, weight: '2.8 kg', lowStock: true, image: '/images/hero.png' },
  { id: 3, name: 'Pack Grillade', desc: 'Saucisses artisanales, Brisket 2kg, Poulet entier', price: 110, weight: '4.5 kg', lowStock: false, image: '/images/packaging.png' },
];

const B2B_PRODUCTS = [
  { id: 4, name: 'Caisse: Ribeye AAA', desc: 'Coupe entière, non parée, emballage sous vide industriel', price: 450, weight: '12-14 kg', lowStock: false, image: '/images/storage.png' },
  { id: 5, name: 'Caisse: Saumon de l\'Atlantique', desc: 'Filets entiers, qualité sushi', price: 280, weight: '10 kg', lowStock: false, image: '/images/seafood.png' },
  { id: 6, name: 'Caisse: Poitrine de Boeuf (Brisket)', desc: 'Idéal pour fumoir commercial', price: 310, weight: '15 kg', lowStock: true, image: '/images/storage.png' },
  { id: 7, name: 'Caisse: Pattes de Crabe Royal', desc: 'Congélation rapide, qualité supérieure', price: 650, weight: '9 kg', lowStock: false, image: '/images/seafood.png' },
];

export default function Shop() {
  const [mode, setMode] = useState<'b2c' | 'b2b'>('b2c');

  const products = mode === 'b2c' ? B2C_PRODUCTS : B2B_PRODUCTS;

  return (
    <div className="bg-onyx text-white min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        
        {/* Header & Toggle */}
        <div className="flex flex-col items-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-bebas text-6xl md:text-8xl text-center mb-10"
          >
            LA BOUTIQUE <span className="text-gold">SOUVERAINE</span>
          </motion.h1>

          <div className="flex border border-gold/30 p-1 bg-white/5 backdrop-blur-sm relative">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gold transition-all duration-300 z-0 ${mode === 'b2c' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
            ></div>
            
            <button 
              onClick={() => setMode('b2c')}
              className={`relative z-10 px-8 py-3 heading-bebas text-2xl tracking-wider transition-colors ${mode === 'b2c' ? 'text-onyx' : 'text-white/70 hover:text-white'}`}
            >
              Sélect Bundles (B2C)
            </button>
            <button 
              onClick={() => setMode('b2b')}
              className={`relative z-10 px-8 py-3 heading-bebas text-2xl tracking-wider transition-colors ${mode === 'b2b' ? 'text-onyx' : 'text-white/70 hover:text-white'}`}
            >
              Wholesale Cases (B2B)
            </button>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <div key={product.id} className="group border border-white/10 bg-white/5 hover:border-gold/50 transition-colors overflow-hidden flex flex-col">
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  />
                  {product.lowStock && (
                    <div className="absolute top-4 right-4 bg-red-600/90 text-white heading-bebas px-3 py-1 tracking-wider text-sm flex items-center gap-2 backdrop-blur-sm">
                      <AlertCircle size={14} /> FAIBLE STOCK
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-onyx/90 text-gold heading-mont px-3 py-1 text-xs tracking-widest uppercase border border-gold/30">
                    {product.weight}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="heading-bebas text-3xl mb-2 tracking-wide text-white group-hover:text-gold transition-colors">{product.name}</h3>
                  <p className="text-white/50 text-sm font-light mb-6 flex-grow">{product.desc}</p>
                  
                  <div className="flex items-end justify-between mt-auto">
                    <div className="heading-mont font-medium text-2xl">${product.price}</div>
                    <button className="flex items-center gap-2 border border-white/20 px-4 py-2 hover:bg-white hover:text-onyx transition-colors text-sm uppercase tracking-wider font-medium">
                      <ShoppingCart size={16} /> Ajouter
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