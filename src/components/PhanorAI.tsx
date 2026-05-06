import { useState } from 'react';
import { MessageSquare, X, Calculator, PackageSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LangContext';

export default function PhanorAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'menu' | 'calculator' | 'bundle'>('menu');
  const { lang, t } = useLang();

  const [guestCount, setGuestCount] = useState('');
  const [meatType, setMeatType] = useState('steak');
  const [calcResult, setCalcResult] = useState<string | null>(null);

  const [budget, setBudget] = useState('');
  const [bundleResult, setBundleResult] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(guestCount);
    if (!count) return;
    let multiplier = meatType === 'steak' ? 0.35 : meatType === 'brisket' ? 0.5 : 0.25;
    const total = (count * multiplier).toFixed(1);
    const meatLabel = meatType === 'steak' ? t('ai_steak') : meatType === 'brisket' ? t('ai_brisket') : t('ai_seafood');
    if (lang === 'fr') {
      setCalcResult(`Pour ${count} invités, nous recommandons ${total} kg — ${meatLabel}.`);
    } else {
      setCalcResult(`For ${count} guests, we recommend ${total} kg — ${meatLabel}.`);
    }
  };

  const handleBundle = (e: React.FormEvent) => {
    e.preventDefault();
    const budg = parseInt(budget);
    if (!budg) return;
    if (lang === 'fr') {
      if (budg < 150) setBundleResult("Le Pack Bronze : Assortiment de coupes quotidiennes premium.");
      else if (budg < 300) setBundleResult("Le Pack Argent : Sélection de steaks vieillis et saumon.");
      else setBundleResult("Le Pack Souverain : Wagyu, crabe royal et coupes d'exception.");
    } else {
      if (budg < 150) setBundleResult("The Bronze Pack: Assortment of premium everyday cuts.");
      else if (budg < 300) setBundleResult("The Silver Pack: Selection of aged steaks and salmon.");
      else setBundleResult("The Sovereign Pack: Wagyu, king crab, and exceptional cuts.");
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{ background: 'var(--onyx)', border: '1px solid var(--gold)', boxShadow: '0 8px 40px rgba(0,0,0,0.6)', width: '20rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            {/* Header */}
            <div style={{ background: 'var(--gold)', color: 'var(--onyx)', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="heading-bebas" style={{ fontSize: '1.2rem', letterSpacing: '0.15em' }}>PHANOR AI</span>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--onyx)', transition: 'opacity 0.2s' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '1rem', height: '20rem', overflowY: 'auto' }}>
              {mode === 'menu' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ color: 'rgba(245,245,245,0.75)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {t('ai_greeting')}
                  </p>
                  <button
                    onClick={() => setMode('calculator')}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid rgba(197,160,89,0.3)', background: 'none', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.2s, background 0.2s', width: '100%' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(197,160,89,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.3)'; e.currentTarget.style.background = 'none'; }}
                  >
                    <Calculator style={{ color: 'var(--gold)', flexShrink: 0 }} size={22} />
                    <div>
                      <div style={{ color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>{t('ai_calc_title')}</div>
                      <div style={{ color: 'rgba(245,245,245,0.45)', fontSize: '0.75rem' }}>{t('ai_calc_sub')}</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setMode('bundle')}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid rgba(197,160,89,0.3)', background: 'none', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.2s, background 0.2s', width: '100%' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(197,160,89,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.3)'; e.currentTarget.style.background = 'none'; }}
                  >
                    <PackageSearch style={{ color: 'var(--gold)', flexShrink: 0 }} size={22} />
                    <div>
                      <div style={{ color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>{t('ai_bundle_title')}</div>
                      <div style={{ color: 'rgba(245,245,245,0.45)', fontSize: '0.75rem' }}>{t('ai_bundle_sub')}</div>
                    </div>
                  </button>
                </div>
              )}

              {mode === 'calculator' && (
                <div>
                  <button onClick={() => { setMode('menu'); setCalcResult(null); }} style={{ color: 'var(--gold)', fontSize: '0.75rem', marginBottom: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                    {t('ai_back')}
                  </button>
                  <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: 'rgba(245,245,245,0.65)', fontSize: '0.75rem', marginBottom: '0.35rem' }}>{t('ai_guests_label')}</label>
                      <input
                        type="number" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} required
                        style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem', color: 'var(--white)', outline: 'none', fontSize: '0.9rem' }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'rgba(245,245,245,0.65)', fontSize: '0.75rem', marginBottom: '0.35rem' }}>{t('ai_cut_label')}</label>
                      <select
                        value={meatType} onChange={(e) => setMeatType(e.target.value)}
                        style={{ width: '100%', background: 'var(--onyx)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem', color: 'var(--white)', outline: 'none', fontSize: '0.9rem' }}
                      >
                        <option value="steak">{t('ai_steak')}</option>
                        <option value="brisket">{t('ai_brisket')}</option>
                        <option value="seafood">{t('ai_seafood')}</option>
                      </select>
                    </div>
                    <button type="submit" className="heading-bebas bg-gold text-onyx" style={{ padding: '0.625rem', fontSize: '1rem', letterSpacing: '0.12em', border: 'none', cursor: 'pointer' }}>
                      {t('ai_calculate')}
                    </button>
                  </form>
                  {calcResult && (
                    <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderLeft: '2px solid var(--gold)', fontSize: '0.875rem', color: 'rgba(245,245,245,0.9)' }}>
                      {calcResult}
                    </div>
                  )}
                </div>
              )}

              {mode === 'bundle' && (
                <div>
                  <button onClick={() => { setMode('menu'); setBundleResult(null); }} style={{ color: 'var(--gold)', fontSize: '0.75rem', marginBottom: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                    {t('ai_back')}
                  </button>
                  <form onSubmit={handleBundle} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: 'rgba(245,245,245,0.65)', fontSize: '0.75rem', marginBottom: '0.35rem' }}>{t('ai_budget_label')}</label>
                      <input
                        type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required
                        style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem', color: 'var(--white)', outline: 'none', fontSize: '0.9rem' }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
                      />
                    </div>
                    <button type="submit" className="heading-bebas bg-gold text-onyx" style={{ padding: '0.625rem', fontSize: '1rem', letterSpacing: '0.12em', border: 'none', cursor: 'pointer' }}>
                      {t('ai_generate')}
                    </button>
                  </form>
                  {bundleResult && (
                    <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderLeft: '2px solid var(--gold)', fontSize: '0.875rem', color: 'rgba(245,245,245,0.9)' }}>
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
        style={{ width: '3.5rem', height: '3.5rem', background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--onyx)', border: '1px solid rgba(26,26,26,0.2)', boxShadow: '0 0 20px rgba(197,160,89,0.3)', cursor: 'pointer', transition: 'transform 0.2s' }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </div>
  );
}
