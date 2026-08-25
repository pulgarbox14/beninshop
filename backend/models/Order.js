const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: {
      type: [orderItemSchema],
      validate: [(value) => value.length > 0, 'La commande doit contenir au moins un produit'],
    },
    total: { type: Number, required: true, min: 0 },
    shippingAddress: {
      fullName: { type: String, trim: true },
      phone: { type: String, trim: true },
      city: { type: String, trim: true, default: 'Cotonou' },
      address: { type: String, trim: true },
    },
    status: {
      type: String,
      enum: ['en attente', 'payée', 'expédiée', 'livrée', 'annulée'],
      default: 'en attente',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
