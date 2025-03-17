const SubCategory = require('../models/SubCategory');

const getAllSubCategories = async (req, res) => {
  const data = await SubCategory.find();
  res.send(data);
}

const getSubCategoryById = async (req, res) => {
  const data = await SubCategory.findById(req.params.id);
  if (!data) return res.status(404).send("SubCategory not found");
  res.send(data);
}

const createSubCategory = async (req, res) => {
  const data = await SubCategory.create(req.body);
  res.send(data);
}

const updateSubCategoryById = async (req, res) => {
  const data = await SubCategory.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
    // data.SubCategoryName = req.body.SubCategoryName
    // data.SubCategoryDescription = req.body.SubCategoryDescription
    // data.Image = req.body.Image
    // data.CategoryID = req.body.CategoryID
    // data.save()
}

const deleteSubCategoryById = async (req, res) => {
    const data = await SubCategory.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).send("SubCategory not found");
    res.send(data);
}

module.exports = { getAllSubCategories, getSubCategoryById, createSubCategory, updateSubCategoryById, deleteSubCategoryById };