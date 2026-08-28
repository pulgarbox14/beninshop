import api from './api';

// Reglages de la boutique
export const fetchSettings = async () => {
  const { data } = await api.get('/settings');
  return data;
};

// Mise a jour (admin)
export const updateSettings = async (payload) => {
  const { data } = await api.put('/settings', payload);
  return data;
};
