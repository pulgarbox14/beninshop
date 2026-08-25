const mongoose = require('mongoose');

// Connexion a MongoDB
const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mini_ecommerce';

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connecté : ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`Erreur de connexion MongoDB : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
