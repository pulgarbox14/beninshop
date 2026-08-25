import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMyOrders } from '../services/orderService';
import { formatDate, formatPrice } from '../utils';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const statusClass = {
  'en attente': 'badge-yellow',
  payée: 'badge-blue',
  expédiée: 'badge-blue',
  livrée: 'badge-green',
  annulée: 'badge-red',
};

/** Historique des commandes du client connecte */
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Mes commandes</h1>
          <p>Suivez l&apos;état de vos commandes</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 40 }}>
        <Alert type="error">{error}</Alert>

        {loading ? (
          <Loader text="Chargement de vos commandes..." />
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <h3>Aucune commande pour le moment</h3>
            <Link to="/produits" className="btn btn-primary" style={{ marginTop: 16 }}>
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <article className="order-card" key={order._id}>
              <header>
                <div>
                  <strong>Commande n&deg; {order._id.slice(-8).toUpperCase()}</strong>
                  <p className="cart-item-category">Passee le {formatDate(order.createdAt)}</p>
                </div>
                <span className={`badge ${statusClass[order.status] || 'badge-gray'}`}>{order.status}</span>
              </header>

              {order.items.map((item) => (
                <div className="order-line" key={`${order._id}-${item.product}`}>
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)} FCFA</span>
                </div>
              ))}

              <div className="summary-total" style={{ fontSize: 17 }}>
                <span>Total</span>
                <span>{formatPrice(order.total)} FCFA</span>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
};

export default MyOrders;
