const paycore = require('../services/paycore');
const Order = require('../models/Order');
const asyncHandler = require('../middleware/asyncHandler');

const clientUrl = () => process.env.CLIENT_URL || 'http://localhost:5173';

// Applique le statut PAYCORE a la commande
const appliquerPaiement = async (order, paiement) => {
  order.payment = {
    ...order.payment,
    id: paiement.id,
    status: paiement.status,
    method: paiement.method,
    provider: paiement.provider,
    checkoutUrl: order.payment?.checkoutUrl,
  };

  if (paiement.status === 'succeeded' && order.status === 'en attente') {
    order.status = 'payée';
    order.payment.paidAt = new Date();
  }

  return order.save();
};

// POST /api/payments/checkout
const createCheckout = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body.orderId);

  if (!order) {
    res.status(404);
    throw new Error('Commande introuvable');
  }

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Cette commande ne vous appartient pas');
  }

  if (order.status !== 'en attente') {
    res.status(400);
    throw new Error('Cette commande est déjà réglée');
  }

  const paiement = await paycore.createPayment({
    amount: order.total,
    currency: 'XOF',
    description: `Commande ${order._id}`,
    customer: {
      firstName: order.shippingAddress?.fullName || req.user.name,
      email: req.user.email,
    },
    metadata: { orderId: order._id.toString() },
    reference: order._id.toString(),
    return_url: `${clientUrl()}/paiement/merci?order=${order._id}`,
    cancel_url: `${clientUrl()}/paiement/annule?order=${order._id}`,
  });

  order.payment = {
    id: paiement.id,
    status: paiement.status,
    checkoutUrl: paiement.checkout_url,
  };
  await order.save();

  res.status(201).json({ checkoutUrl: paiement.checkout_url, paymentId: paiement.id });
});

// GET /api/payments/:orderId : verifie le statut aupres de PAYCORE
const verifyPayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    res.status(404);
    throw new Error('Commande introuvable');
  }

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Cette commande ne vous appartient pas');
  }

  if (order.payment?.id) {
    const paiement = await paycore.getPayment(order.payment.id);
    await appliquerPaiement(order, paiement);
  }

  res.json({
    orderId: order._id,
    total: order.total,
    status: order.status,
    payment: order.payment,
  });
});

// POST /api/payments/webhook : notification PAYCORE (corps brut)
const handleWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['x-paycore-signature'];
  const valide = paycore.verifyWebhook(req.body, signature, process.env.PAYCORE_WEBHOOK_SECRET);

  if (!valide) {
    res.status(401);
    throw new Error('Signature invalide');
  }

  const event = JSON.parse(req.body.toString());

  if (event.type === 'payment.succeeded') {
    const order = await Order.findById(event.data?.metadata?.orderId);
    if (order) await appliquerPaiement(order, event.data);
  }

  res.json({ received: true });
});

module.exports = { createCheckout, verifyPayment, handleWebhook };
