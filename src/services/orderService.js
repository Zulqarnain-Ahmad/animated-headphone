const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const createOrder = async (userId, shippingAddress) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    const error = new Error('Cart is empty');
    error.statusCode = 400;
    throw error;
  }

  // First pass: validate everything BEFORE changing any data.
  // This doesn't give us full transaction safety, but it does prevent
  // the most common failure case — discovering a problem halfway through.
  for (const item of cart.items) {
    const product = item.product;

    if (!product) {
      const error = new Error('One of the items in your cart no longer exists');
      error.statusCode = 400;
      throw error;
    }

    if (product.stock < item.quantity) {
      const error = new Error(`Not enough stock for ${product.name}`);
      error.statusCode = 400;
      throw error;
    }
  }

  // Second pass: now that we know everything is valid, actually apply changes.
  let totalAmount = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const product = item.product;

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    });

    totalAmount += product.price * item.quantity;

    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount,
    shippingAddress
  });

  cart.items = [];
  await cart.save();

  return order;
};

const getMyOrders = async (userId) => {
  return Order.find({ user: userId }).sort({ createdAt: -1 });
};

const getOrderById = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });

  if (!order) {
    const error = new Error('Order not found');
    error.statusCode = 404;
    throw error;
  }

  return order;
};


const getAllOrders=async()=>{
    return Order.find().populate('user','name email').sort({createdAt:-1})
}

const updateOrderStatus=async(orderId,status)=>{
    const order=await Order.findById(orderId);

    if(!order){
        const error=new Error('Order not found');
        error.statusCode=404;
        throw error;
    }

    order.status=status;
    await order.save();

    return order;
}

const updatePaymentStatus=async(orderId,paymentStatus)=>{
  const order=await Order.findById(orderId);

  if(!order){
    const error=new Error('Order not found');
    error.statusCode=404;
    throw error;
  }

  order.paymentStatus=paymentStatus;
  await order.save();

  return order;
}

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus, updatePaymentStatus };