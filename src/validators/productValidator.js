const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  image: Joi.string().uri().required(),
  price: Joi.number().min(0).required(),
  originalPrice: Joi.number().min(0),
  rating: Joi.number().min(0).max(5),
  numReviews: Joi.number().min(0),
  tag: Joi.string().valid('best-seller', 'discount', 'new').allow(null),
  stock: Joi.number().min(0).required()
});

const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  image: Joi.string().uri(),
  price: Joi.number().min(0),
  originalPrice: Joi.number().min(0),
  rating: Joi.number().min(0).max(5),
  numReviews: Joi.number().min(0),
  tag: Joi.string().valid('best-seller', 'discount', 'new').allow(null),
  stock: Joi.number().min(0)
}).min(1);

module.exports = { createProductSchema, updateProductSchema };

