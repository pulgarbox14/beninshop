import api from './api';

// Statistiques (admin)
export const fetchStats = async () => {
  const { data } = await api.get('/stats');
  return data;
};
