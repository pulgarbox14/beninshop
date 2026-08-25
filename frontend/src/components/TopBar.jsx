import { IconMapPin, IconPhone, IconTruck } from './Icons';

// Bandeau du haut
const TopBar = () => (
  <div className="topbar">
    <div className="container topbar-inner">
      <div className="topbar-left">
        <span className="topbar-item">
          <IconMapPin />
          Cotonou, Bénin
        </span>
        <span className="topbar-item">
          <IconPhone />
          +229 01 23 45 67 89
        </span>
      </div>
      <div className="topbar-right topbar-item">
        <IconTruck />
        Livraison rapide partout au Bénin
      </div>
    </div>
  </div>
);

export default TopBar;
