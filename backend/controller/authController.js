const user = require("../db/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const signup = catchAsync(async (req, res, next) => {
    const body = req.body;

    const newUser = await user.create({
        username: body.username,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
    });

    if (!newUser) {
        return next(new AppError('Failed to create user', 400));
    };

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id
    });

    return res.status(201).json({
        status: 'success',
        message: 'Successfully user created',
        data: result,
    });
});

const login = (async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const result = await user.findOne({where: {email}});
    if(!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = generateToken({
        id: result.id
    });

    return res.json({
        status: 'Success',
        token,
    });
});

module.exports = {
    signup,
    login
};