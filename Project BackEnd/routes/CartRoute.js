const express = require('express');
const { getAllCartItems, addToCart, updateCartItem, removeFromCart, clearCart, getCartItemsById } = require('../controller/CartController');
const router = express.Router();

router.get('/', getAllCartItems);

router.get('/:id', getCartItemsById);

router.post('/',  addToCart);

router.patch('/:id', updateCartItem);

router.delete('/:id', removeFromCart);

router.delete('/:id', clearCart);

module.exports = router;