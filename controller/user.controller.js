const User = require('../model/user.model');
const bcrypt = require('bcrypt');

const CreateUser = async (req, res) => {
    let user = new User(req.body);

    try {
        user.password = await bcrypt.hash(req.body.password, 8);
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }
        const token = await user.generateAuthToken();
        res.status(200).send({ user });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

const Logout = async (req, res) => {
    try {
        req.user.token = null;
        await req.user.save();
        res.status(200).send('Logout successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    CreateUser,
    Login,
    Logout,
};