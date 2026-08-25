import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Alert from '../../components/Alert';

// Parametres : l'admin modifie ses informations
const AdminSettings = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (form.password && form.password !== form.confirm) {
      setError('Les deux mots de passe ne sont pas identiques.');
      return;
    }

    if (form.password && !form.currentPassword) {
      setError('Saisissez votre mot de passe actuel pour le modifier.');
      return;
    }

    setSaving(true);

    try {
      await updateProfile({
        name: form.name,
        email: form.email,
        currentPassword: form.currentPassword || undefined,
        password: form.password || undefined,
      });
      setForm((current) => ({ ...current, currentPassword: '', password: '', confirm: '' }));
      setMessage('Vos informations ont été mises à jour.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Mes informations</h2>
      </div>

      <div className="panel-body">
        <Alert type="error">{error}</Alert>
        <Alert type="success">{message}</Alert>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
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
                required
              />
            </div>
          </div>

          <h3 style={{ fontSize: 17, margin: '26px 0 6px' }}>Changer le mot de passe</h3>
          <p className="form-hint" style={{ marginBottom: 16 }}>
            Laissez ces champs vides pour conserver votre mot de passe actuel.
          </p>

          <div className="form-group">
            <label className="form-label" htmlFor="currentPassword">
              Mot de passe actuel
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              className="form-control"
              value={form.currentPassword}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <div className="form-row">
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
                minLength={6}
                autoComplete="new-password"
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
                autoComplete="new-password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminSettings;
