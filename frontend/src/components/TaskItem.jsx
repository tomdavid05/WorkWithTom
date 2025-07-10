import { useState, useEffect } from 'react';
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
  Check,
  Timer
} from 'lucide-react';
import { format, differenceInHours, differenceInDays } from 'date-fns';
import { useTranslation } from 'react-i18next';

// Component để hiển thị countdown timer
const CountdownTimer = ({ dueDate, isOverdue }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const due = new Date(dueDate);
      const diff = due - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setTimeLeft({ days, hours });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000 * 60); // Update every minute

    return () => clearInterval(timer);
  }, [dueDate]);

  if (isOverdue) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-[#ff5555] font-medium">
        <AlertTriangle className="w-3 h-3" />
        {t('overdue')}
      </span>
    );
  }

  if (timeLeft.days === 0 && timeLeft.hours === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-orange-600 dark:text-[#ffb86c] font-medium">
        <Timer className="w-3 h-3" />
        {t('due_now')}
      </span>
    );
  }

  const getTimeColor = () => {
    if (timeLeft.days === 0 && timeLeft.hours <= 24) {
      return 'text-red-600 dark:text-[#ff5555]';
    } else if (timeLeft.days <= 3) {
      return 'text-orange-600 dark:text-[#ffb86c]';
    } else {
      return 'text-blue-600 dark:text-[#8be9fd]';
    }
  };

  const formatTimeLeft = () => {
    if (timeLeft.days > 0) {
      return `${timeLeft.days}ng ${timeLeft.hours}g`;
    } else {
      return `${timeLeft.hours}g`;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${getTimeColor()}`}>
      <Timer className="w-3 h-3" />
      {t('time_left', { time: formatTimeLeft() })}
    </span>
  );
};

const TaskItem = ({ task }) => {
  const { toggleTask, deleteTask, updateTask } = useTasks();
  const { t } = useTranslation();
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
    if (window.confirm(t('confirm_delete_task'))) {
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
        return 'text-red-600 bg-red-50 border-red-200 dark:text-[#ff5555] dark:bg-[#44475a] dark:border-[#ff5555]/30';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-[#ffb86c] dark:bg-[#44475a] dark:border-[#ffb86c]/30';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200 dark:text-[#50fa7b] dark:bg-[#44475a] dark:border-[#50fa7b]/30';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-[#bcbcbc] dark:bg-[#44475a] dark:border-[#44475a]';
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

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return t('high');
      case 'medium':
        return t('medium');
      case 'low':
        return t('low');
      default:
        return priority;
    }
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;

  return (
    <motion.div
      className={`task-item card ${task.completed ? 'task-completed opacity-60' : ''}`}
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
            placeholder={t('task_title')}
          />
          
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="input-field resize-none"
            rows="3"
            placeholder={t('task_description_optional')}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-[#e3e6f3]">{t('priority')}</label>
              <select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                className="input-field"
              >
                <option value="low">{t('low')}</option>
                <option value="medium">{t('medium')}</option>
                <option value="high">{t('high')}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-[#e3e6f3]">Hạn hoàn thành</label>
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
              Lưu
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn-secondary flex-1"
            >
              Hủy
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
                <h3 className={`font-medium text-gray-900 dark:text-[#e3e6f3] ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm text-gray-600 dark:text-[#7f7a9e] mt-1 ${task.completed ? 'line-through' : ''}`}>
                    {task.description}
                  </p>
                )}
                
                {/* Task Meta */}
                <div className="flex items-center gap-4 mt-3">
                  {/* Priority */}
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {getPriorityIcon(task.priority)}
                    {getPriorityLabel(task.priority)}
                  </span>
                  
                  {/* Due Date */}
                  {task.due_date && (
                    <span className={`inline-flex items-center gap-1 text-xs ${isOverdue ? 'text-red-600 dark:text-[#ff5555]' : 'text-gray-500 dark:text-[#7f7a9e]'}`}>
                      <Calendar className="w-3 h-3" />
                      {format(new Date(task.due_date), 'dd/MM/yyyy')}
                    </span>
                  )}
                  
                  {/* Countdown Timer */}
                  {task.due_date && !task.completed && (
                    <CountdownTimer dueDate={task.due_date} isOverdue={isOverdue} />
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-[#35365c] rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-[#35365c] rounded-lg transition-colors"
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