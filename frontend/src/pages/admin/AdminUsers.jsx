import { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/authService';
import { formatDate, getInitials } from '../../utils';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';

/** Liste des utilisateurs inscrits */
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Utilisateurs ({users.length})</h2>
      </div>

      {loading ? (
        <Loader text="Chargement des utilisateurs..." />
      ) : (
        <div className="table-wrap">
          <Alert type="error">{error}</Alert>

          <table className="data-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Role</th>
                <th>Inscrit le</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="user-avatar">{getInitials(user.name)}</span>
                      {user.name}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'badge-blue' : 'badge-gray'}`}>
                      {user.role === 'admin' ? 'Administrateur' : 'Client'}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminUsers;
