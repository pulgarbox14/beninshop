const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
const { estTelephone, texteRequis } = require('../utils/validation');

// POST /api/orders
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('Le panier est vide');
  }

  if (items.length > 50) {
    res.status(400);
    throw new Error('Le panier contient trop d\'articles');
  }

  if (!texteRequis(shippingAddress?.fullName, 2)) {
    res.status(400);
    throw new Error('Le nom du destinataire est obligatoire');
  }

  if (!estTelephone(shippingAddress?.phone)) {
    res.status(400);
    throw new Error('Numéro de téléphone invalide (exemple : +229 01 23 45 67 89)');
  }

  if (!texteRequis(shippingAddress?.city, 2) || !texteRequis(shippingAddress?.address, 5)) {
    res.status(400);
    throw new Error('La ville et l\'adresse de livraison sont obligatoires');
  }

// On relit les prix en base
  const detailedItems = await Promise.all(
    items.map(async ({ product: productId, quantity }) => {
      const product = await Product.findById(productId);

      if (!product) {
        res.status(404);
        throw new Error('Un produit du panier est introuvable');
      }

      const qty = Math.max(Number(quantity) || 1, 1);

      if (product.stock < qty) {
        res.status(400);
        throw new Error(`Stock insuffisant pour ${product.name}`);
      }

      return {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: qty,
      };
    })
  );

  const total = detailedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: req.user._id,
    items: detailedItems,
    total,
    shippingAddress,
  });

  // Mise a jour du stock
  await Promise.all(
    detailedItems.map((item) =>
      Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })
    )
  );

  res.status(201).json(order);
});

// GET /api/orders/mine
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// GET /api/orders (admin)
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

// PUT /api/orders/:id (admin)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Commande introuvable');
  }

  order.status = req.body.status || order.status;
  const updated = await order.save();

  res.json(updated);
});

module.exports = { createOrder, getMyOrders, getOrders, updateOrderStatus };
