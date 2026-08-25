import { IconArrowLeft, IconArrowRight } from './Icons';

// Pagination
const Pagination = ({ page, pages, onChange }) => {
  if (!pages || pages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Page précédente">
        <IconArrowLeft size={16} />
      </button>

      {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
        <button
          key={number}
          type="button"
          className={number === page ? 'active' : ''}
          onClick={() => onChange(number)}
        >
          {number}
        </button>
      ))}

      <button type="button" onClick={() => onChange(page + 1)} disabled={page >= pages} aria-label="Page suivante">
        <IconArrowRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
