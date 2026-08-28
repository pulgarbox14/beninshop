import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../services/productService';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { IconTag } from '../../components/Icons';

// Categories du catalogue
const AdminCategories = () => {
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
    <section className="panel">
      <div className="panel-head">
        <h2>Catégories ({categories.length})</h2>
        <Link to="/admin/produits/nouveau" className="btn btn-navy btn-sm">
          Ajouter un produit
        </Link>
      </div>

      <div className="panel-body">
        <Alert type="error">{error}</Alert>

        {loading ? (
          <Loader text="Chargement des catégories..." />
        ) : (
          <div className="category-grid" style={{ paddingBottom: 0 }}>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/admin/produits?category=${encodeURIComponent(category.name)}`}
                className="category-card"
                style={{ backgroundColor: '#fff' }}
              >
                <span className="category-icon">
                  <IconTag size={24} />
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
    </section>
  );
};

export default AdminCategories;
