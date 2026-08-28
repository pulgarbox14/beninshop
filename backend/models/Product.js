const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, maxlength: 600 },
  },
  { timestamps: true }
);

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
    reviews: {
      type: [reviewSchema],
      default: [],
    },
    // Moyenne calculee a partir des avis
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

// Recalcule la note moyenne apres chaque avis
productSchema.methods.recalculerNote = function recalculerNote() {
  this.numReviews = this.reviews.length;
  this.rating = this.reviews.length
    ? Math.round((this.reviews.reduce((somme, avis) => somme + avis.rating, 0) / this.reviews.length) * 10) / 10
    : 0;
};

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
