const Joi = require('joi');

const createOrderSchema = Joi.object({
  shippingAddress: Joi.object({
    fullName: Joi.string().trim().min(2).max(100).required(),
    addressLine1: Joi.string().trim().min(3).max(200).required(),
    city: Joi.string().trim().min(2).max(100).required(),
    postalCode: Joi.string().trim().min(2).max(20).required(),
    country: Joi.string().trim().min(2).max(100).required()
  }).required()

});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required()
});

const updatePaymentStatusSchema=Joi.object({
  paymentStatus:Joi.string().valid('pending','paid','failed').required()
})


module.exports = { createOrderSchema, updateOrderStatusSchema,updatePaymentStatusSchema };

