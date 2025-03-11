const express = require('express');
const Cartroute =express.Router();
const Cart=require('../model/shoppingcart')

Cartroute.get('/',async(req,res)=>{
    const data = await Cart.find();
    res.send(data);
})

Cartroute.get('/:id',async(req,res)=>{
    try {
        const data = await Cart.findOne({ userId: req.params.userId }).populate('products.productId', 'name price stock');
        if (!data) return res.send({ error: 'Cart not found' });
        res.send(data);
      } catch (error) {
        res.send({ error: error.message });
      }
});
 
Cartroute.post('/add',async(req,res)=>{
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
          return res.send({ error: 'User ID, Product ID, and Quantity are required' });
        }
    
        const user = await User.findById(userId);
        if (!user) return res.send({ error: 'User not found' });
    
        const product = await Product.findById(productId);
        if (!product) return res.send({ error: 'Product not found' });
    
        if (product.stock < quantity) return res.send({ error: 'Not enough stock available' });
    
        let cart = await Cart.findOne({ userId });
    
        if (!data) {
          data = new Cart({ userId, products: [{ productId, quantity }] });
        } else {
          const existingProduct = cart.products.find(p => p.productId.toString() === productId);
          if (existingProduct) {
            existingProduct.quantity += quantity;
          } else {
            data.products.push({ productId, quantity });
          }
        }
    
        await data.save();
        res.send(data);
      } catch (error) {
        res.send({ error: error.message });
      }
});

Cartroute.patch('/:id',async(req,res)=>{
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
          return res.send({ error: 'User ID, Product ID, and Quantity are required' });
        }
    
        const data = await Cart.findOne({ userId });
        if (!data) return res.send({ error: 'Cart not found' });
    
        const item = cart.products.find(p => p.productId.toString() === productId);
        if (!item) return res.send({ error: 'Product not in cart' });
    
        item.quantity = quantity;
        await data.save();
    
        res.send(data);
      } catch (error) {
        res.send({ error: error.message });
      } 
})

Cartroute.delete('/:id',async(req,res)=>{
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) {
          return res.send({ error: 'User ID and Product ID are required' });
        }
    
        const data = await Cart.findOne({ userId });
        if (!data) return res.send({ error: 'Cart not found' });
    
        cart.products = data.products.filter(p => p.productId.toString() !== productId);
        await data.save();
    
        res.send({ message: 'Item removed from cart', cart });
      } catch (error) {
        res.send({ error: error.message });
      }
});



module.exports=Cartroute;

