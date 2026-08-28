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
