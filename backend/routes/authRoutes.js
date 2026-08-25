const express = require('express');
const { register, login, getMe, updateMe, getUsers } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);
router.get('/users', protect, admin, getUsers);

module.exports = router;
