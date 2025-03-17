const Product = require('../models/Product');

const getAllProducts = async (req, res, next) => {
    try {
        const data = await Product.find();
        res.send(data);
    } catch (error) {
        next(error);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const data = await Product.findById(req.params.id);
        if (!data) return res.status(404).send("Product not found");
        res.send(data);
    } catch (error) {
        next(error);
    }
}

const createProduct = async (req, res, next) => {
    try {
        const data = await Product.create(req.body);
        res.send(data);
    } catch (error) {
        next(error);
    }
}

const updateProductById = async (req, res, next) => {
    try {
        const data = await Product.findByIdAndUpdate(req.params.id, req.body);
        if (!data) return res.status(404).send("Product not found");
        res.send(data);
        
    } catch (error) {
        next(error);
    }
}

const deleteProductById = async (req, res, next) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).send("Product not found");
        res.send(data);
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById };