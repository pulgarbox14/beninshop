const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const { search, category, sort, limit, page, featured } = req.query;

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (category && category !== 'Toutes') {
    filter.category = category;
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
  const { name, description, price, image, category, stock, featured } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    image: image || undefined,
    category,
    stock,
    featured: Boolean(featured),
  });

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
  getCategories,
};
