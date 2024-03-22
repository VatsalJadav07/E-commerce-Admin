const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        loewercase: true,
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: [{
        type: String,
        enum: ['admin', 'user'],
    }],
});

userSchema.methods.generateAuthToken = function (role) {
    const user = this;
    const token = jwt.sign({ _id: user._id, username: user.username }, 'your-secret-key');

    user.token = token;
    user.save();
    return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;