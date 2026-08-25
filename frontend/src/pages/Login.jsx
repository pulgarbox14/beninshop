import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';

// Connexion
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(form);
      const target = location.state?.from || (user.role === 'admin' ? '/admin' : '/');
      navigate(target, { replace: true });
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
          <h1>Connexion</h1>
          <p className="subtitle">Accédez à votre compte BeninShop</p>

          <Alert type="error">{error}</Alert>

          <form onSubmit={handleSubmit}>
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
                placeholder="******"
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="btn btn-navy btn-block" disabled={loading}>
              {loading ? 'Connexion en cours...' : 'Connexion'}
            </button>
          </form>

          <p className="auth-switch">
            Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
          </p>

          <div className="demo-box">
            <strong>Comptes de démonstration</strong>
            <br />
            Admin : admin@beninshop.bj / admin123
            <br />
            Client : client@beninshop.bj / client123
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
