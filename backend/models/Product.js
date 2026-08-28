const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom du produit est obligatoire'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Le prix est obligatoire'],
      min: [0, 'Le prix ne peut pas être négatif'],
    },
    // Galerie du produit, la premiere image est l'image principale
    images: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '/images/products/placeholder.svg',
    },
    category: {
      type: String,
      required: [true, 'La catégorie est obligatoire'],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'Le stock est obligatoire'],
      min: [0, 'Le stock ne peut pas être négatif'],
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// image reste synchronisee sur la premiere de la galerie
productSchema.pre('save', function syncImage(next) {
  if (this.images.length > 0) {
    this.image = this.images[0];
  } else if (this.image && this.image !== '/images/products/placeholder.svg') {
    this.images = [this.image];
  }

  next();
});

productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
