require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const statsRoutes = require('./routes/statsRoutes');
const settingRoutes = require('./routes/settingRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET) {
  console.error('Variable JWT_SECRET absente du fichier .env (voir .env.example)');
  process.exit(1);
}

// Connexion a MongoDB
connectDB();

// Middlewares globaux
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Images televersees
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route de test
app.get('/api', (req, res) => {
  res.json({ message: 'API BeninShop opérationnelle', version: '1.0.0' });
});

// Routes de l'application
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/upload', uploadRoutes);

// Gestion des erreurs
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;
