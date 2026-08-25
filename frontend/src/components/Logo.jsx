import { Link } from 'react-router-dom';

// Logo de la boutique
const Logo = ({ to = '/', tagline = 'Votre boutique en ligne', light = false, size = 46 }) => (
  <Link to={to} className="brand">
    <img src="/logo.svg" alt="BeninShop" className="brand-logo" width={size} height={size} />
    <span className="brand-text">
      <span className="brand-name" style={light ? { color: '#fff' } : undefined}>
        Benin<span>Shop</span>
      </span>
      {tagline && <span className="brand-tagline">{tagline}</span>}
    </span>
  </Link>
);

export default Logo;
