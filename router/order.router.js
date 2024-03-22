const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const { createOrder, getOrders } = require('../controller/order.controller');

// Create an order
router.post('/', auth, createOrder);

// Get orders
router.get('/', auth, getOrders);

module.exports = router