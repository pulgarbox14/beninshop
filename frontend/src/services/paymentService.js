import api from './api';

// Cree le paiement PAYCORE et renvoie l'URL de checkout
export const createCheckout = async (orderId) => {
  const { data } = await api.post('/payments/checkout', { orderId });
  return data;
};

// Verifie le statut du paiement d'une commande
export const verifyPayment = async (orderId) => {
  const { data } = await api.get(`/payments/${orderId}`);
  return data;
};
