import { useEffect, useState } from 'react';
import { IconArrowUp } from './Icons';

/** Bouton flottant de retour en haut de page */
const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 320);

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="scroll-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Revenir en haut de la page"
    >
      <IconArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
