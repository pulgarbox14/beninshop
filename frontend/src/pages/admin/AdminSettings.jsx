import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils';

/** Informations sur le compte administrateur et la boutique */
const AdminSettings = () => {
  const { user } = useAuth();

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Paramètres</h2>
      </div>

      <div className="panel-body">
        <div className="admin-form">
          <h3 style={{ fontSize: 17, marginBottom: 14 }}>Compte administrateur</h3>

          <div className="form-group">
            <label className="form-label">Nom</label>
            <input className="form-control" value={user?.name || ''} readOnly />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-control" value={user?.email || ''} readOnly />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <input className="form-control" value={user?.role || ''} readOnly />
          </div>

          <h3 style={{ fontSize: 17, margin: '26px 0 14px' }}>Informations boutique</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nom de la boutique</label>
              <input className="form-control" value="BeninShop" readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Devise</label>
              <input className="form-control" value="FCFA (XOF)" readOnly />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <input className="form-control" value="+229 01 23 45 67 89" readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Ville</label>
              <input className="form-control" value="Cotonou, Bénin" readOnly />
            </div>
          </div>

          <p className="form-hint">Session ouverte depuis le {formatDate(new Date().toISOString())}.</p>
        </div>
      </div>
    </section>
  );
};

export default AdminSettings;
