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
    image: '/images/hero-tech.svg',
  },
  {
    title: 'Livraison rapide',
    highlight: 'partout au Bénin',
    text: 'Vos commandes livrées en ',
    textHighlight: '24h - 48h',
    textEnd: 'à Cotonou et dans tout le pays.',
    cta: 'Commander maintenant',
    to: '/produits',
    image: '/images/hero-livraison.svg',
  },
  {
    title: 'Informatique et',
    highlight: 'accessoires',
    text: 'Ordinateurs, écrans, claviers, casques : ',
    textHighlight: 'tout l’équipement',
    textEnd: 'dont vous avez besoin.',
    cta: 'Voir les catégories',
    to: '/categories',
    image: '/images/hero-promo.svg',
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
