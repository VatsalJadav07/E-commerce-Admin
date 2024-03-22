const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } = require('../controller/product.controller');

// Create a product
router.post('/', auth, createProduct);

// Update a product
router.patch('/:id', auth, updateProduct);

// Delete a product
router.delete('/:id', auth, deleteProduct);

// Get all products
router.get('/', auth, getAllProducts);

// Get a specific product
router.get('/:id', auth, getProductById);

module.exports = router;