const user = require("../db/models/user");
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const signup = async (req, res, next) => {
    const body = req.body;

    const newUser = await user.create({
        username: body.username,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
    });

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id
    })

    if (!result) {
        return res.status(400).json({
            status: 'fail',
            message: 'Failed to create user'
        });
    }

    return res.status(201).json({
        status: 'success',
        message: 'Successfully user created',
        data: result,
    });
};

module.exports = {
    signup
};