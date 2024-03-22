const Product = require('../model/product.model');
const Category = require('../model/category.model');

const createProduct = async (req, res) => {
    try {
        const { name, description, price, available, categoryId } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const product = new Product({
            name,
            description,
            price,
            available,
            categoryId
        });

        await product.save();
        category.products.push(product);

        await category.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
};
