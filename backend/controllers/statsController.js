const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc    Statistiques du tableau de bord administrateur
 * @route   GET /api/stats
 * @access  Admin
 */
const getStats = asyncHandler(async (req, res) => {
  const [productCount, userCount, orderCount, revenue] = await Promise.all([
    Product.countDocuments(),
    User.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]),
  ]);

  res.json({
    products: productCount,
    users: userCount,
    orders: orderCount,
    revenue: revenue.length > 0 ? revenue[0].total : 0,
  });
});

module.exports = { getStats };
