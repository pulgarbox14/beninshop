import { IconStar } from './Icons';

/** Affiche une note sur 5 sous forme d'etoiles */
const Rating = ({ value = 0, count, size = 15 }) => (
  <div className="rating" aria-label={`Note de ${value} sur 5`}>
    {[1, 2, 3, 4, 5].map((position) => {
      const filled = value >= position;
      const half = !filled && value >= position - 0.5;

      return <IconStar key={position} size={size} filled={filled || half} half={half} />;
    })}
    {count !== undefined && <span className="rating-count">({count})</span>}
  </div>
);

export default Rating;
