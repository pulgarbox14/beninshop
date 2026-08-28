const mongoose = require('mongoose');

// Reglages de la boutique : un seul document en base
const settingSchema = new mongoose.Schema(
  {
    facebook: { type: String, trim: true, default: '' },
    instagram: { type: String, trim: true, default: '' },
    whatsapp: { type: String, trim: true, default: '' },
    youtube: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

// Renvoie le document existant, ou le cree au premier appel
settingSchema.statics.getSettings = async function getSettings() {
  const existing = await this.findOne();
  return existing || this.create({});
};

module.exports = mongoose.model('Setting', settingSchema);
