const task = require("../db/models/task");
const catchAsync = require("../utils/catchAsync");

const createTask = catchAsync(async (req, res, next) => {
    const body = req.body;
    const userId = req.user.id;

    const newTask = await task.create({
        title: body.title,
        description: body.description,
        createdBy: userId,
    });

    return res.status(201).json({
        status: 'success',
        message: 'Successfully task created',
        data: newTask,
    });
});

module.exports = {createTask};