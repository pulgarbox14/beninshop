import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createProduct,
  fetchCategories,
  fetchProductById,
  updateProduct,
} from '../../services/productService';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { formatPrice } from '../../utils';

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  image: '/images/products/placeholder.svg',
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
      .then((product) =>
        setForm({
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          category: product.category,
          stock: product.stock,
          featured: product.featured,
        })
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      if (isEdit) {
        await updateProduct(id, payload);
        setMessage('Produit mis à jour avec succès.');
      } else {
        await createProduct(payload);
        setMessage('Produit ajouté avec succès.');
        setForm(emptyProduct);
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
            <label className="form-label" htmlFor="image">
              Image (URL ou chemin)
            </label>
            <input
              id="image"
              name="image"
              className="form-control"
              value={form.image}
              onChange={handleChange}
              placeholder="/images/products/ordinateur-hp.svg"
            />
            <p className="form-hint">
              Laissez la valeur par défaut si vous n&apos;avez pas encore d&apos;image.
            </p>
          </div>

          {form.image && (
            <div className="form-group">
              <span className="table-thumb" style={{ width: 120, height: 100 }}>
                <img
                  src={form.image}
                  alt="Apercu"
                  onError={(event) => {
                    event.currentTarget.src = '/images/products/placeholder.svg';
                  }}
                />
              </span>
            </div>
          )}

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
