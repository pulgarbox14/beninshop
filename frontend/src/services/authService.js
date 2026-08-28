import api from './api';

// Inscription
export const register = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

// Connexion
export const login = async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

// Profil
export const fetchProfile = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

// Mise a jour du profil
export const updateProfile = async (payload) => {
  const { data } = await api.put('/auth/me', payload);
  return data;
};

// Demande de reinitialisation
export const forgotPassword = async (email) => {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
};

// Nouveau mot de passe depuis le lien recu par email
export const resetPassword = async (payload) => {
  const { data } = await api.post('/auth/reset-password', payload);
  return data;
};

// Utilisateurs (admin)
export const fetchUsers = async () => {
  const { data } = await api.get('/auth/users');
  return data;
};
