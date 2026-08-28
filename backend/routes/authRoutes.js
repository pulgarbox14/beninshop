const express = require('express');
const {
  register,
  login,
  getMe,
  updateMe,
  forgotPassword,
  resetPassword,
  getUsers,
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/securityMiddleware');

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);
router.get('/users', protect, admin, getUsers);

module.exports = router;
