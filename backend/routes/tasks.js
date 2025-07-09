const express = require('express');
const { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  toggleTask 
} = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

// Get all tasks
router.get('/', getTasks);

// Create a new task
router.post('/', createTask);

// Update a task
router.put('/:id', updateTask);

// Delete a task
router.delete('/:id', deleteTask);

// Toggle task completion
router.patch('/:id/toggle', toggleTask);

module.exports = router; 