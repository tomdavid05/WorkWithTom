import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../contexts/TaskContext';
import { X, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TaskForm = ({ onClose, onSuccess }) => {
  const { t } = useTranslation();
  const { createTask } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert(t('please_enter_task_title'));
      return;
    }

    setLoading(true);
    const result = await createTask(formData);
    setLoading(false);

    if (result.success) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        due_date: ''
      });
      onSuccess();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-[#282a36] rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#44475a]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-[#f8f8f2]">{t('add_new_task')}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-[#f8f8f2] hover:bg-gray-100 dark:hover:bg-[#44475a] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
                {t('task_title')} *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder={t('what_to_do')}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
                {t('description')}
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field resize-none"
                rows="4"
                placeholder={t('add_task_details')}
              />
            </div>

            {/* Priority and Due Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
                  {t('priority')}
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="low">{t('low')}</option>
                  <option value="medium">{t('medium')}</option>
                  <option value="high">{t('high')}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
                  {t('due_date')}
                </label>
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            {/* Priority Preview */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#44475a]">
              <h4 className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">{t('priority_preview')}</h4>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                  formData.priority === 'high' ? 'text-red-600 bg-red-50 border-red-200 dark:text-[#ff5555] dark:bg-[#44475a] dark:border-[#ff5555]/30' :
                  formData.priority === 'medium' ? 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-[#ffb86c] dark:bg-[#44475a] dark:border-[#ffb86c]/30' :
                  'text-green-600 bg-green-50 border-green-200 dark:text-[#50fa7b] dark:bg-[#44475a] dark:border-[#50fa7b]/30'
                }`}>
                  {formData.priority === 'high' ? `🔴 ${t('high')}` :
                   formData.priority === 'medium' ? `🟡 ${t('medium')}` :
                   `🟢 ${t('low')}`}
                </span>
                <span className="text-xs text-gray-500 dark:text-[#6272a4]">
                  {formData.priority === 'high' ? t('urgent_important') :
                   formData.priority === 'medium' ? t('important_not_urgent') :
                   t('not_urgent_can_wait')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    {t('create_task')}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskForm; 