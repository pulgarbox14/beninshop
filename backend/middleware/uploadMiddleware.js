const path = require('path');
const fs = require('fs');
const multer = require('multer');

const dossier = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(dossier, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dossier),
  filename: (req, file, cb) => {
    // Node lit le nom d'origine en latin1, on le repasse en utf8
    const original = Buffer.from(file.originalname, 'latin1').toString('utf8');

    const base = path
      .basename(original, path.extname(original))
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 40);

    cb(null, `${base || 'image'}-${Date.now()}${path.extname(original).toLowerCase()}`);
  },
});

// Seules les images sont acceptees
const fileFilter = (req, file, cb) => {
  const types = /jpeg|jpg|png|webp|gif|svg/;
  const extOk = types.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = /^image\//.test(file.mimetype);

  if (extOk && mimeOk) return cb(null, true);
  return cb(new Error('Format accepté : jpg, png, webp, gif ou svg'));
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
