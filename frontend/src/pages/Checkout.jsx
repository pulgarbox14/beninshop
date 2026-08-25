import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import { formatPrice } from '../utils';
import Alert from '../components/Alert';

// Validation de la commande
const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: '',
    city: 'Cotonou',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createOrder({
        items: items.map((item) => ({ product: item._id, quantity: item.quantity })),
        shippingAddress: form,
      });
      clearCart();
      navigate('/mes-commandes', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <h3>Aucun article à commander</h3>
          <Link to="/produits" className="btn btn-primary" style={{ marginTop: 16 }}>
            Voir les produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Finaliser la commande</h1>
          <p>Renseignez vos informations de livraison</p>
        </div>
      </div>

      <div className="container cart-layout">
        <section className="contact-card">
          <Alert type="error">{error}</Alert>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Nom complet
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  className="form-control"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Telephone
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+229 01 23 45 67 89"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="city">
                Ville
              </label>
              <input
                id="city"
                name="city"
                className="form-control"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">
                Adresse de livraison
              </label>
              <textarea
                id="address"
                name="address"
                className="form-control"
                value={form.address}
                onChange={handleChange}
                placeholder="Quartier, rue, point de repère..."
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Enregistrement...' : 'Confirmer la commande'}
            </button>
          </form>
        </section>

        <aside className="summary">
          <h3>Votre commande</h3>

          {items.map((item) => (
            <div className="summary-row" key={item._id}>
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)} FCFA</span>
            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>
            <span>{formatPrice(totalPrice)} FCFA</span>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Checkout;
