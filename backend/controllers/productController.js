const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
const { echapperRegex, estNombrePositif, texteRequis } = require('../utils/validation');

// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const { search, category, sort, limit, page, featured } = req.query;

  const filter = {};

  if (search) {
    const terme = echapperRegex(String(search).slice(0, 80));
    filter.$or = [
      { name: { $regex: terme, $options: 'i' } },
      { description: { $regex: terme, $options: 'i' } },
    ];
  }

  if (category && category !== 'Toutes') {
    filter.category = String(category);
  }

  if (featured === 'true') {
    filter.featured = true;
  }

  const sortOptions = {
    'prix-asc': { price: 1 },
    'prix-desc': { price: -1 },
    'nom-asc': { name: 1 },
    'nom-desc': { name: -1 },
    recent: { createdAt: -1 },
  };

  const perPage = Math.min(Number(limit) || 0, 100);
  const currentPage = Math.max(Number(page) || 1, 1);

  let query = Product.find(filter).sort(sortOptions[sort] || { createdAt: -1 });

  if (perPage > 0) {
    query = query.skip((currentPage - 1) * perPage).limit(perPage);
  }

  const [products, total] = await Promise.all([query, Product.countDocuments(filter)]);

  res.json({
    products,
    total,
    page: currentPage,
    pages: perPage > 0 ? Math.ceil(total / perPage) : 1,
  });
});

// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Produit introuvable');
  }

  res.json(product);
});

// POST /api/products (admin)
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, image, images, category, stock, featured } = req.body;

  if (!texteRequis(name, 2) || !texteRequis(description, 10) || !texteRequis(category, 2)) {
    res.status(400);
    throw new Error('Nom, description et catégorie sont obligatoires');
  }

  if (!estNombrePositif(price) || !estNombrePositif(stock)) {
    res.status(400);
    throw new Error('Le prix et le stock doivent être des nombres positifs');
  }

  const galerie = Array.isArray(images) ? images.filter(Boolean).slice(0, 6) : [];

  const product = new Product({
    name,
    description,
    price,
    image: galerie[0] || image || undefined,
    images: galerie,
    category,
    stock,
    featured: Boolean(featured),
  });

  await product.save();

  res.status(201).json(product);
});

// PUT /api/products/:id (admin)
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Produit introuvable');
  }

  const fields = ['name', 'description', 'price', 'image', 'category', 'stock', 'featured'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined && req.body[field] !== '') {
      product[field] = req.body[field];
    }
  });

  if (req.body.price !== undefined && !estNombrePositif(req.body.price)) {
    res.status(400);
    throw new Error('Le prix doit être un nombre positif');
  }

  if (req.body.stock !== undefined && !estNombrePositif(req.body.stock)) {
    res.status(400);
    throw new Error('Le stock doit être un nombre positif');
  }

  if (Array.isArray(req.body.images)) {
    product.images = req.body.images.filter(Boolean).slice(0, 6);
  }

  const updated = await product.save();
  res.json(updated);
});

// DELETE /api/products/:id (admin)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Produit introuvable');
  }

  await product.deleteOne();
  res.json({ message: 'Produit supprimé avec succès', _id: req.params.id });
});

// POST /api/products/:id/reviews
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const note = Number(rating);

  if (!Number.isInteger(note) || note < 1 || note > 5) {
    res.status(400);
    throw new Error('La note doit être comprise entre 1 et 5');
  }

  if (!texteRequis(comment, 5)) {
    res.status(400);
    throw new Error('Merci d\'écrire un commentaire d\'au moins 5 caractères');
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Produit introuvable');
  }

  const dejaNote = product.reviews.some(
    (avis) => avis.user.toString() === req.user._id.toString()
  );

  if (dejaNote) {
    res.status(400);
    throw new Error('Vous avez déjà laissé un avis sur ce produit');
  }

  product.reviews.push({
    user: req.user._id,
    name: req.user.name,
    rating: note,
    comment: comment.trim().slice(0, 600),
  });

  product.recalculerNote();
  await product.save();

  res.status(201).json({ reviews: product.reviews, rating: product.rating, numReviews: product.numReviews });
});

// DELETE /api/products/:id/reviews/:reviewId (admin)
const deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Produit introuvable');
  }

  product.reviews = product.reviews.filter(
    (avis) => avis._id.toString() !== req.params.reviewId
  );

  product.recalculerNote();
  await product.save();

  res.json({ reviews: product.reviews, rating: product.rating, numReviews: product.numReviews });
});

// GET /api/products/categories/all
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $project: { _id: 0, name: '$_id', count: 1 } },
    { $sort: { name: 1 } },
  ]);

  res.json(categories);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
  deleteReview,
  getCategories,
};
