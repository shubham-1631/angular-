const express = require('express');
const Wishlistroute =express.Router();
const Wishlist=require('../model/wishlist')

Wishlistroute.get('/',async(req,res)=>{
    const data = await Wishlist.find();
    res.send(data);
})

Wishlistroute.get('/:id',async(req,res)=>{
    const data = await Wishlist.findById(req.params.id);
    res.send(data);
});
 
Wishlistroute.post('/add',async(req,res)=>{
    const { productId, quantity } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    
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
});

Wishlistroute.patch('/:id',async(req,res)=>{
    const { productId, quantity } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.user.id });  

    if (!wishlist) return res.status(404).send("Wishlist not found");
    
    const itemIndex = wishlist.items.findIndex(item => item.productId.toString() === productId);
    if (!item) return res.status(404).send("Product not in wishlist");
    
    wishlist.items[itemIndex].quantity = quantity;
    await wishlist.save();
    res.send(wishlist);
})

Wishlistroute.delete('/:id',async(req,res)=>{
    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    
    if (!wishlist) return res.status(404).send("Wishlist not found");
    
    wishlist.items = wishlist.items.filter(item => item.productId.toString()!== req.params.productId);
    await wishlist.save();
    res.send(wishlist);
});

module.exports=Wishlistroute;