const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
    },
    categoryId: { 
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Category'  
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;