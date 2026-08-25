import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../services/productService';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { IconTag } from '../components/Icons';

/** Liste des categories issues de l'API */
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Nos catégories</h1>
          <p>Parcourez notre catalogue par catégorie</p>
        </div>
      </div>

      <div className="container">
        <Alert type="error">{error}</Alert>

        {loading ? (
          <Loader text="Chargement des catégories..." />
        ) : (
          <div className="category-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/produits?category=${encodeURIComponent(category.name)}`}
                className="category-card"
              >
                <span className="category-icon">
                  <IconTag size={26} />
                </span>
                <div>
                  <h3>{category.name}</h3>
                  <p>
                    {category.count} produit{category.count > 1 ? 's' : ''}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
