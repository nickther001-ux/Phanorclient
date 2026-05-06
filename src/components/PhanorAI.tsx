import { useState } from 'react';
import { MessageSquare, X, Calculator, PackageSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhanorAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'menu' | 'calculator' | 'bundle'>('menu');
  
  // Calculator state
  const [guestCount, setGuestCount] = useState('');
  const [meatType, setMeatType] = useState('steak');
  const [calcResult, setCalcResult] = useState<string | null>(null);

  // Bundle state
  const [budget, setBudget] = useState('');
  const [bundleResult, setBundleResult] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(guestCount);
    if (!count) return;
    
    let multiplier = 0;
    if (meatType === 'steak') multiplier = 0.35; // 350g per person
    if (meatType === 'brisket') multiplier = 0.5; // 500g raw per person
    if (meatType === 'seafood') multiplier = 0.25; // 250g per person
    
    const total = (count * multiplier).toFixed(1);
    setCalcResult(`Pour ${count} invités, nous recommandons ${total} kg de ${meatType}.`);
  };

  const handleBundle = (e: React.FormEvent) => {
    e.preventDefault();
    const budg = parseInt(budget);
    if (!budg) return;
    
    if (budg < 150) setBundleResult("Le Pack Bronze: Assortiment de coupes quotidiennes premium.");
    else if (budg < 300) setBundleResult("Le Pack Argent: Sélection de steaks vieillis et saumon.");
    else setBundleResult("Le Pack Souverain: Wagyu, crabe royal et coupes d'exception.");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-onyx border border-gold shadow-2xl w-80 mb-4 flex flex-col overflow-hidden"
          >
            <div className="bg-gold text-onyx px-4 py-3 flex justify-between items-center">
              <span className="heading-bebas tracking-wider text-xl">PHANOR AI</span>
              <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 h-80 overflow-y-auto">
              {mode === 'menu' && (
                <div className="space-y-4">
                  <p className="text-white/80 text-sm mb-4">Comment l'Intelligence Souveraine peut-elle vous assister aujourd'hui?</p>
                  
                  <button 
                    onClick={() => setMode('calculator')}
                    className="w-full flex items-center gap-3 p-3 border border-gold/30 hover:border-gold hover:bg-gold/10 transition-colors text-left"
                  >
                    <Calculator className="text-gold" size={24} />
                    <div>
                      <div className="text-gold font-medium text-sm">Calculateur de Consommation</div>
                      <div className="text-white/50 text-xs">Estimez vos besoins en viande</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setMode('bundle')}
                    className="w-full flex items-center gap-3 p-3 border border-gold/30 hover:border-gold hover:bg-gold/10 transition-colors text-left"
                  >
                    <PackageSearch className="text-gold" size={24} />
                    <div>
                      <div className="text-gold font-medium text-sm">Générateur de Bundle</div>
                      <div className="text-white/50 text-xs">Trouvez le pack selon votre budget</div>
                    </div>
                  </button>
                </div>
              )}

              {mode === 'calculator' && (
                <div>
                  <button onClick={() => setMode('menu')} className="text-gold text-xs mb-4 hover:underline">&larr; Retour</button>
                  <form onSubmit={handleCalculate} className="space-y-4">
                    <div>
                      <label className="block text-white/70 text-xs mb-1">Nombre d'invités</label>
                      <input 
                        type="number" 
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full bg-transparent border border-white/20 p-2 text-white focus:border-gold outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs mb-1">Type de coupe</label>
                      <select 
                        value={meatType}
                        onChange={(e) => setMeatType(e.target.value)}
                        className="w-full bg-onyx border border-white/20 p-2 text-white focus:border-gold outline-none"
                      >
                        <option value="steak">Steak (Ribeye, Striploin)</option>
                        <option value="brisket">Brisket (Avant cuisson)</option>
                        <option value="seafood">Fruits de mer</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-gold text-onyx heading-bebas py-2 text-lg tracking-wider">
                      Calculer
                    </button>
                  </form>
                  {calcResult && (
                    <div className="mt-4 p-3 bg-white/5 border-l-2 border-gold text-sm text-white/90">
                      {calcResult}
                    </div>
                  )}
                </div>
              )}

              {mode === 'bundle' && (
                <div>
                  <button onClick={() => setMode('menu')} className="text-gold text-xs mb-4 hover:underline">&larr; Retour</button>
                  <form onSubmit={handleBundle} className="space-y-4">
                    <div>
                      <label className="block text-white/70 text-xs mb-1">Budget désiré ($)</label>
                      <input 
                        type="number" 
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-transparent border border-white/20 p-2 text-white focus:border-gold outline-none"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full bg-gold text-onyx heading-bebas py-2 text-lg tracking-wider">
                      Générer
                    </button>
                  </form>
                  {bundleResult && (
                    <div className="mt-4 p-3 bg-white/5 border-l-2 border-gold text-sm text-white/90">
                      {bundleResult}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-onyx shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:scale-105 transition-transform border border-onyx/20"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
