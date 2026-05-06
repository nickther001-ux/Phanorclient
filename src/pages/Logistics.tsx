import { motion } from 'framer-motion';
import { Truck, ThermometerSnowflake, PackageCheck, Clock, MapPin } from 'lucide-react';

export default function Logistics() {
  return (
    <div className="bg-onyx text-white min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-bebas text-6xl md:text-8xl mb-6"
          >
            LA LOGISTIQUE <span className="text-gold">PHANOR</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          >
            La qualité de la viande ne vaut rien si la chaîne de froid échoue. Notre infrastructure logistique est conçue avec une précision militaire pour garantir la perfection, de nos chambres froides à votre porte.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: ThermometerSnowflake, title: "Froid Absolu", desc: "Contrôle de température en temps réel dans nos entrepôts et nos camions. La chaîne n'est jamais brisée." },
            { icon: PackageCheck, title: "Sous Vide Industriel", desc: "Chaque coupe est scellée sous vide pour préserver l'intégrité, la couleur et le goût pendant le transport." },
            { icon: Truck, title: "Flotte Dédiée", desc: "Camions réfrigérés exclusifs à Phanor Distribution. Pas d'intermédiaires, pas de compromis." },
            { icon: Clock, title: "Juste à Temps", desc: "Routage optimisé pour les restaurants. Livraisons précises pour respecter vos horaires de service." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 hover:border-gold/50 transition-colors"
            >
              <item.icon className="text-gold w-10 h-10 mb-6" />
              <h3 className="heading-bebas text-2xl tracking-wide mb-3">{item.title}</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white/5 border border-gold/20 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="heading-bebas text-5xl mb-6">ZONES DE LIVRAISON<br/>MONTRÉAL</h2>
            <p className="text-white/70 font-light leading-relaxed mb-8">
              Notre réseau couvre la grande région de Montréal en 5 zones distinctes. La livraison B2B est quotidienne pour le centre-ville (Zone 1). La livraison B2C s'effectue sur des fenêtres horaires strictes.
            </p>
            <ul className="space-y-4">
              {[
                { zone: "Zone 1", desc: "Centre-Ville, Vieux-Montréal, Griffintown (Quotidien)" },
                { zone: "Zone 2", desc: "Plateau, Mile-End, Outremont (Mar-Sam)" },
                { zone: "Zone 3", desc: "Ouest de l'Île, NDG, Westmount (Mer-Ven)" },
                { zone: "Zone 4", desc: "Est de Montréal, Anjou (Jeu-Sam)" },
                { zone: "Zone 5", desc: "Laval & Rive-Sud (Sur demande / B2B)" }
              ].map((z, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="heading-bebas text-gold text-xl w-16">{z.zone}</span>
                  <span className="text-white/60 text-sm mt-0.5">{z.desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square border border-white/10 bg-onyx flex items-center justify-center p-8">
              <div className="text-center">
                <MapPin className="text-gold w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="heading-mont text-white/30 tracking-widest uppercase text-sm">Carte Interactive en développement</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}