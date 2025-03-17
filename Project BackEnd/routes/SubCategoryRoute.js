const express = require('express');
const { getAllSubCategories, getSubCategoryById, createSubCategory, updateSubCategoryById, deleteSubCategoryById } = require('../controller/SubCategoryController');
const router = express.Router();

router.get('/', getAllSubCategories)

router.get('/:id', getSubCategoryById)

router.post('/', createSubCategory)

router.patch('/:id', updateSubCategoryById)

router.delete('/:id', deleteSubCategoryById)

module.exports = router;