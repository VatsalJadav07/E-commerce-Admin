const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cart'
    }],
    items: [{
        type: Object,
        required: true
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order