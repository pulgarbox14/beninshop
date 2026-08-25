// Prix en FCFA
export const formatPrice = (value) =>
  new Intl.NumberFormat('fr-FR').format(Math.round(Number(value) || 0));

// Date au format fr
export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString('fr-FR') : '-';

// Initiales de l'avatar
export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
