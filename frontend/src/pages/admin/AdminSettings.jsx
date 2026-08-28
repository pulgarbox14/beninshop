import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchSettings, updateSettings } from '../../services/settingService';
import Alert from '../../components/Alert';

const RESEAUX = [
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/votrepage' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/votrecompte' },
  { key: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/22901234567' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@votrechaine' },
];

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

  const [liens, setLiens] = useState({ facebook: '', instagram: '', whatsapp: '', youtube: '' });
  const [liensError, setLiensError] = useState('');
  const [liensMessage, setLiensMessage] = useState('');
  const [savingLiens, setSavingLiens] = useState(false);

  useEffect(() => {
    fetchSettings()
      .then((data) => setLiens({ ...liens, ...data }))
      .catch((err) => setLiensError(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLienChange = (event) =>
    setLiens((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleLiensSubmit = async (event) => {
    event.preventDefault();
    setLiensError('');
    setLiensMessage('');
    setSavingLiens(true);

    try {
      const data = await updateSettings(liens);
      setLiens(data);
      setLiensMessage('Les liens des réseaux sociaux ont été enregistrés.');
    } catch (err) {
      setLiensError(err.message);
    } finally {
      setSavingLiens(false);
    }
  };

  return (
    <>
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

    <section className="panel" style={{ marginTop: 22 }}>
      <div className="panel-head">
        <h2>Réseaux sociaux</h2>
      </div>

      <div className="panel-body">
        <Alert type="error">{liensError}</Alert>
        <Alert type="success">{liensMessage}</Alert>

        <p className="form-hint" style={{ marginBottom: 18 }}>
          Ces liens sont utilisés par les icônes du pied de page. Laissez un champ vide pour
          désactiver le lien correspondant.
        </p>

        <form className="admin-form" onSubmit={handleLiensSubmit}>
          <div className="form-row">
            {RESEAUX.map((reseau) => (
              <div className="form-group" key={reseau.key}>
                <label className="form-label" htmlFor={reseau.key}>
                  {reseau.label}
                </label>
                <input
                  id={reseau.key}
                  name={reseau.key}
                  type="url"
                  className="form-control"
                  value={liens[reseau.key] || ''}
                  onChange={handleLienChange}
                  placeholder={reseau.placeholder}
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" disabled={savingLiens}>
            {savingLiens ? 'Enregistrement...' : 'Enregistrer les liens'}
          </button>
        </form>
      </div>
    </section>
    </>
  );
};

export default AdminSettings;
