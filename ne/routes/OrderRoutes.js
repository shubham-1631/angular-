const express = require('express');
const Orderroute =express.Router();
const Order=require('../model/order')

Orderroute.get('/',async(req,res)=>{
    const data = await Order.find();
    res.send(data);
})

Orderroute.get('/:id',async(req,res)=>{
    try {
        const data = await Order.findById(req.params.id).populate('userId', 'name email').populate('products.productId', 'name price');
        if (!data) return res.send({ error: 'Order not found' });
        res.send(data);
    } catch (error) {
        res.send({ error: error.message });
    }
});
 
Orderroute.post('/add',async(req,res)=>{
    try {
        const { userId, products, paymentMethod, shippingAddress } = req.body;
        if (!userId || !products || products.length === 0) {
            return res.send({ error: 'User ID and products are required' });
        }
        
        const user = await User.findById(userId);
        if (!user) return res.send({ error: 'User not found' });

        let totalAmount = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) return res.send({ error: `Product not found: ${item.productId}` });
            if (product.stock < item.quantity) return res.json({ error: `Not enough stock for product: ${product.name}` });
            totalAmount += product.price * item.quantity;
        }

        const order = new Order({
            userId,
            products,
            paymentMethod,
            totalAmount,
            shippingAddress,
        });
        await order.save();
        res.send(order);
    } catch (error) {
        res.send({ error: error.message });
    }
});

Orderroute.patch('/:id',async(req,res)=>{
    try {
        const { orderStatus } = req.body;
        const data = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
        if (!data) return res.send({ error: 'Order not found' });
        res.send(data);
    } catch (error) {
        res.send({ error: error.message });
    }
})

Orderroute.delete('/:id',async(req,res)=>{
    try {
        const data = await Order.findByIdAndDelete(req.params.id);
        if (!data) return res.send({ error: 'Order not found' });
        res.send({ message: 'Order deleted successfully' });
    } catch (error) {
        res.send({ error: error.message });
    }
});

module.exports=Orderroute;

