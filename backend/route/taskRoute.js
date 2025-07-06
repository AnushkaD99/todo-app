const { authentication } = require('../controller/authController');
const { createTask } = require('../controller/taskController');

const router = require('express').Router();

router.route('/').post(authentication, createTask);

module.exports = router;