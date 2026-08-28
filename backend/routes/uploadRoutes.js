const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/upload (admin) : renvoie les chemins des fichiers enregistres
router.post('/', protect, admin, upload.array('images', 6), (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('Aucun fichier reçu');
  }

  res.status(201).json({ images: req.files.map((file) => `/uploads/${file.filename}`) });
});

module.exports = router;
