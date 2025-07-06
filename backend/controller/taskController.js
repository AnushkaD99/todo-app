const task = require("../db/models/task");
const user = require("../db/models/user");
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

const getTaskByUserId = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const result = await task.findAll({
        include: user,
        where: {createdBy: userId},
    });

    return res.json({
        status: 'success',
        data: result,
    })
})

module.exports = {createTask, getTaskByUserId};