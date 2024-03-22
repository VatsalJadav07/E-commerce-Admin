const express = require('express');
const { mongoDB } = require('./DB/database')
const userRoutes = require("./router/user.router")
const productRoutes = require("./router/product.router")
const cartRoutes = require("./router/cart.router")
const categoryRoutes = require("./router/category.router")
const orderRoutes = require("./router/order.router")

const app = express();

const port = 3000;

// mongodb connect
mongoDB()
app.use(express.json())

// Creat user
app.use('/user', userRoutes);

// Define a category route
app.use('/category', categoryRoutes);

// Define a product route
app.use('/product', productRoutes);

// Define a cart route
app.use('/cart', cartRoutes);

// Define a order route
app.use('/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});