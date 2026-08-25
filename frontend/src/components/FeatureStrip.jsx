import { IconBadge, IconHeadset, IconShield, IconTruck } from './Icons';

const features = [
  {
    icon: <IconTruck size={22} />,
    title: 'Livraison rapide',
    text: 'Partout au Bénin en 24h - 48h',
  },
  {
    icon: <IconShield />,
    title: 'Paiement sécurisé',
    text: 'Vos paiements sont 100% sécurisés',
  },
  {
    icon: <IconHeadset />,
    title: 'Support client',
    text: 'Disponible 7j/7 pour vous aider',
  },
  {
    icon: <IconBadge />,
    title: 'Produits de qualité',
    text: 'Nous sélectionnons le meilleur',
  },
];

// Bandeau des services
const FeatureStrip = () => (
  <div className="features">
    {features.map((feature) => (
      <div className="feature" key={feature.title}>
        <span className="feature-icon">{feature.icon}</span>
        <div>
          <h4>{feature.title}</h4>
          <p>{feature.text}</p>
        </div>
      </div>
    ))}
  </div>
);

export default FeatureStrip;
