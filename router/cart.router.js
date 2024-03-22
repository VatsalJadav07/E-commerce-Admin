const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const { addCart, showAllCart, deleteCartItem, } = require('..//controller/cart.controller');

// Add Cart
router.post("/", auth, addCart);

// Show All Cart
router.get("/", auth, showAllCart);

// Delete Cart Item
router.delete("/:itemId", auth, deleteCartItem);

module.exports = router;