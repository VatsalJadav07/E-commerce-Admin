const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token || !token.startsWith('Bearer ')) {
            throw new Error('User not found');
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), 'your-secret-key');
        const user = await User.findById(decoded._id);

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user; 
        req.role = user.role; 
        req.token = token.replace('Bearer ', '');

        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = { auth };