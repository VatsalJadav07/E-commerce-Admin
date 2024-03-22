const Order = require("../model/order.model")
const Cart = require("../model/cart.model")

const createOrder = async (req, res) => {
    try {
        const itemDetail = await Cart.findById(req.body.cart);
        if (!itemDetail) return res.status(404).send("cart not found!");
        const order = new Order({
            ...req.body,
            owner: req.user._id,
            items: [...itemDetail.items],
            totalPrice: itemDetail.bill,
        })
        await order.save();
        res.status(200).send(order);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
};

const getOrders = async (req, res) => {
    const owner = req.user._id;

    try {
        const orders = await Order.find({ owner }).sort({ createdAt: -1 });
        if (orders) {
            res.status(200).send(orders);
        } else {
            res.status(404).send('No orders found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    createOrder,
    getOrders,
};