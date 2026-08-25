const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verifie le token et charge l'utilisateur
const protect = async (req, res, next) => {
  const header = req.headers.authorization || '';

  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Non autorisé : token manquant' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Non autorisé : utilisateur introuvable' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Non autorisé : token invalide ou expiré' });
  }
};

// Reserve aux admins
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
};

module.exports = { protect, admin };
