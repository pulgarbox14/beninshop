import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchCategories, fetchProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import Pagination from '../components/Pagination';

const PER_PAGE = 8;

// Catalogue
const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ products: [], total: 0, pages: 1, page: 1 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'Toutes';
  const sort = searchParams.get('sort') || 'recent';
  const page = Number(searchParams.get('page')) || 1;

  const params = useMemo(
    () => ({ search, category, sort, page, limit: PER_PAGE }),
    [search, category, sort, page]
  );

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchProducts(params)
      .then((result) => {
        if (active) {
          setData(result);
          setError('');
        }
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [params]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);

    if (value && value !== 'Toutes') {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    if (key !== 'page') next.delete('page');

    setSearchParams(next);
  };

  const totalProducts = categories.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Nos produits</h1>
          <p>
            {search
              ? `Resultats de recherche pour "${search}"`
              : 'Retrouvez tout notre catalogue informatique et accessoires.'}
          </p>
        </div>
      </div>

      <div className="container catalog">
        <aside className="filters">
          <h3>Filtres</h3>

          <div className="filter-block">
            <h4>Catégories</h4>
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                checked={category === 'Toutes'}
                onChange={() => updateParam('category', 'Toutes')}
              />
              Toutes
              <span className="count">{totalProducts}</span>
            </label>

            {categories.map((item) => (
              <label className="filter-option" key={item.name}>
                <input
                  type="radio"
                  name="category"
                  checked={category === item.name}
                  onChange={() => updateParam('category', item.name)}
                />
                {item.name}
                <span className="count">{item.count}</span>
              </label>
            ))}
          </div>

          <div className="filter-block">
            <h4>Trier par</h4>
            <select
              className="form-control"
              value={sort}
              onChange={(event) => updateParam('sort', event.target.value)}
            >
              <option value="recent">Plus récents</option>
              <option value="prix-asc">Prix croissant</option>
              <option value="prix-desc">Prix décroissant</option>
              <option value="nom-asc">Nom (A-Z)</option>
              <option value="nom-desc">Nom (Z-A)</option>
            </select>
          </div>

          {(search || category !== 'Toutes' || sort !== 'recent') && (
            <div className="filter-block">
              <button type="button" className="btn btn-outline btn-block" onClick={() => setSearchParams({})}>
                Reinitialiser les filtres
              </button>
            </div>
          )}
        </aside>

        <section>
          <div className="catalog-toolbar">
            <span className="result-count">
              {data.total} produit{data.total > 1 ? 's' : ''} trouvé{data.total > 1 ? 's' : ''}
            </span>
          </div>

          <Alert type="error">{error}</Alert>

          {loading ? (
            <Loader text="Chargement du catalogue..." />
          ) : data.products.length === 0 ? (
            <div className="empty-state">
              <h3>Aucun produit trouvé</h3>
              <p>Essayez une autre recherche ou changez de catégorie.</p>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {data.products.map((product) => (
                  <ProductCard key={product._id} product={product} showRating />
                ))}
              </div>

              <Pagination
                page={data.page}
                pages={data.pages}
                onChange={(next) => updateParam('page', String(next))}
              />
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Products;
