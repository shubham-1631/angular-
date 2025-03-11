const express = require('express');
const Productrouter =express.Router();
const Product = require("../model/product")

Productrouter.get('/',async(req,res)=>{
    const data = await Product.find();
    res.send(data);
})

Productrouter.get('/:id',async(req,res)=>{
    try {
        const data = await Product.findById(req.params.id).populate('reviews.userId', 'name email');
        if (!data) return res.send({ error: 'Product not found' });
        res.send(data);
      } catch (error) {
        res.send({ error: error.message });
      }
});
 
Productrouter.post('/add',async(req,res)=>{
    try {
        const { name, brand, price, stock } = req.body;
        if (!name || !brand || !price || !stock) {
          return res.send({ error: 'Required fields: name, brand, price, stock' });
        }
        const data = await Product.create(req.body);
        res.send(data);
      } catch (error) {
        res.send({ error: error.message });
      }
});

Productrouter.patch('/:id',async(req,res)=>{
    try {
        const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) return res.send({ error: 'Product not found' });
        res.send(data);
      } catch (error) {
        res.send({ error: error.message });
      }
})

Productrouter.delete('/:id',async(req,res)=>{
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        if (!data) return res.send({ error: 'Product not found' });
        res.send({ message: 'Product deleted successfully' });
      } catch (error) {
        res.send({ error: error.message });
      }
});

module.exports=Productrouter;

