import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight } from './Icons';

const slides = [
  {
    title: 'La qualité à prix',
    highlight: 'imbattables !',
    text: 'Découvrez nos meilleurs produits au ',
    textHighlight: 'meilleur prix.',
    textEnd: 'Livraison rapide et paiement sécurisé.',
    cta: 'Découvrir nos produits',
    to: '/produits',
    image: '/images/imgban.png',
  },
  {
    title: 'Ordinateurs portables',
    highlight: 'pour tous les budgets',
    text: 'Des machines fiables pour le travail et les études, à partir de ',
    textHighlight: '350 000 FCFA.',
    textEnd: 'Garantie et service après-vente inclus.',
    cta: 'Voir les ordinateurs',
    to: '/produits?category=Informatique',
    image: '/images/imgban4.png',
  },
  {
    title: 'Configurations',
    highlight: 'gaming complètes',
    text: 'Écran, tour RGB, clavier mécanique et casque : ',
    textHighlight: 'le setup complet',
    textEnd: 'monté et testé avant livraison.',
    cta: 'Voir les accessoires',
    to: '/produits?category=Accessoires',
    image: '/images/imgban2.png',
  },
  {
    title: 'Équipez votre',
    highlight: 'bureau complet',
    text: 'Unité centrale, écran, clavier et souris livrés en ',
    textHighlight: '24h - 48h',
    textEnd: 'partout au Bénin.',
    cta: 'Voir les catégories',
    to: '/categories',
    image: '/images/imgban3.png',
  },
  {
    title: 'Nouveaux arrivages',
    highlight: 'en boutique',
    text: 'Les derniers modèles sous Windows 11, ',
    textHighlight: 'écrans haute définition',
    textEnd: 'et grande autonomie.',
    cta: 'Voir les nouveautés',
    to: '/produits?sort=recent',
    image: '/images/imgban6.png',
  },
  {
    title: 'PC convertibles',
    highlight: 'et tactiles',
    text: 'Un ordinateur et une tablette en un seul appareil, ',
    textHighlight: 'léger et polyvalent,',
    textEnd: 'idéal pour les étudiants.',
    cta: 'Découvrir nos produits',
    to: '/produits',
    image: '/images/imgban5.png',
  },
];

// Banniere defilante
const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="hero" aria-label="Mises en avant">
      {/* Decoupe courbe de la zone jaune */}
      <svg className="hero-clip" aria-hidden="true">
        <defs>
          <clipPath id="hero-curve" clipPathUnits="objectBoundingBox">
            <path d="M0.24 0 H1 V1 H0 C0.04 0.72 0.11 0.33 0.24 0 Z" />
          </clipPath>
          <clipPath id="hero-curve-mobile" clipPathUnits="objectBoundingBox">
            <path d="M0 0.16 C0.32 0.02 0.7 0.02 1 0.12 V1 H0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="hero-slide" key={index}>
        <div className="hero-content">
          <h1>
            {slide.title}
            <span>{slide.highlight}</span>
          </h1>
          <p>
            {slide.text}
            <em>{slide.textHighlight}</em>
            <br />
            {slide.textEnd}
          </p>
          <Link to={slide.to} className="btn btn-primary">
            {slide.cta}
            <IconArrowRight />
          </Link>
        </div>
        <div className="hero-visual">
          <img src={slide.image} alt="" aria-hidden="true" />
        </div>
      </div>

      <div className="hero-dots">
        {slides.map((item, position) => (
          <button
            key={item.image}
            type="button"
            className={`hero-dot${position === index ? ' active' : ''}`}
            onClick={() => setIndex(position)}
            aria-label={`Aller au slide ${position + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
