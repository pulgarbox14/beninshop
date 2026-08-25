import api from './api';

/** Statistiques du tableau de bord (admin) */
export const fetchStats = async () => {
  const { data } = await api.get('/stats');
  return data;
};
