import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, TrendingUp, Droplets, MapPin } from 'lucide-react';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="bg-onyx text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero.png" alt="Wagyu Marbling" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            src="/logo.png" 
            alt="Crown & Bull" 
            className="h-32 md:h-48 w-auto gold-filter mb-8"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="heading-bebas text-6xl md:text-8xl tracking-widest text-white mb-4"
          >
            L'EMPIRE DE LA <span className="text-gold">VIANDE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="heading-mont text-lg md:text-2xl tracking-[0.2em] text-white/80 uppercase mb-10 max-w-2xl"
          >
            De la boucherie artisanale à la distribution premium.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link to="/shop" className="group flex items-center gap-4 bg-gold text-onyx heading-bebas px-8 py-4 text-2xl tracking-wider hover:bg-white transition-all">
              <span>EXPLORER LA COLLECTION</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Standard */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="heading-bebas text-5xl md:text-7xl text-gold mb-6 tracking-wider">THE PHANOR STANDARD</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed font-light">
              We do not compromise. Every cut, every delivery, every interaction is engineered for absolute perfection. Built for chefs, demanded by households.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: "Qualité Souveraine", desc: "Sélection rigoureuse des meilleures fermes. Wagyu A5, Prime AAA, traçabilité totale." },
              { icon: Droplets, title: "Chaîne de Froid", desc: "De l'emballage sous vide à la livraison en camion réfrigéré. La fraîcheur verrouillée." },
              { icon: TrendingUp, title: "Excellence B2B", desc: "Des volumes industriels avec une précision chirurgicale. Le choix des restaurateurs." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="border border-gold/20 p-10 hover:border-gold transition-colors bg-white/5"
              >
                <feature.icon className="text-gold w-12 h-12 mb-6" />
                <h3 className="heading-bebas text-3xl mb-4 tracking-wide">{feature.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Break */}
      <section className="h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/storage.png" alt="Cold Storage" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-onyx/40"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2 {...fadeIn} className="heading-bebas text-6xl md:text-8xl tracking-widest text-white/90 drop-shadow-2xl text-center">
            PRECISION<br/><span className="text-gold">AT SCALE</span>
          </motion.h2>
        </div>
      </section>

      {/* Sovereign Circle Referral */}
      <section className="py-24 px-6 bg-gold/5 border-y border-gold/20 relative overflow-hidden">
        <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-4">
                <Star className="text-gold" fill="currentColor" />
                <span className="heading-mont text-gold tracking-[0.2em] uppercase text-sm">Le Cercle Souverain</span>
              </div>
              <h2 className="heading-bebas text-5xl md:text-7xl mb-6">L'ALLÉGEANCE<br/>RÉCOMPENSÉE</h2>
              <p className="text-white/70 max-w-xl text-lg font-light leading-relaxed mb-8">
                Rejoignez le programme de référence le plus exclusif de Montréal. 
                <br/><br/>
                <strong className="text-white font-normal">B2B :</strong> Cumulez des crédits sur vos commandes en gros.<br/>
                <strong className="text-white font-normal">B2C :</strong> Gravissez les échelons Bronze, Argent et Or pour débloquer des coupes secrètes et la livraison prioritaire.
              </p>
              <button className="border border-gold text-gold hover:bg-gold hover:text-onyx heading-bebas px-8 py-3 text-xl tracking-wider transition-colors">
                Devenir Membre
              </button>
            </motion.div>
          </div>
          <div className="flex-1 relative w-full h-[400px]">
            <img src="/logo.png" alt="Crown & Bull" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full object-contain opacity-10 gold-filter" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              {['OR', 'ARGENT', 'BRONZE'].map((tier, i) => (
                <motion.div 
                  key={tier}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="w-full max-w-md bg-onyx border border-white/10 p-6 flex items-center justify-between shadow-2xl"
                >
                  <span className={`heading-bebas text-3xl tracking-widest ${i === 0 ? 'text-gold' : i === 1 ? 'text-gray-300' : 'text-orange-300'}`}>STATUT {tier}</span>
                  <div className="w-12 h-1 bg-white/20"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SMS Drop Signup */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div {...fadeIn}>
            <h2 className="heading-bebas text-5xl md:text-7xl mb-6">LES COUPES <span className="text-red-500">SECRÈTES</span></h2>
            <p className="text-white/60 text-lg mb-12 font-light leading-relaxed">
              Certaines coupes sont trop rares pour le site public. Wagyu A5 importé, Tomahawks dry-aged 45 jours. Inscrivez-vous aux alertes SMS. Premier arrivé, premier servi.
            </p>
            <form className="flex flex-col md:flex-row gap-4 justify-center" onSubmit={e => e.preventDefault()}>
              <input 
                type="tel" 
                placeholder="Votre numéro de téléphone" 
                className="bg-transparent border border-white/20 px-6 py-4 text-white focus:border-gold outline-none w-full md:w-96 text-lg"
              />
              <button type="submit" className="bg-white text-onyx hover:bg-gold hover:text-onyx heading-bebas px-10 py-4 text-2xl tracking-wider transition-colors uppercase">
                Alertez-moi
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}