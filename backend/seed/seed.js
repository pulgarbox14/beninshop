require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const products = require('./products');

// Aucun identifiant dans le code : tout vient du .env
const requireEnv = (key) => {
  const value = process.env[key];

  if (!value) {
    console.error(`Variable ${key} absente du fichier .env (voir .env.example)`);
    process.exit(1);
  }

  return value;
};

// Seul l'administrateur est cree ici, les clients s'inscrivent depuis le site
const admin = {
  name: requireEnv('ADMIN_NAME'),
  email: requireEnv('ADMIN_EMAIL'),
  password: requireEnv('ADMIN_PASSWORD'),
  role: 'admin',
};

const importData = async () => {
  // Le catalogue est reinitialise, les comptes clients et leurs commandes sont conserves
  await Product.deleteMany();
  const createdProducts = await Product.insertMany(products);

  // L'admin doit exister en base, sinon la connexion est impossible
  let user = await User.findOne({ email: admin.email });

  if (user) {
    user.name = admin.name;
    user.password = admin.password;
    user.role = 'admin';
  } else {
    user = new User(admin);
  }

  await user.save();

  const clients = await User.countDocuments({ role: 'user' });

  console.log(`${createdProducts.length} produits insérés.`);
  console.log(`Administrateur enregistré en base : ${admin.email}`);
  console.log(`${clients} compte(s) client conservé(s).`);
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
