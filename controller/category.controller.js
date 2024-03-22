const Category = require('../model/category.model');

const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = new Category({ name });
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
        if (!category) {
            return res.status(404).send('Category not found');
        }
        res.send(category);
    } catch (e) {
        res.status(400).send(e);
    }
};

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        res.send(category);
    } catch (e) {
        res.status(400).send(e);
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        res.json(category);
    } catch (e) {
        res.status(400).send(e);
    }
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
};
