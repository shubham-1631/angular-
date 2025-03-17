const express = require('express');
const Categoryroute =express.Router();
const Category=require('../model/categories');
const bodyParser = require('body-parser');

Categoryroute.use(bodyParser.json())

Categoryroute.get('/',async(req,res)=>{
    const data = await Category.find();
    res.send(data);
})

Categoryroute.get('/:id',async(req,res)=>{
    try {
        const data = await Category.findById(req.params.id);
        if (!data) return res.send("No data found!");
        res.send(data);
    }
    catch (error) {
        res.send(error.message);
    }
});
 
Categoryroute.post('/add', async (req, res) => {
    try {
        console.log("name = ",req.body);
        const { name, description, images } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required!" });
        }

        // Check if a category with the same name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: `Category "${name}" already exists!` });
        }

        // Create and save new category
        const category = new Category({
            name,
            description: description || "No description provided",
            images
        });

        await category.save();

        res.status(201).json({ message: "Category created successfully!", data: category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


Categoryroute.patch('/:id',async(req,res)=>{
    try {
        const data = await Category.findByIdAndUpdate(req.params.id, req.body);
        if (!data) return res.send("No data found!");
        res.send(data);
    }
    catch (error) {
        res.send(error.message);
    } 
})

Categoryroute.delete('/:id',async(req,res)=>{
    try {
        const data = await Category.findByIdAndDelete(req.params.id);
        if (!data) return res.send("No data found!");
        res.send(data);
    }
    catch (error) {
        res.send(error.message);
    }
});

module.exports=Categoryroute;

