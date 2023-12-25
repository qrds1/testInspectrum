const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.use(authMiddleware.verifyToken);

router.get('/users', userController.users);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);

router.get('/tasks/:id', taskController.getTask);
router.put('/tasks/:id', taskController.updateTask);
router.post('/tasks/:id', taskController.changeTaskStatus);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;