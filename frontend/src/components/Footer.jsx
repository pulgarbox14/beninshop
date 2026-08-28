import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSettings } from '../services/settingService';
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
  { src: '/images/paiement/moov.png', alt: 'Moov Money' },
  { src: '/images/paiement/mtnmomo.jpeg', alt: 'MTN Mobile Money' },
  { src: '/images/paiement/waves.jpeg', alt: 'Wave' },
  { src: '/images/paiement/kkiapay.png', alt: 'KkiaPay' },
  { src: '/images/paiement/fedapay.png', alt: 'FedaPay' },
  { src: '/images/paiement/feexpay.png', alt: 'FeexPay' },
];

// Pied de page
const Footer = () => {
  const [reseaux, setReseaux] = useState({});

  useEffect(() => {
    fetchSettings()
      .then(setReseaux)
      .catch(() => setReseaux({}));
  }, []);

  const socials = [
    { key: 'facebook', label: 'Facebook', icon: <IconFacebook /> },
    { key: 'instagram', label: 'Instagram', icon: <IconInstagram /> },
    { key: 'whatsapp', label: 'WhatsApp', icon: <IconWhatsapp /> },
    { key: 'youtube', label: 'YouTube', icon: <IconYoutube /> },
  ];

  return (
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
            {socials.map((social) => (
              <a
                key={social.key}
                href={reseaux[social.key] || '#'}
                className="social-link"
                aria-label={social.label}
                target={reseaux[social.key] ? '_blank' : undefined}
                rel={reseaux[social.key] ? 'noopener noreferrer' : undefined}
              >
                {social.icon}
              </a>
            ))}
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
              <span className="payment-badge" key={moyen.alt} title={moyen.alt}>
                <img src={moyen.src} alt={moyen.alt} loading="lazy" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} BeninShop. Tous droits réservés.</span>
        <span>
          Conçu par{' '}
          <a
            className="author-link"
            href="https://pascalcarmel.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pascal Carmel GUEZO
          </a>{' '}
          — Développeur Fullstack
        </span>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
