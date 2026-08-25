import api from './api';

/** Liste des produits (filtres facultatifs : search, category, sort, page, limit) */
export const fetchProducts = async (params = {}) => {
  const { data } = await api.get('/products', { params });
  return data;
};

/** Detail d'un produit */
export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

/** Categories et nombre de produits associes */
export const fetchCategories = async () => {
  const { data } = await api.get('/products/categories/all');
  return data;
};

/** Creation d'un produit (admin) */
export const createProduct = async (product) => {
  const { data } = await api.post('/products', product);
  return data;
};

/** Mise a jour d'un produit (admin) */
export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
};

/** Suppression d'un produit (admin) */
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
