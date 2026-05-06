import { motion } from 'framer-motion';

export default function BookHonors() {
  return (
    <div className="bg-onyx text-white min-h-screen pt-32 pb-24 relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-20 pointer-events-none">
        <img src="/images/book-honors.png" alt="Luxury Catering" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h4 className="text-gold heading-mont tracking-[0.3em] text-sm uppercase mb-4">Service Traiteur Exclusif</h4>
            <h1 className="heading-bebas text-7xl md:text-9xl mb-6 leading-none">BOOK<br/>HONORS</h1>
            <p className="text-white/60 text-lg font-light leading-relaxed">
              Pour les événements qui exigent l'absolu. Notre division traiteur de luxe transforme la viande de qualité supérieure en une expérience culinaire inoubliable. Mariages, galas d'entreprise, soirées privées.
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 bg-white/5 border border-white/10 p-8 backdrop-blur-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Nom Complet</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Compagnie (Optionnel)</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Courriel</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Téléphone</label>
                <input type="tel" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold outline-none transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Type d'Événement</label>
                <select className="w-full bg-onyx border-b border-white/20 py-2 focus:border-gold outline-none transition-colors text-white">
                  <option>Corporatif</option>
                  <option>Mariage</option>
                  <option>Privé</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Invités (approx.)</label>
                <input type="number" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Date Prévue</label>
                <input type="date" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold outline-none transition-colors" />
              </div>
            </div>

            <div className="pt-4">
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Détails de l'expérience souhaitée</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold outline-none transition-colors resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-gold text-onyx heading-bebas py-4 text-2xl tracking-widest mt-8 hover:bg-white transition-colors">
              SOUMETTRE LA REQUÊTE
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}