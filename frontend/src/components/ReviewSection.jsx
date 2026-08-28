import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addReview, deleteReview } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { formatDate, getInitials } from '../utils';
import Rating from './Rating';
import Alert from './Alert';
import { IconStar, IconTrash } from './Icons';

// Avis d'un produit : liste et depot d'un nouvel avis
const ReviewSection = ({ product, onChange }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [form, setForm] = useState({ rating: 0, comment: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const avis = product.reviews || [];
  const dejaNote = avis.some((a) => a.user === user?._id || a.user?._id === user?._id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!form.rating) {
      setError('Choisissez une note de 1 à 5 étoiles.');
      return;
    }

    setSaving(true);

    try {
      const data = await addReview(product._id, form);
      onChange(data);
      setForm({ rating: 0, comment: '' });
      setMessage('Merci, votre avis a été publié.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const supprimer = async (reviewId) => {
    try {
      onChange(await deleteReview(product._id, reviewId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="reviews" id="avis">
      <h2 className="section-title">Avis des clients</h2>

      {avis.length > 0 ? (
        <div className="reviews-summary">
          <strong>{product.rating.toFixed(1)}</strong>
          <div>
            <Rating value={product.rating} size={17} />
            <span>
              {avis.length} avis publié{avis.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      ) : (
        <p className="form-hint">Aucun avis pour le moment. Soyez le premier à en laisser un.</p>
      )}

      <div className="reviews-list">
        {avis.map((a) => (
          <article className="review" key={a._id}>
            <span className="user-avatar">{getInitials(a.name)}</span>
            <div>
              <div className="review-head">
                <strong>{a.name}</strong>
                <Rating value={a.rating} size={13} />
                <span className="review-date">{formatDate(a.createdAt)}</span>
                {isAdmin && (
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => supprimer(a._id)}
                    aria-label="Supprimer cet avis"
                  >
                    <IconTrash size={15} />
                  </button>
                )}
              </div>
              <p>{a.comment}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="review-form">
        <h3>Donner mon avis</h3>

        <Alert type="error">{error}</Alert>
        <Alert type="success">{message}</Alert>

        {!isAuthenticated ? (
          <p className="form-hint">
            <Link to="/connexion">Connectez-vous</Link> pour laisser un avis.
          </p>
        ) : dejaNote ? (
          <p className="form-hint">Vous avez déjà donné votre avis sur ce produit.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <span className="form-label">Votre note</span>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((note) => (
                  <button
                    type="button"
                    key={note}
                    onClick={() => setForm((c) => ({ ...c, rating: note }))}
                    className={note <= form.rating ? 'active' : ''}
                    aria-label={`${note} étoile${note > 1 ? 's' : ''}`}
                  >
                    <IconStar size={26} filled={note <= form.rating} />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="comment">
                Votre commentaire
              </label>
              <textarea
                id="comment"
                className="form-control"
                value={form.comment}
                onChange={(event) => setForm((c) => ({ ...c, comment: event.target.value }))}
                placeholder="Qu'avez-vous pensé de ce produit ?"
                minLength={5}
                maxLength={600}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Envoi...' : 'Publier mon avis'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
