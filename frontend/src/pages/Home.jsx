import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/productService';
import HeroCarousel from '../components/HeroCarousel';
import ProductCard from '../components/ProductCard';
import FeatureStrip from '../components/FeatureStrip';
import Newsletter from '../components/Newsletter';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { IconArrowRight } from '../components/Icons';

// Page d'accueil
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts({ limit: 8, sort: 'recent' });
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <>
      <div className="container">
        <HeroCarousel />
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Nos produits</h2>
            <Link to="/produits" className="link-more">
              Voir tous les produits
              <IconArrowRight />
            </Link>
          </div>

          <Alert type="error">{error}</Alert>

          {loading ? (
            <Loader text="Chargement des produits..." />
          ) : (
            <div className="product-grid grid-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <FeatureStrip />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Produits populaires</h2>
            <Link to="/produits?sort=prix-desc" className="link-more">
              Voir tous les produits
              <IconArrowRight />
            </Link>
          </div>

          {!loading && (
            <div className="product-grid grid-8">
              {products.map((product) => (
                <ProductCard key={`pop-${product._id}`} product={product} showRating />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Newsletter />
        </div>
      </section>
    </>
  );
};

export default Home;
