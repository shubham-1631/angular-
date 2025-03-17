const Cart = require('../models/Cart');
const Product = require("../models/Product");

// const addToCart = async (req, res) => {
//     const data = await Cart.create(req.body);
//     res.send(data);
// }

// Get all cart items for a user
const getAllCartItems = async (req, res) => {
  const data = await Cart.find({ UserId: req.params.UserId }).populate("items.productId");
  if (!data) return res.status(404).send("Cart is empty");
  res.send(data);
};

const getCartItemsById = async (req, res) => {
  const data = await Cart.findById({ UserId: req.user.id }).populate("items.productId");
  if (!data) return res.status(404).send("Cart is empty");
  res.send(data);
};

// Add an item to the cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ UserId: req.user.id });

  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: [] });
  }

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) return res.status(404).send("Product not found");

  // Check if item is already in cart
  const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity; // Update quantity if exists
  } else {
    cart.items.push({ productId, quantity }); // Add new item
  }

  await cart.save();
  res.send(cart);
};

// Update item quantity in the cart
const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ UserId: req.user.id });

  if (!cart) return res.status(404).send("Cart not found");

  const item = cart.items.find(item => item.productId.toString() === productId);
  if (!item) return res.status(404).send("Product not in cart");

  item.quantity = quantity;
  await cart.save();
  res.send(cart);
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
  let cart = await Cart.findOne({ UserId: req.user.id });

  if (!cart) return res.status(404).send("Cart not found");

  cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
  await cart.save();
  res.send(cart);
};

// Clear the cart
const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ UserId: req.user.id });
  res.send("Cart cleared");
};

module.exports = { getAllCartItems, getCartItemsById, addToCart, updateCartItem, removeFromCart, clearCart };
