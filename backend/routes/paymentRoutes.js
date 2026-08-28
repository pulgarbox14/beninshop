const express = require('express');
const { createCheckout, verifyPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/checkout', protect, createCheckout);
router.get('/:orderId', protect, verifyPayment);

module.exports = router;
