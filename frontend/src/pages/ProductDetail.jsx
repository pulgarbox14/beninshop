import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../services/productService';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import Rating from '../components/Rating';
import ProductCard from '../components/ProductCard';
import ReviewSection from '../components/ReviewSection';
import { IconCart, IconCheck, IconMinus, IconPlus, IconShield, IconTruck } from '../components/Icons';

// Fiche produit
const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [visuel, setVisuel] = useState(0);
  const [avisOuverts, setAvisOuverts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setAdded(false);
    setQuantity(1);
    setVisuel(0);
    setAvisOuverts(false);

    fetchProductById(id)
      .then((data) => {
        if (!active) return;
        setProduct(data);
        setError('');
        return fetchProducts({ category: data.category, limit: 4 });
      })
      .then((result) => {
        if (active && result) {
          setRelated(result.products.filter((item) => item._id !== id).slice(0, 4));
        }
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [id]);

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
  };

  if (loading) return <Loader text="Chargement du produit..." />;

  if (error || !product) {
    return (
      <div className="container section">
        <Alert type="error">{error || 'Produit introuvable'}</Alert>
        <Link to="/produits" className="btn btn-navy">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const outOfStock = product.stock === 0;
  const visuels = product.images?.length ? product.images : [product.image];

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link to="/">Accueil</Link>
        <span>/</span>
        <Link to="/produits">Produits</Link>
        <span>/</span>
        <Link to={`/produits?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      <section className="product-detail">
        <div>
          <div className="product-gallery">
            <img
              src={visuels[visuel]}
              alt={product.name}
              onError={(event) => {
                event.currentTarget.src = '/images/products/placeholder.svg';
              }}
            />
          </div>

          {visuels.length > 1 && (
            <div className="gallery-thumbs">
              {visuels.map((src, index) => (
                <button
                  type="button"
                  key={src}
                  className={index === visuel ? 'active' : ''}
                  onClick={() => setVisuel(index)}
                  aria-label={`Visuel ${index + 1}`}
                >
                  <img
                    src={src}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.src = '/images/products/placeholder.svg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>

          <button
            type="button"
            className="rating-link"
            onClick={() => {
              setAvisOuverts(true);
              setTimeout(() => document.getElementById('avis')?.scrollIntoView({ behavior: 'smooth' }), 60);
            }}
          >
            {product.numReviews > 0 ? (
              <>
                <Rating value={product.rating} count={product.numReviews} size={17} />
                <span>Voir les avis</span>
              </>
            ) : (
              <span>Aucun avis — donnez le vôtre</span>
            )}
          </button>

          <p className="price">
            {formatPrice(product.price)}
            <small>FCFA</small>
          </p>

          <p className="product-description">{product.description}</p>

          <div className="product-meta">
            <div className="product-meta-row">
              <span>Catégorie</span>
              <Link to={`/produits?category=${encodeURIComponent(product.category)}`}>
                <span className="badge badge-blue">{product.category}</span>
              </Link>
            </div>
            <div className="product-meta-row">
              <span>Stock</span>
              <span className={`badge ${outOfStock ? 'badge-red' : 'badge-green'}`}>
                {outOfStock ? 'Rupture de stock' : `${product.stock} disponibles`}
              </span>
            </div>
            <div className="product-meta-row">
              <span>Référence</span>
              <span>{product._id.slice(-8).toUpperCase()}</span>
            </div>
          </div>

          {added && <Alert type="success">Produit ajouté au panier.</Alert>}

          <div className="buy-row">
            <div className="qty-picker">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                disabled={quantity <= 1}
                aria-label="Diminuer la quantité"
              >
                <IconMinus />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}
                disabled={quantity >= product.stock}
                aria-label="Augmenter la quantité"
              >
                <IconPlus />
              </button>
            </div>

            <button type="button" className="btn btn-primary" onClick={handleAdd} disabled={outOfStock}>
              <IconCart size={18} />
              {outOfStock ? 'Indisponible' : 'Ajouter au panier'}
            </button>

            <Link to="/panier" className="btn btn-outline">
              Voir le panier
            </Link>
          </div>

          <div className="product-reassurance">
            <div>
              <IconTruck size={18} />
              Livraison en 24h - 48h partout au Bénin
            </div>
            <div>
              <IconShield size={18} />
              Paiement sécurisé (Mobile Money, carte bancaire)
            </div>
            <div>
              <IconCheck size={18} />
              Produit garanti et vérifié avant expédition
            </div>
          </div>
        </div>
      </section>

      {avisOuverts ? (
        <ReviewSection
          product={product}
          onChange={(data) => setProduct((current) => ({ ...current, ...data }))}
        />
      ) : (
        <div className="reviews-toggle">
          <button type="button" className="btn btn-outline" onClick={() => setAvisOuverts(true)}>
            Voir les avis {product.numReviews > 0 ? `(${product.numReviews})` : ''}
          </button>
        </div>
      )}

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2 className="section-title">Produits similaires</h2>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
