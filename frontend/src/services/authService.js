import api from './api';

/** Inscription */
export const register = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

/** Connexion : renvoie l'utilisateur et son JWT */
export const login = async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

/** Profil de l'utilisateur connecte */
export const fetchProfile = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

/** Liste des utilisateurs (admin) */
export const fetchUsers = async () => {
  const { data } = await api.get('/auth/users');
  return data;
};
