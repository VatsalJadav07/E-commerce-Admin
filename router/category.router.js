const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { createCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById } = require('../controller/category.controller');

// Create a category
router.post('/', auth, createCategory);

// Update a category
router.patch('/:id', auth, updateCategory);

// Delete a category
router.delete('/:id', auth, deleteCategory);

// Get all categories
router.get('/', auth, getAllCategories);

// Get a specific category
router.get('/:id', auth, getCategoryById);

module.exports = router;