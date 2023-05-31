const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.get('/customer/:customerId', taskController.getTasksByCustomer);
router.get('/:id', taskController.getTaskById); // New route to get a task by its ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
