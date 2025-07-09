import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTasks } from '../contexts/TaskContext';
import { 
  CheckCircle, 
  Circle, 
  Edit, 
  Trash2, 
  Calendar,
  AlertTriangle,
  Clock,
  Check
} from 'lucide-react';
import { format } from 'date-fns';

const TaskItem = ({ task }) => {
  const { toggleTask, deleteTask, updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    due_date: task.due_date ? format(new Date(task.due_date), 'yyyy-MM-dd') : ''
  });

  const handleToggle = async () => {
    await toggleTask(task.id);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
    }
  };

  const handleEdit = async () => {
    if (editData.title.trim()) {
      await updateTask(task.id, editData);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      due_date: task.due_date ? format(new Date(task.due_date), 'yyyy-MM-dd') : ''
    });
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'low':
        return <Check className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;

  return (
    <motion.div
      className={`task-item ${task.completed ? 'task-completed' : ''} ${getPriorityColor(task.priority).split(' ')[0]}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="input-field font-medium"
            placeholder="Task title"
          />
          
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="input-field resize-none"
            rows="3"
            placeholder="Task description (optional)"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                className="input-field"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={editData.due_date}
                onChange={(e) => setEditData({ ...editData, due_date: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="btn-primary flex-1"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4">
          {/* Toggle Button */}
          <button
            onClick={handleToggle}
            className="mt-1 text-gray-400 hover:text-primary-600 transition-colors"
          >
            {task.completed ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm text-gray-600 mt-1 ${task.completed ? 'line-through' : ''}`}>
                    {task.description}
                  </p>
                )}
                
                {/* Task Meta */}
                <div className="flex items-center gap-4 mt-3">
                  {/* Priority */}
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {getPriorityIcon(task.priority)}
                    {task.priority}
                  </span>
                  
                  {/* Due Date */}
                  {task.due_date && (
                    <span className={`inline-flex items-center gap-1 text-xs ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                      <Calendar className="w-3 h-3" />
                      {format(new Date(task.due_date), 'MMM dd, yyyy')}
                      {isOverdue && <span className="text-red-600 font-medium"> (Overdue)</span>}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskItem; 