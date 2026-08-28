const crypto = require('crypto');
const User = require('../models/User');
const { emailReinitialisation } = require('../services/mailer');
const { estEmail, texteRequis } = require('../utils/validation');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../middleware/asyncHandler');

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Merci de renseigner le nom, l\'email et le mot de passe');
  }

  if (!texteRequis(name, 2)) {
    res.status(400);
    throw new Error('Le nom doit contenir au moins 2 caractères');
  }

  if (!estEmail(email)) {
    res.status(400);
    throw new Error("Format d'email invalide");
  }

  if (String(password).length < 6) {
    res.status(400);
    throw new Error('Le mot de passe doit contenir au moins 6 caractères');
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    res.status(400);
    throw new Error('Un compte existe déjà avec cet email');
  }

  // Role force a "user" : un compte admin ne se cree jamais depuis le site
  const user = await User.create({ name, email, password, role: 'user' });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Merci de renseigner l\'email et le mot de passe');
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Email ou mot de passe incorrect');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    createdAt: req.user.createdAt,
  });
});

// PUT /api/auth/me
const updateMe = asyncHandler(async (req, res) => {
  const { name, email, currentPassword, password } = req.body;
  const user = await User.findById(req.user._id).select('+password');

  if (!user) {
    res.status(404);
    throw new Error('Utilisateur introuvable');
  }

  if (email && email.toLowerCase() !== user.email) {
    const taken = await User.findOne({ email: email.toLowerCase() });

    if (taken) {
      res.status(400);
      throw new Error('Cet email est déjà utilisé');
    }

    user.email = email;
  }

  if (name) user.name = name;

  // Le mot de passe actuel est exigé avant tout changement
  if (password) {
    if (!currentPassword || !(await user.matchPassword(currentPassword))) {
      res.status(401);
      throw new Error('Mot de passe actuel incorrect');
    }

    user.password = password;
  }

  const updated = await user.save();

  res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    token: generateToken(updated),
  });
});

// POST /api/auth/forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Merci de renseigner votre email');
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  // Reponse identique que le compte existe ou non
  const reponse = {
    message:
      'Si un compte existe avec cet email, un lien de réinitialisation vient de vous être envoyé.',
  };

  if (!user) return res.json(reponse);

  const token = crypto.randomBytes(32).toString('hex');
  user.resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
  user.resetTokenExpires = Date.now() + 60 * 60 * 1000;
  await user.save();

  const lien = `${process.env.CLIENT_URL || 'http://localhost:5173'}/mot-de-passe/nouveau?token=${token}`;

  try {
    await emailReinitialisation({ to: user.email, name: user.name, lien });
  } catch (error) {
    user.resetTokenHash = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(500);
    throw error;
  }

  res.json(reponse);
});

// POST /api/auth/reset-password
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    res.status(400);
    throw new Error('Lien invalide ou mot de passe manquant');
  }

  const hash = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetTokenHash: hash,
    resetTokenExpires: { $gt: Date.now() },
  }).select('+resetTokenHash +resetTokenExpires');

  if (!user) {
    res.status(400);
    throw new Error('Ce lien est expiré ou a déjà été utilisé');
  }

  user.password = password;
  user.resetTokenHash = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
});

// GET /api/auth/users (admin)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

module.exports = { register, login, getMe, updateMe, forgotPassword, resetPassword, getUsers };
