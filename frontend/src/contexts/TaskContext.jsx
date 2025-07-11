import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Đảm bảo axios luôn có Authorization header nếu có token trong localStorage
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data.data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await axios.post('/tasks', taskData);
      const newTask = response.data.data.task;
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task created successfully!');
      return { success: true, task: newTask };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`/tasks/${id}`, taskData);
      const updatedTask = response.data.data.task;
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      toast.success('Task updated successfully!');
      return { success: true, task: updatedTask };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
      return { success: false, message };
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
      return { success: false, message };
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await axios.patch(`/tasks/${id}/toggle`);
      const updatedTask = response.data.data.task;
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      
      // Enhanced feedback for energy bar
      if (updatedTask.completed) {
        toast.success('Task completed! ⚡ Energy increased!', {
          icon: '⚡',
          duration: 3000,
        });
      } else {
        toast.success('Task uncompleted!', {
          duration: 2000,
        });
      }
      
      return { success: true, task: updatedTask };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to toggle task';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  // Get task statistics
  const taskStats = {
    total: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100) : 0
  };

  const value = {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    filter,
    taskStats,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}; 