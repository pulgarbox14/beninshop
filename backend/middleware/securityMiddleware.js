const rateLimit = require('express-rate-limit');

// Limite les tentatives sur les routes sensibles
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Trop de tentatives, réessayez dans quelques minutes.' },
});

// Limite globale de l'API
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Trop de requêtes, merci de patienter.' },
});

module.exports = { authLimiter, apiLimiter };
