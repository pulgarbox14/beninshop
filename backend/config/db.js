const mongoose = require('mongoose');

/**
 * Connexion a la base MongoDB "mini_ecommerce" via Mongoose.
 * L'URI est lue depuis la variable d'environnement MONGO_URI.
 */
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
