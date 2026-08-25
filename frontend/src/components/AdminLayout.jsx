import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  IconBox,
  IconCart,
  IconDashboard,
  IconLogout,
  IconMenu,
  IconPlus,
  IconSettings,
  IconTag,
  IconUser,
  IconUsers,
} from './Icons';

const menu = [
  { to: '/admin', label: 'Tableau de bord', icon: <IconDashboard />, end: true },
  { to: '/admin/produits', label: 'Produits', icon: <IconBox size={19} /> },
  { to: '/admin/produits/nouveau', label: 'Ajouter un produit', icon: <IconPlus size={19} /> },
  { to: '/admin/categories', label: 'Catégories', icon: <IconTag /> },
  { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: <IconUsers size={19} /> },
  { to: '/admin/commandes', label: 'Commandes', icon: <IconCart size={19} /> },
  { to: '/admin/parametres', label: 'Paramètres', icon: <IconSettings /> },
];

const titles = {
  '/admin': 'Tableau de bord',
  '/admin/produits': 'Produits',
  '/admin/produits/nouveau': 'Ajouter un produit',
  '/admin/categories': 'Catégories',
  '/admin/utilisateurs': 'Utilisateurs',
  '/admin/commandes': 'Commandes',
  '/admin/parametres': 'Paramètres',
};

// Gabarit du tableau de bord
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const title = titles[pathname] || (pathname.includes('/produits/') ? 'Modifier un produit' : 'Administration');

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="admin-brand">
          <img src="/logo.svg" alt="" width="40" height="40" />
          <span className="brand-text">
            <span className="brand-name">
              Benin<span style={{ color: 'var(--yellow)' }}>Shop</span>
            </span>
            <small>Administration</small>
          </span>
        </div>

        <nav className="admin-nav">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}

          <button type="button" className="admin-nav-link logout" onClick={handleLogout}>
            <IconLogout />
            Déconnexion
          </button>
        </nav>
      </aside>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="burger"
            style={{ display: 'grid' }}
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Afficher le menu"
          >
            <IconMenu />
          </button>

          <h1>{title}</h1>

          <div className="admin-user">
            <span className="user-avatar">
              <IconUser />
            </span>
            {user?.name?.split(' ')[0] || 'Admin'}
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
