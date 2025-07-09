const { sql } = require('../db');

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const result = await sql.query`
      SELECT id, title, description, completed, priority, due_date, created_at, updated_at
      FROM tasks 
      WHERE user_id = ${req.user.id}
      ORDER BY created_at DESC
    `;

    res.json({
      success: true,
      data: {
        tasks: result.recordset
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const result = await sql.query`
      INSERT INTO tasks (user_id, title, description, priority, due_date)
      OUTPUT INSERTED.id, INSERTED.title, INSERTED.description, INSERTED.completed, 
             INSERTED.priority, INSERTED.due_date, INSERTED.created_at, INSERTED.updated_at
      VALUES (${req.user.id}, ${title}, ${description || null}, ${priority || 'medium'}, ${due_date || null})
    `;

    const task = result.recordset[0];

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: {
        task
      }
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, priority, due_date } = req.body;

    // Check if task exists and belongs to user
    const existingTask = await sql.query`
      SELECT id FROM tasks WHERE id = ${id} AND user_id = ${req.user.id}
    `;

    if (existingTask.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const result = await sql.query`
      UPDATE tasks 
      SET title = ${title}, 
          description = ${description || null}, 
          completed = ${completed}, 
          priority = ${priority || 'medium'}, 
          due_date = ${due_date || null},
          updated_at = GETDATE()
      OUTPUT INSERTED.id, INSERTED.title, INSERTED.description, INSERTED.completed, 
             INSERTED.priority, INSERTED.due_date, INSERTED.created_at, INSERTED.updated_at
      WHERE id = ${id} AND user_id = ${req.user.id}
    `;

    const task = result.recordset[0];

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: {
        task
      }
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if task exists and belongs to user
    const existingTask = await sql.query`
      SELECT id FROM tasks WHERE id = ${id} AND user_id = ${req.user.id}
    `;

    if (existingTask.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await sql.query`
      DELETE FROM tasks WHERE id = ${id} AND user_id = ${req.user.id}
    `;

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Toggle task completion
const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if task exists and belongs to user
    const existingTask = await sql.query`
      SELECT id, completed FROM tasks WHERE id = ${id} AND user_id = ${req.user.id}
    `;

    if (existingTask.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const currentCompleted = existingTask.recordset[0].completed;
    const newCompleted = !currentCompleted;

    const result = await sql.query`
      UPDATE tasks 
      SET completed = ${newCompleted}, updated_at = GETDATE()
      OUTPUT INSERTED.id, INSERTED.title, INSERTED.description, INSERTED.completed, 
             INSERTED.priority, INSERTED.due_date, INSERTED.created_at, INSERTED.updated_at
      WHERE id = ${id} AND user_id = ${req.user.id}
    `;

    const task = result.recordset[0];

    res.json({
      success: true,
      message: `Task ${newCompleted ? 'completed' : 'uncompleted'} successfully`,
      data: {
        task
      }
    });
  } catch (error) {
    console.error('Toggle task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask
}; 