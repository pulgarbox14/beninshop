import api from './api';

// Liste des produits
export const fetchProducts = async (params = {}) => {
  const { data } = await api.get('/products', { params });
  return data;
};

// Detail d'un produit
export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

// Depose un avis
export const addReview = async (id, payload) => {
  const { data } = await api.post(`/products/${id}/reviews`, payload);
  return data;
};

// Supprime un avis (admin)
export const deleteReview = async (id, reviewId) => {
  const { data } = await api.delete(`/products/${id}/reviews/${reviewId}`);
  return data;
};

// Categories
export const fetchCategories = async () => {
  const { data } = await api.get('/products/categories/all');
  return data;
};

// Televersement d'images (admin)
export const uploadImages = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));

  const { data } = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data.images;
};

// Creation (admin)
export const createProduct = async (product) => {
  const { data } = await api.post('/products', product);
  return data;
};

// Modification (admin)
export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
};

// Suppression (admin)
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
