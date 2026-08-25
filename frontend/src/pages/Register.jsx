import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';

/** Page d'inscription */
const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

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
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/', { replace: true });
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
          <h1>Créer un compte</h1>
          <p className="subtitle">Rejoignez BeninShop en quelques secondes</p>

          <Alert type="error">{error}</Alert>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Nom
              </label>
              <input
                id="name"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                placeholder="Votre nom complet"
                minLength={2}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Mot de passe
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
                Confirmer le mot de passe
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
              {loading ? 'Création du compte...' : 'Créer un compte'}
            </button>
          </form>

          <p className="auth-switch">
            Déjà inscrit ? <Link to="/connexion">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
