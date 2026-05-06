import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-onyx text-white min-h-screen">
      
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 border-b border-white/10">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h4 className="text-gold heading-mont tracking-[0.3em] text-sm uppercase mb-6">L'Histoire</h4>
            <h1 className="heading-bebas text-6xl md:text-9xl mb-8 leading-none">
              DE BOUCHER À<br/>L'EMPIRE
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            
            <div className="flex-1 order-2 md:order-1">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="prose prose-invert prose-lg max-w-none"
              >
                <p className="text-2xl font-light text-white/90 leading-relaxed mb-10">
                  Fondée par Widler Junior Phanor, Phanor Distribution Inc. n'est pas née dans une salle de conférence, mais derrière le comptoir d'une boucherie de quartier. 
                </p>
                
                <p className="text-white/60 font-light leading-relaxed mb-8">
                  Il y a 8 ans, Widler a commencé avec un seul objectif : maîtriser l'art de la coupe. De la compréhension des muscles, du persillage et du vieillissement à sec, il a forgé une expertise que peu possèdent. Mais le comptoir de boucherie était trop petit pour sa vision. Il a vu comment l'industrie fonctionnait — les intermédiaires, les marges, la perte de qualité en transit — et a décidé de tout rebâtir.
                </p>

                <p className="text-white/60 font-light leading-relaxed mb-8">
                  Phanor Distribution a été créée pour combler le vide entre la ferme et la table des chefs. En éliminant les compromis, Widler a construit un réseau logistique intégré verticalement. Aujourd'hui, l'entreprise approvisionne les restaurants les plus exigeants de Montréal, les marchés premium et les foyers qui refusent la médiocrité.
                </p>

                <blockquote className="border-l-2 border-gold pl-8 my-16">
                  <p className="heading-bebas text-4xl text-white tracking-wide leading-tight mb-4">
                    "NOUS NE VENDONS PAS DE LA VIANDE. NOUS VENDONS DE LA PRÉCISION, DE LA FIABILITÉ ET DU RESPECT POUR LE PRODUIT."
                  </p>
                  <footer className="text-gold heading-mont text-sm uppercase tracking-widest">— Widler Junior Phanor</footer>
                </blockquote>

                <p className="text-white/60 font-light leading-relaxed">
                  De la division Book Honors qui élève le service traiteur à un niveau Michelin, jusqu'aux Sélect Bundles qui apportent la qualité restaurant aux familles, l'empire de Widler continue de s'étendre. La couronne et le taureau de notre logo ne sont pas qu'un symbole ; c'est un sceau de souveraineté sur l'industrie.
                </p>
              </motion.div>
            </div>

            <div className="flex-1 order-1 md:order-2">
              <div className="sticky top-32">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-[3/4] border border-white/10 p-4"
                >
                  <div className="absolute inset-4 bg-white/5 border border-gold/20 flex flex-col items-center justify-center p-12 text-center">
                    <img src="/logo.png" alt="Logo" className="w-24 h-auto gold-filter mb-8 opacity-50" />
                    <h3 className="heading-bebas text-3xl mb-4 text-white">8 ANNÉES<br/>D'EXCELLENCE</h3>
                    <p className="text-white/40 text-sm font-light">Une fondation bâtie sur la maîtrise absolue du produit.</p>
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