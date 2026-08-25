const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc    Inscription d'un utilisateur
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Merci de renseigner le nom, l\'email et le mot de passe');
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    res.status(400);
    throw new Error('Un compte existe déjà avec cet email');
  }

  // Le mot de passe est chiffre avec bcrypt dans le hook pre('save') du modele
  const user = await User.create({
    name,
    email,
    password,
    role: role === 'admin' ? 'admin' : 'user',
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
});

/**
 * @desc    Connexion : verifie le mot de passe et renvoie un JWT
 * @route   POST /api/auth/login
 * @access  Public
 */
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

/**
 * @desc    Profil de l'utilisateur connecte
 * @route   GET /api/auth/me
 * @access  Prive (JWT)
 */
const getMe = asyncHandler(async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    createdAt: req.user.createdAt,
  });
});

/**
 * @desc    Liste des utilisateurs (tableau de bord)
 * @route   GET /api/auth/users
 * @access  Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

module.exports = { register, login, getMe, getUsers };
