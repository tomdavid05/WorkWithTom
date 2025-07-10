import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import SortOptions from './SortOptions';
import { ClipboardList } from 'lucide-react';
import { sortTasks } from '../utils/sortTasks';
import { useTranslation } from 'react-i18next';

const TaskList = ({ tasks }) => {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState('priority');

  // Sort tasks based on selected option
  const sortedTasks = useMemo(() => {
    return sortTasks(tasks, sortBy);
  }, [tasks, sortBy]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  if (tasks.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ClipboardList className="w-16 h-16 text-gray-300 dark:text-[#44475a] mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">{t('no_tasks_found')}</h3>
        <p className="text-gray-500 dark:text-[#bcbcbc]">{t('create_first_task')}</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sort Options */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">
            {t('tasks')} ({sortedTasks.length})
          </h3>
        </div>
        <SortOptions 
          onSortChange={handleSortChange} 
          currentSort={sortBy}
        />
      </motion.div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {sortedTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <TaskItem task={task} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList; 