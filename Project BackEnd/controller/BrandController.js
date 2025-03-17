const Brand = require('../models/Brand');

const getAllBrands = async (req, res) => {
    const data = await Brand.find();
    res.send(data);
}

const getBrandById = async (req, res) => {
    const data = await Brand.findById(req.params.id);
    if (!data) return res.status(404).send("Brand not found");
    res.send(data);
}

const createBrand = async (req, res) => {
    const data = await Brand.create(req.body);
    res.send(data);
}

const updateBrandById = async (req, res) => {
    const data = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).send("Brand not found");
    res.send(data);
}

const deleteBrandById = async (req, res) => {
    const data = await Brand.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).send("Brand not found");
    res.send(data);
}

module.exports = { getAllBrands, getBrandById, createBrand, updateBrandById, deleteBrandById };