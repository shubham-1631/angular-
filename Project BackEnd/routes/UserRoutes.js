const express = require('express');
const User = require('../models/User');
const router = express.Router();
var jwt = require('jsonwebtoken');
const { getAllUsers, getUserById, userValidation, createUser, updateUserById, deleteUserById } = require('../controller/UserController');

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.post('/add', createUser)

router.patch('/:id', updateUserById)

router.delete('/:id', deleteUserById)

router.post('/login', userValidation)

module.exports = router;