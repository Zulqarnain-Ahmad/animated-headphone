const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0,
    min: 0
  },
  tag: {
    type: String,
    enum: ['best-seller', 'discount', 'new', null],
    default: null
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

productSchema.set('toJSON',{
  transform:(doc,ret)=>{
    delete ret.__v;
    return ret;
  }
})

module.exports = mongoose.model('Product', productSchema);