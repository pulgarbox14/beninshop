import { Link } from 'react-router-dom';
import Logo from './Logo';
import {
  IconClock,
  IconFacebook,
  IconInstagram,
  IconMail,
  IconMapPin,
  IconPhone,
  IconWhatsapp,
  IconYoutube,
} from './Icons';

const navigation = [
  { to: '/', label: 'Accueil' },
  { to: '/produits', label: 'Produits' },
  { to: '/categories', label: 'Catégories' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

const informations = [
  { to: '/a-propos', label: 'Qui sommes-nous ?' },
  { to: '/conditions', label: 'Conditions générales' },
  { to: '/confidentialite', label: 'Politique de confidentialité' },
  { to: '/livraison', label: 'Livraison & Retours' },
  { to: '/faq', label: 'FAQ' },
];

const paiements = [
  { src: '/images/paiement/visa.svg', alt: 'Visa' },
  { src: '/images/paiement/mastercard.svg', alt: 'Mastercard' },
  { src: '/images/paiement/moov-money.svg', alt: 'Moov Money' },
  { src: '/images/paiement/wave.svg', alt: 'Wave' },
  { src: '/images/paiement/mtn-momo.svg', alt: 'MTN Mobile Money' },
];

/** Pied de page de la boutique */
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-about">
          <Logo tagline={null} light />
          <p>
            Votre boutique en ligne au Bénin.
            <br />
            La qualité à prix imbattables !
          </p>
          <div className="socials">
            <a href="#" className="social-link" aria-label="Facebook">
              <IconFacebook />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href="#" className="social-link" aria-label="WhatsApp">
              <IconWhatsapp />
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <IconYoutube />
            </a>
          </div>
        </div>

        <div>
          <h4>Navigation</h4>
          <ul className="footer-links">
            {navigation.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Informations</h4>
          <ul className="footer-links">
            {informations.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Besoin d&apos;aide ?</h4>
          <ul className="footer-contact">
            <li>
              <IconPhone />
              <span>+229 01 23 45 67 89</span>
            </li>
            <li>
              <IconMail />
              <span>contact@beninshop.bj</span>
            </li>
            <li>
              <IconMapPin />
              <span>Cotonou, Bénin</span>
            </li>
            <li>
              <IconClock />
              <span>Lun - Sam : 8h - 18h</span>
            </li>
          </ul>
        </div>

        <div>
          <h4>Moyens de paiement</h4>
          <div className="payments">
            {paiements.map((moyen) => (
              <img key={moyen.alt} src={moyen.src} alt={moyen.alt} />
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} BeninShop. Tous droits réservés.</span>
        <span>
          Conçu avec <span className="heart">&hearts;</span> au Bénin
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
