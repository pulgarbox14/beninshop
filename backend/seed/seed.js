require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const products = require('./products');

const users = [
  { name: 'Admin BeninShop', email: 'admin@beninshop.bj', password: 'admin123', role: 'admin' },
  { name: 'Client Test', email: 'client@beninshop.bj', password: 'client123', role: 'user' },
];

const importData = async () => {
  await Order.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();

  const createdUsers = await User.create(users);
  const createdProducts = await Product.insertMany(products);

// Commandes de demo
  const client = createdUsers.find((u) => u.role === 'user');
  const sampleOrders = [
    [createdProducts[0], 1],
    [createdProducts[4], 1],
    [createdProducts[2], 2],
  ].map(([product, quantity]) => ({
    user: client._id,
    items: [
      {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      },
    ],
    total: product.price * quantity,
    shippingAddress: {
      fullName: client.name,
      phone: '+229 01 23 45 67 89',
      city: 'Cotonou',
      address: 'Quartier Fidjrosse',
    },
    status: 'payée',
  }));

  await Order.insertMany(sampleOrders);

  console.log(`${createdProducts.length} produits, ${createdUsers.length} utilisateurs et ${sampleOrders.length} commandes insérées.`);
  console.log('Compte admin  : admin@beninshop.bj / admin123');
  console.log('Compte client : client@beninshop.bj / client123');
};

const destroyData = async () => {
  await Order.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();
  console.log('Base mini_ecommerce vidée.');
};

const run = async () => {
  await connectDB();

  try {
    if (process.argv.includes('--destroy')) {
      await destroyData();
    } else {
      await importData();
    }
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  }
};

run();
