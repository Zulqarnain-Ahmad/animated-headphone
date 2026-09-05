const express = require('express');
const router = express.Router();
const { placeOrder, getOrders, getOrder, getAdminOrders, updateStatus, updatePayment } = require('../controllers/orderController');
const protect = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const validate = require('../middleware/validate');
const { createOrderSchema, updateOrderStatusSchema, updatePaymentStatusSchema } = require('../validators/orderValidator');

router.post('/', protect, validate(createOrderSchema), placeOrder);
router.get('/', protect, getOrders);
router.get('/admin/all', protect, isAdmin, getAdminOrders);
router.put('/admin/:id/status', protect, isAdmin, validate(updateOrderStatusSchema), updateStatus);
router.put('/admin/:id/payment', protect, isAdmin, validate(updatePaymentStatusSchema), updatePayment);
router.get('/:id', protect, getOrder);

module.exports = router;