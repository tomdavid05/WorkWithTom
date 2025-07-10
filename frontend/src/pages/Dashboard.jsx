import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskStats from '../components/TaskStats';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { Plus, Filter, CheckCircle, Clock, List, Search, Sparkles, Target, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, taskStats, filter, setFilter, fetchTasks } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-secondary-50 dark:bg-[#282a36]">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-300/15 to-secondary-300/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-300/10 to-primary-300/10 rounded-full blur-3xl"></div>
      </div>
      <Header user={user} onLogout={logout} />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 card shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-[#e3e6f3]">{t('welcome_back')}</span>
            </motion.div>
            <h1 className="text-5xl font-bold gradient-text mb-4">
              {t('hello_user', { username: user?.username })} 👋
            </h1>
            <p className="text-gray-600 dark:text-[#7f7a9e] text-xl">
              {t('ready_to_conquer')}
            </p>
          </motion.div>
          {/* Stats Cards */}
          <motion.div variants={itemVariants}>
            <TaskStats stats={taskStats} />
          </motion.div>
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Task List */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="card p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-[#e3e6f3] mb-2 flex items-center gap-3">
                      <Target className="w-8 h-8 text-primary-500" />
                      {t('your_tasks')}
                    </h2>
                    <p className="text-gray-600 dark:text-[#7f7a9e] text-lg">
                      {t('found_tasks', { count: filteredTasks.length })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder={t('search_tasks')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field pl-12 pr-4 py-3"
                      />
                    </div>
                    {/* Filter Buttons */}
                    <div className="filter-tab">
                      <button
                        onClick={() => setFilter('all')}
                        className={`filter-btn ${filter === 'all' ? 'filter-btn-active' : ''}`}
                      >
                        {t('all')}
                      </button>
                      <button
                        onClick={() => setFilter('active')}
                        className={`filter-btn ${filter === 'active' ? 'filter-btn-active' : ''}`}
                      >
                        {t('in_progress')}
                      </button>
                      <button
                        onClick={() => setFilter('completed')}
                        className={`filter-btn ${filter === 'completed' ? 'filter-btn-active' : ''}`}
                      >
                        {t('completed')}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Task List */}
                <TaskList tasks={filteredTasks} />
              </div>
            </motion.div>
            {/* Sidebar */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Quick Add Task */}
              <div className="quick-action-card">
                <h3 className="text-xl font-bold text-gray-900 dark:text-[#e3e6f3] mb-4 flex items-center gap-2">
                  <Plus className="w-6 h-6 text-primary-500" />
                  {t('quick_add_task')}
                </h3>
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="w-full btn-primary py-4 px-6 flex items-center justify-center gap-3"
                >
                  <Plus className="w-5 h-5" />
                  {t('add_new_task')}
                </button>
              </div>
              {/* Quick Actions */}
              <div className="quick-action-card">
                <h3 className="text-xl font-bold text-gray-900 dark:text-[#e3e6f3] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-accent-500" />
                  {t('quick_actions')}
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setFilter('active')}
                    className="quick-action-btn group"
                  >
                    <div className="quick-action-icon">
                      <Clock className="w-5 h-5 text-yellow-400" />
                    </div>
                    <span className="text-sm font-semibold">{t('view_active_tasks')}</span>
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className="quick-action-btn group"
                  >
                    <div className="quick-action-icon">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-sm font-semibold">{t('view_completed')}</span>
                  </button>
                </div>
              </div>
              {/* Tips */}
              <div className="backdrop-blur-xl bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl shadow-2xl border border-white/20 p-6 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  {t('pro_tips')}
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-300">•</span>
                    <span>{t('tip_priority')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-300">•</span>
                    <span>{t('tip_deadline')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-300">•</span>
                    <span>{t('tip_split')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-300">•</span>
                    <span>{t('tip_review')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onSuccess={() => setShowTaskForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard; 