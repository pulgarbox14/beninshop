import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils';
import { IconCart, IconMinus, IconPlus, IconTrash } from '../components/Icons';

/** Panier : liste des produits, quantites et total */
const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(isAuthenticated ? '/commande' : '/connexion', {
      state: isAuthenticated ? undefined : { from: '/commande' },
    });
  };

  if (items.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <IconCart size={44} />
          <h3 style={{ marginTop: 12 }}>Votre panier est vide</h3>
          <p>Parcourez notre catalogue et ajoutez vos produits préférés.</p>
          <Link to="/produits" className="btn btn-primary" style={{ marginTop: 18 }}>
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
          <h1>Mon panier</h1>
          <p>
            {totalItems} article{totalItems > 1 ? 's' : ''} dans votre panier
          </p>
        </div>
      </div>

      <div className="container cart-layout">
        <section>
          <div className="cart-list">
            {items.map((item) => (
              <article className="cart-item" key={item._id}>
                <Link to={`/produit/${item._id}`} className="cart-item-thumb">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(event) => {
                      event.currentTarget.src = '/images/products/placeholder.svg';
                    }}
                  />
                </Link>

                <div className="cart-item-info">
                  <Link to={`/produit/${item._id}`} className="cart-item-name">
                    {item.name}
                  </Link>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-category">{formatPrice(item.price)} FCFA / unité</p>
                </div>

                <div className="cart-item-qty qty-picker">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Diminuer la quantité"
                  >
                    <IconMinus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    aria-label="Augmenter la quantité"
                  >
                    <IconPlus size={16} />
                  </button>
                </div>

                <div className="cart-item-total">{formatPrice(item.price * item.quantity)} FCFA</div>

                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => removeItem(item._id)}
                  aria-label={`Supprimer ${item.name}`}
                >
                  <IconTrash />
                </button>
              </article>
            ))}
          </div>

          <div className="cart-actions">
            <Link to="/produits" className="btn btn-outline">
              Continuer mes achats
            </Link>
            <button type="button" className="btn btn-danger" onClick={clearCart}>
              <IconTrash size={16} />
              Vider le panier
            </button>
          </div>
        </section>

        <aside className="summary">
          <h3>Récapitulatif</h3>

          <div className="summary-row">
            <span>Sous-total</span>
            <span>{formatPrice(totalPrice)} FCFA</span>
          </div>
          <div className="summary-row">
            <span>Articles</span>
            <span>{totalItems}</span>
          </div>
          <div className="summary-row">
            <span>Livraison</span>
            <span>Offerte à Cotonou</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>{formatPrice(totalPrice)} FCFA</span>
          </div>

          <button type="button" className="btn btn-primary btn-block" onClick={handleCheckout}>
            Passer la commande
          </button>

          {!isAuthenticated && (
            <p className="form-hint text-center" style={{ marginTop: 12 }}>
              Connexion requise pour finaliser la commande.
            </p>
          )}
        </aside>
      </div>
    </>
  );
};

export default Cart;
