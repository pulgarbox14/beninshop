const Setting = require('../models/Setting');
const asyncHandler = require('../middleware/asyncHandler');

const FIELDS = ['facebook', 'instagram', 'whatsapp', 'youtube'];

// GET /api/settings
const getSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.getSettings();

  res.json({
    facebook: settings.facebook,
    instagram: settings.instagram,
    whatsapp: settings.whatsapp,
    youtube: settings.youtube,
  });
});

// PUT /api/settings (admin)
const updateSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.getSettings();

  FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) settings[field] = req.body[field];
  });

  const updated = await settings.save();

  res.json({
    facebook: updated.facebook,
    instagram: updated.instagram,
    whatsapp: updated.whatsapp,
    youtube: updated.youtube,
  });
});

module.exports = { getSettings, updateSettings };
