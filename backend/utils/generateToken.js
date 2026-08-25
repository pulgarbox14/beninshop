const jwt = require('jsonwebtoken');

/**
 * Genere un JWT contenant l'identifiant et le role de l'utilisateur.
 */
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

module.exports = generateToken;
