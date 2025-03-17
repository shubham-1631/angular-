const express = require('express');
const { getProductById, getAllProducts, createProduct, updateProductById, deleteProductById } = require('../controller/ProductController');
var jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/add', createProduct)

router.patch('/:id', updateProductById)

router.delete('/:id', deleteProductById)

module.exports = router;

// {
//     "ProductID" : 101,
//     "ProductName":"Samsung S24 Ultra",
//     "ProductDescription": "Samsung Galaxy S24 Ultra 5G AI Smartphone ",
//     "ProductPrice": 99999,
//     "ProductStockAvailability":true,
//     "ProductMaterial":"(Titanium Gray, 12GB, 256GB Storage)",
//     "ProductColor":"Gray",
//     "ProductDimension" : "0.9 x 7.9 x 16.2 cm; 232 g",
//     "ProductWeight" : "232g"
//    }