const Category = require("../models/Category");
//const Product = require("../models/Product");

const getAllCategories = async (req, res) => {
  try {
      const categories = await Category.find(); // Fetch all categories
      res.status(200).json(categories);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

const getCategoryById = async (req, res) => {
  const data = await Category.findById(req.params.id);
  if (!data) return res.status(404).send("Category not found");
  res.send(data);
};

const createCategory = async (req, res) => {
  const data = await Category.create(req.body);
  res.send(data);
}

const updateCategoryById = async (req, res) => {
  const data = await Category.findByIdAndUpdate(req.params.id, req.body);   
  data.categoryName = req.body.categoryName
  data.productID = req.body.productID
  data.categoryDescription = req.body.categoryDescription
  data.image = req.body.image
  data.isActive = req.body.isActive
  data.save()
  res.send(data);
};

const deleteCategoryById = async (req, res) => {
  const data = await Category.findByIdAndDelete(req.params.id);
  if (!data) return res.status(404).send("Category not found");
  res.send(data);
};

module.exports = { 
  getAllCategories, 
  getCategoryById, 
  createCategory, 
  updateCategoryById, 
  deleteCategoryById 
};