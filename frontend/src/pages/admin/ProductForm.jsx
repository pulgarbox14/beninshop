import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createProduct,
  fetchCategories,
  fetchProductById,
  updateProduct,
  uploadImages,
} from '../../services/productService';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { formatPrice } from '../../utils';
import { IconClose, IconPlus } from '../../components/Icons';

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  featured: false,
};

// Ajout / modification d'un produit
const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyProduct);
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState('fichier');
  const [lien, setLien] = useState('');
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!isEdit) return;

    fetchProductById(id)
      .then((product) => {
        setForm({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          featured: product.featured,
        });
        setImages(product.images?.length ? product.images : [product.image].filter(Boolean));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setError('');
    setUploading(true);

    try {
      const chemins = await uploadImages(files);
      setImages((current) => [...current, ...chemins].slice(0, 6));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleAjoutLien = () => {
    const url = lien.trim();
    if (!url) return;

    setImages((current) => [...current, url].slice(0, 6));
    setLien('');
  };

  const retirerImage = (index) => setImages((current) => current.filter((_, i) => i !== index));

  const definirPrincipale = (index) =>
    setImages((current) => [current[index], ...current.filter((_, i) => i !== index)]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images,
      image: images[0] || undefined,
    };

    try {
      if (isEdit) {
        await updateProduct(id, payload);
        setMessage('Produit mis à jour avec succès.');
      } else {
        await createProduct(payload);
        setMessage('Produit ajouté avec succès.');
        setForm(emptyProduct);
        setImages([]);
      }

      setTimeout(() => navigate('/admin/produits'), 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Chargement du produit..." />;

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>{isEdit ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
        <button type="button" className="btn btn-outline btn-sm" onClick={() => navigate('/admin/produits')}>
          Retour à la liste
        </button>
      </div>

      <div className="panel-body">
        <Alert type="error">{error}</Alert>
        <Alert type="success">{message}</Alert>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Nom du produit
              </label>
              <input
                id="name"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                placeholder="Ordinateur HP"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="category">
                Catégorie
              </label>
              <input
                id="category"
                name="category"
                className="form-control"
                value={form.category}
                onChange={handleChange}
                placeholder="Informatique"
                list="categories-list"
                required
              />
              <datalist id="categories-list">
                {categories.map((category) => (
                  <option key={category.name} value={category.name} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={form.description}
              onChange={handleChange}
              placeholder="Décrivez le produit..."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="price">
                Prix (FCFA)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                className="form-control"
                value={form.price}
                onChange={handleChange}
                placeholder="350000"
                required
              />
              {form.price !== '' && <p className="form-hint">{formatPrice(form.price)} FCFA</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="stock">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                className="form-control"
                value={form.stock}
                onChange={handleChange}
                placeholder="20"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">Images du produit</span>

            <div className="upload-tabs">
              <button
                type="button"
                className={mode === 'fichier' ? 'active' : ''}
                onClick={() => setMode('fichier')}
              >
                Depuis mes fichiers
              </button>
              <button
                type="button"
                className={mode === 'lien' ? 'active' : ''}
                onClick={() => setMode('lien')}
              >
                Depuis un lien
              </button>
            </div>

            {mode === 'fichier' ? (
              <label className="upload-drop">
                <input type="file" accept="image/*" multiple onChange={handleFiles} hidden />
                <IconPlus size={22} />
                <span>{uploading ? 'Envoi en cours...' : 'Choisir une ou plusieurs images'}</span>
                <small>jpg, png, webp ou svg — 5 Mo maximum par fichier</small>
              </label>
            ) : (
              <div className="upload-link">
                <input
                  type="url"
                  className="form-control"
                  value={lien}
                  onChange={(event) => setLien(event.target.value)}
                  placeholder="https://exemple.com/photo.jpg"
                />
                <button type="button" className="btn btn-outline" onClick={handleAjoutLien}>
                  Ajouter
                </button>
              </div>
            )}

            <p className="form-hint">
              {images.length}/6 image{images.length > 1 ? 's' : ''}. La première est l&apos;image
              principale, cliquez sur une autre pour la mettre en avant.
            </p>

            {images.length > 0 && (
              <div className="image-gallery">
                {images.map((src, index) => (
                  <div className={`gallery-item${index === 0 ? ' principale' : ''}`} key={src}>
                    <img
                      src={src}
                      alt={`Visuel ${index + 1}`}
                      onClick={() => definirPrincipale(index)}
                      onError={(event) => {
                        event.currentTarget.src = '/images/products/placeholder.svg';
                      }}
                    />
                    <button
                      type="button"
                      className="gallery-remove"
                      onClick={() => retirerImage(index)}
                      aria-label="Retirer cette image"
                    >
                      <IconClose size={14} />
                    </button>
                    {index === 0 && <span className="gallery-badge">Principale</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="filter-option" htmlFor="featured">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={form.featured}
                onChange={handleChange}
              />
              Mettre en avant sur la page d&apos;accueil
            </label>
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Enregistrement...' : isEdit ? 'Enregistrer les modifications' : 'Ajouter le produit'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProductForm;
