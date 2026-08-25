import api from './api';

// Nouvelle commande
export const createOrder = async (payload) => {
  const { data } = await api.post('/orders', payload);
  return data;
};

// Mes commandes
export const fetchMyOrders = async () => {
  const { data } = await api.get('/orders/mine');
  return data;
};

// Toutes les commandes (admin)
export const fetchOrders = async () => {
  const { data } = await api.get('/orders');
  return data;
};

// Changement de statut (admin)
export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/orders/${id}`, { status });
  return data;
};
