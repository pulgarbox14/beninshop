import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../../services/productService';
import { fetchStats } from '../../services/statsService';
import { formatDate, formatPrice } from '../../utils';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import Pagination from '../../components/Pagination';
import ConfirmModal from '../../components/ConfirmModal';
import {
  IconBox,
  IconCart,
  IconEdit,
  IconMoney,
  IconPlus,
  IconTrash,
  IconUsers,
} from '../../components/Icons';

const PER_PAGE = 8;

/** Tableau de bord : statistiques et liste des produits */
const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [data, setData] = useState({ products: [], pages: 1, page: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [toDelete, setToDelete] = useState(null);
  const navigate = useNavigate();

  const load = async (currentPage = page) => {
    setLoading(true);

    try {
      const [statsData, productsData] = await Promise.all([
        fetchStats(),
        fetchProducts({ page: currentPage, limit: PER_PAGE, sort: 'recent' }),
      ]);
      setStats(statsData);
      setData(productsData);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleDelete = async () => {
    try {
      await deleteProduct(toDelete._id);
      setMessage(`Le produit "${toDelete.name}" a bien ete supprime.`);
      setToDelete(null);
      load(page);
    } catch (err) {
      setError(err.message);
      setToDelete(null);
    }
  };

  const cards = [
    {
      label: 'Nombre de produits',
      value: stats.products,
      hint: 'Produits dans le catalogue',
      icon: <IconBox />,
      color: 'blue',
    },
    {
      label: 'Commandes',
      value: stats.orders,
      hint: 'Commandes totales',
      icon: <IconCart size={26} />,
      color: 'green',
    },
    {
      label: 'Utilisateurs',
      value: stats.users,
      hint: 'Utilisateurs inscrits',
      icon: <IconUsers />,
      color: 'yellow',
    },
    {
      label: "Chiffre d'affaires",
      value: `${formatPrice(stats.revenue)} FCFA`,
      hint: 'Total des ventes',
      icon: <IconMoney />,
      color: 'purple',
      compact: true,
    },
  ];

  return (
    <>
      <Alert type="error">{error}</Alert>
      <Alert type="success">{message}</Alert>

      <div className="stat-grid">
        {cards.map((card) => (
          <article className="stat-card" key={card.label}>
            <span className={`stat-icon ${card.color}`}>{card.icon}</span>
            <div>
              <p className="stat-label">{card.label}</p>
              <p className={`stat-value ${card.color === 'yellow' ? '' : card.color}${card.compact ? ' compact' : ''}`}>
                {card.value}
              </p>
              <p className="stat-hint">{card.hint}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Liste des produits</h2>
          <Link to="/admin/produits/nouveau" className="btn btn-navy btn-sm">
            Ajouter un produit
            <IconPlus size={16} />
          </Link>
        </div>

        {loading ? (
          <Loader text="Chargement du tableau de bord..." />
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

export default Dashboard;
