const Task = require('../models/Task');
const asyncHandler = require('../middlewares/asyncHandler');
const auth = require('../middlewares/auth'); // Import your authentication middleware

// Function to create a new task
// Only a coach can create a task
exports.createTask = [
  auth, // Authentication middleware
  asyncHandler(async (req, res) => {
    if (req.user.type !== 'Coach') { // Authorization check
      return res.status(403).json({ msg: 'Not authorized to create a task' });
    }
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  }),
];

// Function to update a task
// Only the coach who created the task or the customer the task is assigned to can update the task
exports.updateTask = [
  auth, // Authentication middleware
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    if (req.user.id !== task.coach.toString() && req.user.id !== task.customer.toString()) { // Authorization check
      return res.status(403).json({ msg: 'Not authorized to update this task' });
    }
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  }),
];
// Function to delete a task
// Only the coach who created the task can delete the task
exports.deleteTask = [
    auth, // Authentication middleware
    asyncHandler(async (req, res) => {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
      if (req.user.id !== task.coach.toString()) { // Authorization check
        return res.status(403).json({ msg: 'Not authorized to delete this task' });
      }
      await task.remove();
      res.json({ msg: 'Task deleted' });
    }),
  ];
  
// Function to get a task by its ID
// Only the coach who created the task or the customer the task is assigned to can get the task
exports.getTaskById = [
  auth, // Authentication middleware
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    if (req.user.id !== task.coach.toString() && req.user.id !== task.customer.toString()) { // Authorization check
      return res.status(403).json({ msg: 'Not authorized to get this task' });
    }
    res.json(task);
  }),
];
// Function to get tasks by customer
// Only the customer themselves or a coach can get the tasks
exports.getTasksByCustomer = [
  auth, // Authentication middleware
  asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.customerId && req.user.type !== 'Coach') { // Authorization check
      return res.status(403).json({ msg: 'Not authorized to get these tasks' });
    }
    const tasks = await Task.find({ customer: req.params.customerId });
    res.json(tasks);
  }),
];
