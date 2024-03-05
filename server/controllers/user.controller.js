const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler.utils');
const { default: generateToken } = require('../utils/generateToken');
exports.signup = asyncHandler(async (req, res) => {

    const email = User.findOne({ email: req.body.email });
    if (email) throw new Error('user already exist!');

    const user = await User.create(res.body);

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

exports.signin = asyncHandler(async (req, res) => {

    const user = await User.findOne({ email: res.body.email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};