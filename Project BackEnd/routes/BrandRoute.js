const express = require('express');
const { getAllBrands, getBrandById, updateBrandById, deleteBrandById, createBrand } = require('../controller/BrandController');
const router = express.Router();

router.get('/', getAllBrands);

router.get('/:id', getBrandById);

router.post('/', createBrand);

router.patch('/:id', updateBrandById);

router.delete('/:id', deleteBrandById);

module.exports = router;