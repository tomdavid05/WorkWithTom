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

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, taskStats, filter, setFilter, fetchTasks } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-secondary-50">
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
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-gray-700">Welcome back!</span>
            </motion.div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Hello, {user?.username}! 👋
            </h1>
            <p className="text-gray-600 text-xl">
              Ready to conquer your goals today? 🚀
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
              <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl border border-white/20 p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <Target className="w-8 h-8 text-primary-500" />
                      Your Tasks
                    </h2>
                    <p className="text-gray-600 text-lg">
                      {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 hover:border-primary-300 transition-all duration-300 placeholder-gray-400"
                      />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex items-center gap-1 bg-white/50 backdrop-blur-sm rounded-xl p-1 border border-white/20">
                      <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          filter === 'all' 
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilter('active')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          filter === 'active' 
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => setFilter('completed')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          filter === 'completed' 
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                        }`}
                      >
                        Done
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
              <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl border border-white/20 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Plus className="w-6 h-6 text-primary-500" />
                  Quick Add Task
                </h3>
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Plus className="w-5 h-5" />
                  Add New Task
                </button>
              </div>

              {/* Quick Actions */}
              <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl border border-white/20 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-accent-500" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setFilter('active')}
                    className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">View Active Tasks</span>
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-accent-300 hover:bg-accent-50/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">View Completed</span>
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className="backdrop-blur-xl bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl shadow-2xl border border-white/20 p-6 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Pro Tips
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-300">•</span>
                    <span>Use priority levels to organize important tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-300">•</span>
                    <span>Set due dates to stay on track</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-300">•</span>
                    <span>Break large tasks into smaller ones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-300">•</span>
                    <span>Review completed tasks regularly</span>
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