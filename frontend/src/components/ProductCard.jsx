import { Link } from 'react-router-dom';
import { formatPrice } from '../utils';
import Rating from './Rating';

// Carte produit
const ProductCard = ({ product, showRating = false }) => {
  const outOfStock = product.stock === 0;

  const handleImageError = (event) => {
    event.currentTarget.src = '/images/products/placeholder.svg';
  };

  return (
    <article className="product-card">
      <Link to={`/produit/${product._id}`} className="product-thumb">
        <img src={product.image} alt={product.name} onError={handleImageError} loading="lazy" />
        {outOfStock && <span className="product-flag stock-out">Rupture</span>}
      </Link>

      <div className="product-body">
        <h3 className="product-name">
          <Link to={`/produit/${product._id}`}>{product.name}</Link>
        </h3>

        <p className="product-price">
          {formatPrice(product.price)}
          <small>FCFA</small>
        </p>

        {showRating && product.numReviews > 0 && (
          <Rating value={product.rating} count={product.numReviews} />
        )}

        <Link to={`/produit/${product._id}`} className="btn btn-primary btn-block">
          Voir
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
