const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

const getAllWishlistItems = async (req, res) => {
    const data = await Wishlist.find({ UserID: req.params.UserID }).populate("items.productId");
    if (!data) return res.status(404).send("Wishlist is empty");
  
    res.send(data);
}
const getWishlistItemsById = async (req, res) => {
  const data = await Cart.findById({ UserId: req.user.id }).populate("items.productId");
  if (!data) return res.status(404).send("Cart is empty");
  res.send(data);
};


const addToWishlist = async (req, res) => {
    const { productId, quantity } = req.body;
    let wishlist = await Wishlist.findOne({ UserID: req.user.UserID });
    
    if (!wishlist) {
        wishlist = new Wishlist({ userId: req.user.id, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).send("Product not found");

    const itemIndex = wishlist.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
        wishlist.items[itemIndex].quantity += quantity;
    } else {
        wishlist.items.push({ productId, quantity });
    }

    await wishlist.save();
    res.send(wishlist);
};

const updateWishlistItem = async (req, res) => {
    const { productId, quantity } = req.body;
    let wishlist = await Wishlist.findOne({ UserID: req.params.UserID });  

    if (!wishlist) return res.status(404).send("Wishlist not found");
    
    const itemIndex = wishlist.items.findIndex(item => item.productId.toString() === productId);
    if (!item) return res.status(404).send("Product not in wishlist");
    
    wishlist.items[itemIndex].quantity = quantity;
    await wishlist.save();
    res.send(wishlist);
}

const removeFromWishlist = async (req, res) => {
    let wishlist = await Wishlist.findOne({ UserID: req.user.id });
    
    if (!wishlist) return res.status(404).send("Wishlist not found");
    
    wishlist.items = wishlist.items.filter(item => item.productId.toString()!== req.params.productId);
    await wishlist.save();
    res.send(wishlist);
}

module.exports = { getAllWishlistItems, getWishlistItemsById, addToWishlist, updateWishlistItem, removeFromWishlist };