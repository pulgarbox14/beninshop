/** Formate un prix en francs CFA : 350000 -> "350 000" */
export const formatPrice = (value) =>
  new Intl.NumberFormat('fr-FR').format(Math.round(Number(value) || 0));

/** Formate une date ISO -> "12/05/2024" */
export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString('fr-FR') : '-';

/** Initiales affichees dans l'avatar */
export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
