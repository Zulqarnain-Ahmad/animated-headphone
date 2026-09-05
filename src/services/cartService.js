
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  return cart;
};

const addItemToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  if (product.stock < quantity) {
    const error = new Error('Not enough stock available');
    error.statusCode = 400;
    throw error;
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();

  return Cart.findOne({ user: userId }).populate('items.product');
};

const updateCartItem=async(userId,productId,quantity)=>{
  const cart=await Cart.findOne({user:userId});

  if(!cart){
    const error=new Error('Cart not found');
    error.statusCode=404;
    throw error;
  }

  const item=cart.items.find(
    (item)=> item.product.toString()===productId
  );

  if(!item){
    const error=new Error('Item not found in cart');
    error.statusCode=404;
    throw error;
  }

  item.quantity=quantity;
  await cart.save();

  return Cart.findOne({user : userId}).populate('items.product');

}

const removeCartItem=async(userId,productId)=>{
  const cart=await Cart.findOne({user:userId});

  if(!cart){
    const error=new Error('Cart not found');
    error.statusCode=404;
    throw error;
  }

  cart.items=cart.items.filter(
    (item)=> item.product.toString() !== productId
  );

  await cart.save();

  return Cart.findOne({user:userId}).populate('items.product')
}

module.exports = { getOrCreateCart, addItemToCart, updateCartItem, removeCartItem };