import api from './api';

/** Enregistre une commande a partir du panier */
export const createOrder = async (payload) => {
  const { data } = await api.post('/orders', payload);
  return data;
};

/** Commandes de l'utilisateur connecte */
export const fetchMyOrders = async () => {
  const { data } = await api.get('/orders/mine');
  return data;
};

/** Toutes les commandes (admin) */
export const fetchOrders = async () => {
  const { data } = await api.get('/orders');
  return data;
};

/** Changement de statut d'une commande (admin) */
export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/orders/${id}`, { status });
  return data;
};
