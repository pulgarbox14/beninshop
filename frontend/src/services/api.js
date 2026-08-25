import axios from 'axios';

// Instance Axios utilisee dans toute l'application
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Ajoute le JWT
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('beninshop_user');

  if (stored) {
    try {
      const { token } = JSON.parse(stored);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {
      localStorage.removeItem('beninshop_user');
    }
  }

  return config;
});

// Message d'erreur lisible
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Une erreur est survenue, merci de reessayer.';

    if (error.response?.status === 401) {
      localStorage.removeItem('beninshop_user');
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
