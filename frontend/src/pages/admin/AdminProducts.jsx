import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../../services/productService';
import { formatDate, formatPrice } from '../../utils';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import Pagination from '../../components/Pagination';
import ConfirmModal from '../../components/ConfirmModal';
import { IconEdit, IconPlus, IconSearch, IconTrash } from '../../components/Icons';

const PER_PAGE = 8;

// Gestion des produits
const AdminProducts = () => {
  const [data, setData] = useState({ products: [], pages: 1, page: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [toDelete, setToDelete] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get('category') || '';

  const load = () => {
    setLoading(true);

    fetchProducts({ page, limit: PER_PAGE, search, category, sort: 'recent' })
      .then((result) => {
        setData(result);
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search, category]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(term.trim());
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(toDelete._id);
      setMessage(`Le produit "${toDelete.name}" a bien ete supprime.`);
      setToDelete(null);
      load();
    } catch (err) {
      setError(err.message);
      setToDelete(null);
    }
  };

  return (
    <>
      <Alert type="error">{error}</Alert>
      <Alert type="success">{message}</Alert>

      <section className="panel">
        <div className="panel-head">
          <h2>
            {category ? `Produits — ${category}` : 'Produits'} ({data.total})
          </h2>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <form className="search-form" onSubmit={handleSearch} style={{ display: 'block' }}>
              <input
                type="search"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Rechercher un produit..."
              />
              <button type="submit" aria-label="Rechercher">
                <IconSearch />
              </button>
            </form>

            {category && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setPage(1);
                  setSearchParams({});
                }}
              >
                Toutes les catégories
              </button>
            )}

            <Link to="/admin/produits/nouveau" className="btn btn-navy btn-sm">
              Ajouter
              <IconPlus size={16} />
            </Link>
          </div>
        </div>

        {loading ? (
          <Loader text="Chargement des produits..." />
        ) : data.products.length === 0 ? (
          <div className="panel-body">
            <div className="empty-state">
              <h3>Aucun produit</h3>
              <p>
                {category
                  ? `Aucun produit dans la catégorie ${category}.`
                  : 'Ajoutez votre premier produit au catalogue.'}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Nom</th>
                    <th>Catégorie</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <span className="table-thumb">
                          <img
                            src={product.image}
                            alt={product.name}
                            onError={(event) => {
                              event.currentTarget.src = '/images/products/placeholder.svg';
                            }}
                          />
                        </span>
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{formatPrice(product.price)} FCFA</td>
                      <td>
                        <span className={`badge ${product.stock > 0 ? 'badge-green' : 'badge-red'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td>{formatDate(product.createdAt)}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="action-btn edit"
                            onClick={() => navigate(`/admin/produits/${product._id}`)}
                            aria-label={`Modifier ${product.name}`}
                          >
                            <IconEdit />
                          </button>
                          <button
                            type="button"
                            className="action-btn delete"
                            onClick={() => setToDelete(product)}
                            aria-label={`Supprimer ${product.name}`}
                          >
                            <IconTrash size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: '0 24px 22px' }}>
              <Pagination page={data.page} pages={data.pages} onChange={setPage} />
            </div>
          </>
        )}
      </section>

      {toDelete && (
        <ConfirmModal
          title="Supprimer ce produit ?"
          message={`Le produit "${toDelete.name}" sera definitivement supprime du catalogue.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </>
  );
};

export default AdminProducts;
