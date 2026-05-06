import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-onyx border-t border-gold/20 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 flex flex-col items-start">
            <img src="/logo.png" alt="Phanor Logo" className="h-16 w-auto gold-filter mb-6" />
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
              L'empire de la viande et des fruits de mer premium. Une qualité irréprochable, de la boucherie à votre table.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gold hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gold hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gold hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="heading-bebas text-2xl text-gold mb-6 tracking-wider">Navigation</h4>
            <ul className="space-y-3 flex flex-col">
              <Link to="/" className="text-white/70 hover:text-gold transition-colors text-sm heading-mont tracking-wide">Accueil</Link>
              <Link to="/shop" className="text-white/70 hover:text-gold transition-colors text-sm heading-mont tracking-wide">La Boutique</Link>
              <Link to="/book-honors" className="text-white/70 hover:text-gold transition-colors text-sm heading-mont tracking-wide">Book Honors</Link>
              <Link to="/logistics" className="text-white/70 hover:text-gold transition-colors text-sm heading-mont tracking-wide">Logistique</Link>
              <Link to="/about" className="text-white/70 hover:text-gold transition-colors text-sm heading-mont tracking-wide">À Propos</Link>
            </ul>
          </div>

          <div>
            <h4 className="heading-bebas text-2xl text-gold mb-6 tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                <span>Montréal, QC<br/>Zone de livraison 1-5</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone size={18} className="text-gold shrink-0" />
                <span>438-373-7253</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail size={18} className="text-gold shrink-0" />
                <span>feedme.meat01@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="heading-bebas text-2xl text-gold mb-6 tracking-wider">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4 font-light">Inscrivez-vous pour des offres exclusives et des arrivages rares.</p>
            <form className="flex border border-gold/30 focus-within:border-gold transition-colors" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Votre courriel" 
                className="bg-transparent text-white px-4 py-2 w-full focus:outline-none text-sm"
              />
              <button type="submit" className="bg-gold text-onyx heading-bebas px-4 py-2 tracking-wider hover:bg-white transition-colors">
                Rejoindre
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs font-light">
            &copy; {new Date().getFullYear()} Phanor Distribution Inc. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-white/40 text-xs font-light">
            <a href="#" className="hover:text-gold transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-gold transition-colors">Conditions générales</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
