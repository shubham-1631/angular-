const express = require('express');
const Reviewroute =express.Router();
const Review=require('../model/review')

Reviewroute.get('/',async(req,res)=>{
    const data = await Review.find();
    res.send(data);
})

Reviewroute.get('/:id',async(req,res)=>{
    try {
        const data = await Review.findById(req.params.id).populate('userId', 'name email').populate('productId', 'name');
        if (!data) return res.send({ error: 'Review not found' });
        res.send(data);
      } catch (error) {
        res.send({ error: error.message });
      };
});

 
Reviewroute.post('/add',async(req,res)=>{
    try {
        const { productId, userId, rating, comment } = req.body;
        if (!productId || !userId || !rating) {
          return res.send({ error: 'Product ID, User ID, and Rating are required' });
        }
    
        const user = await User.findById(userId);
        if (!user) return res.send({ error: 'User not found' });
    
        const product = await Product.findById(productId);
        if (!product) return res.send({ error: 'Product not found' });
    
        const data = await Review.create({ productId, userId, rating, comment });
        res.send(data);
      } catch (error) {
        res.send({ error: error.message });
      }
});

Reviewroute.patch('/:id',async(req,res)=>{
    try {
        const data = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) return res.send({ error: 'Review not found' });
        res.send(data);
      } catch (error) {
        res.send({ error: error.message });
      }
})

Reviewroute.delete('/:id',async(req,res)=>{
    try {
        const data = await Review.findByIdAndDelete(req.params.id);
        if (!data) return res.send({ error: 'Review not found' });
        res.send({ message: 'Review deleted successfully' });
      } catch (error) {
        res.send({ error: error.message });
      }
});

module.exports=Reviewroute;

