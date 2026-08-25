const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc    Creation d'une commande a partir du panier
 * @route   POST /api/orders
 * @access  Prive (JWT)
 */
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('Le panier est vide');
  }

  // Les prix sont relus en base : on ne fait jamais confiance au panier du client
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

/**
 * @desc    Commandes de l'utilisateur connecte
 * @route   GET /api/orders/mine
 * @access  Prive (JWT)
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

/**
 * @desc    Toutes les commandes (tableau de bord)
 * @route   GET /api/orders
 * @access  Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

/**
 * @desc    Mise a jour du statut d'une commande
 * @route   PUT /api/orders/:id
 * @access  Admin
 */
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
