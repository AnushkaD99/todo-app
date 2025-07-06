const { authentication } = require('../controller/authController');
const { createTask, getTaskByUserId } = require('../controller/taskController');

const router = require('express').Router();

router.route('/').post(authentication, createTask);
router.route('/').get(authentication, getTaskByUserId);

module.exports = router;