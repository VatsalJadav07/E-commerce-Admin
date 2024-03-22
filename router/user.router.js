const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth')
const { Login, Logout, CreateUser } = require('../controller/user.controller');

// User
router.post('/', CreateUser);

// Login User
router.post('/login', Login, Login);

// Logout User
router.post('/logout', auth, Logout);

module.exports = router