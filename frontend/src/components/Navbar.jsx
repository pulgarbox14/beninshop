import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getInitials } from '../utils';
import Logo from './Logo';
import {
  IconCart,
  IconChevronDown,
  IconDashboard,
  IconLogout,
  IconMenu,
  IconClose,
  IconSearch,
  IconBox,
} from './Icons';

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/produits', label: 'Produits' },
  { to: '/categories', label: 'Catégories' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

/** Barre de navigation principale de la boutique */
const Navbar = () => {
  const [term, setTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();

  // Fermeture du menu utilisateur au clic exterieur
  useEffect(() => {
    const handleClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(term.trim() ? `/produits?search=${encodeURIComponent(term.trim())}` : '/produits');
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <button
            type="button"
            className="burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Ouvrir le menu"
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>

          <Logo />

          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <form className="search-form" onSubmit={handleSearch} role="search">
              <input
                type="search"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Rechercher un produit..."
                aria-label="Rechercher un produit"
              />
              <button type="submit" aria-label="Lancer la recherche">
                <IconSearch />
              </button>
            </form>

            <Link to="/panier" className="cart-button" aria-label="Voir le panier">
              <IconCart />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>

            {isAuthenticated ? (
              <div className="user-menu" ref={userMenuRef}>
                <button
                  type="button"
                  className="user-menu-trigger"
                  onClick={() => setUserMenuOpen((open) => !open)}
                >
                  <span className="user-avatar">{getInitials(user.name)}</span>
                  <span className="user-menu-label">{user.name.split(' ')[0]}</span>
                  <IconChevronDown />
                </button>

                {userMenuOpen && (
                  <div className="dropdown">
                    <div className="dropdown-header">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="dropdown-item"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <IconDashboard size={17} />
                        Tableau de bord
                      </Link>
                    )}

                    <Link
                      to="/mes-commandes"
                      className="dropdown-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <IconBox size={17} />
                      Mes commandes
                    </Link>

                    <button type="button" className="dropdown-item danger" onClick={handleLogout}>
                      <IconLogout size={17} />
                      Deconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/connexion" className="btn btn-navy">
                Se connecter
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
