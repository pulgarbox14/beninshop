import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import Alert from '../components/Alert';

// Choix d'un nouveau mot de passe depuis le lien recu
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: '', confirm: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Les deux mots de passe ne sont pas identiques.');
      return;
    }

    setLoading(true);

    try {
      await resetPassword({ token, password: form.password });
      setMessage('Mot de passe modifié. Vous pouvez maintenant vous connecter.');
      setTimeout(() => navigate('/connexion', { replace: true }), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container" style={{ display: 'grid', placeItems: 'center' }}>
        <div className="auth-card">
          <h1>Nouveau mot de passe</h1>
          <p className="subtitle">Choisissez un mot de passe pour votre compte.</p>

          <Alert type="error">{error}</Alert>
          <Alert type="success">{message}</Alert>

          {!token ? (
            <Alert type="error">Lien invalide : le jeton est absent.</Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Nouveau mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="6 caractères minimum"
                  minLength={6}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirm">
                  Confirmer
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  className="form-control"
                  value={form.confirm}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>

              <button type="submit" className="btn btn-navy btn-block" disabled={loading}>
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </form>
          )}

          <p className="auth-switch">
            <Link to="/connexion">Retour à la connexion</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
