import { useEffect, useState } from 'react';
import { fetchOrders, updateOrderStatus } from '../../services/orderService';
import { formatDate, formatPrice } from '../../utils';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';

const statuses = ['en attente', 'payée', 'expédiée', 'livrée', 'annulée'];

const statusClass = {
  'en attente': 'badge-yellow',
  payée: 'badge-blue',
  expédiée: 'badge-blue',
  livrée: 'badge-green',
  annulée: 'badge-red',
};

// Commandes
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateOrderStatus(id, status);
      setOrders((current) => current.map((order) => (order._id === id ? { ...order, status: updated.status } : order)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Commandes ({orders.length})</h2>
      </div>

      {loading ? (
        <Loader text="Chargement des commandes..." />
      ) : (
        <div className="table-wrap">
          <Alert type="error">{error}</Alert>

          <table className="data-table">
            <thead>
              <tr>
                <th>Commande</th>
                <th>Client</th>
                <th>Articles</th>
                <th>Total</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-8).toUpperCase()}</td>
                  <td>
                    {order.user?.name || 'Client supprimé'}
                    <br />
                    <span className="cart-item-category">{order.user?.email}</span>
                  </td>
                  <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td>{formatPrice(order.total)} FCFA</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <select
                      className={`badge ${statusClass[order.status]}`}
                      value={order.status}
                      onChange={(event) => handleStatusChange(order._id, event.target.value)}
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminOrders;
