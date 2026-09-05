const Joi = require('joi');

const addToCartSchema = Joi.object({
  productId: Joi.string().length(24).hex().required(),
  quantity: Joi.number().integer().min(1).default(1)
});

const updateCartSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required()
});

module.exports = { addToCartSchema, updateCartSchema };