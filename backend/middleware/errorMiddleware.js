// Route inconnue
const notFound = (req, res, next) => {
  const error = new Error(`Route introuvable : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Gestion des erreurs
const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Erreur serveur';

  // Erreurs de validation Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Identifiant MongoDB mal forme
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Ressource introuvable : identifiant invalide';
  }

  // Violation d'unicite (email deja utilise)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Cette valeur est déjà utilisée';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

module.exports = { notFound, errorHandler };
