const express = require('express');
const { getAllCategories, getCategoryById, createCategory, updateCategoryById, deleteCategoryById } = require('../controller/CategoryController');
const router = express.Router();

router.get('/', getAllCategories)

router.get('/:id', getCategoryById)

router.post('/add', createCategory)

router.patch('/:id', updateCategoryById)

router.delete('/:id', deleteCategoryById)

module.exports = router;