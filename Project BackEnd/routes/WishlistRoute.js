const express = require('express');
const { getAllWishlistItems, addToWishlist, updateWishlistItem, removeFromWishlist, getWishlistItemsById } = require('../controller/WishlistController');
const router = express.Router();


router.get('/', getAllWishlistItems)

router.get('/:id', getWishlistItemsById)

router.post('/', addToWishlist)

router.patch('/:id', updateWishlistItem)

router.delete('/:id', removeFromWishlist)

module.exports = router;