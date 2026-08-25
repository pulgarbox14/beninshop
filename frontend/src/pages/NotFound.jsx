import { Link } from 'react-router-dom';

// Page 404
const NotFound = () => (
  <div className="container not-found">
    <h1>404</h1>
    <h2>Page introuvable</h2>
    <p>La page que vous recherchez n&apos;existe pas ou a été déplacée.</p>
    <Link to="/" className="btn btn-primary">
      Retour à l&apos;accueil
    </Link>
  </div>
);

export default NotFound;
