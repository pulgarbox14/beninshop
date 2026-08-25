const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../middleware/asyncHandler');

// POST /api/auth/register
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

  // bcrypt gere le hash dans le modele
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

// GET /api/auth/users (admin)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

module.exports = { register, login, getMe, updateMe, getUsers };
