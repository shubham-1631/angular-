const express = require('express');
const { getAllOrder, getOrderDetailById, createOrder, updateOrder, deleteOrder, userValidation } = require('../controller/OrderController');
const router = express.Router();

router.get('/', getAllOrder);

router.get('/:id', getOrderDetailById);

router.post('/', createOrder);

router.patch('/:id', updateOrder)

router.delete('/:id', deleteOrder);

router.post('/login', userValidation)

module.exports = router;