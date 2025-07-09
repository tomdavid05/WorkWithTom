import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';
import LogoIcon from './LogoIcon';
import ThemeToggle from './ThemeToggle';

const Header = ({ user, onLogout }) => {
  return (
    <motion.header
      className="backdrop-blur-xl bg-white/80 dark:bg-[#44475a] shadow-2xl border-b border-white/20 dark:border-[#6272a4] relative z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <LogoIcon className="w-12 h-12" animated={false} />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Let's Do It!
              </h1>
              <p className="text-sm text-gray-600 dark:text-[#6272a4] font-medium">Task Management</p>
            </div>
          </motion.div>
          {/* User Info */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <motion.div 
              className="hidden sm:flex items-center gap-4 text-right"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white/50 dark:bg-[#44475a] backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 dark:border-[#6272a4]">
                <p className="text-sm font-semibold text-gray-900 dark:text-[#f8f8f2]">{user?.username}</p>
                <p className="text-xs text-gray-600 dark:text-[#6272a4]">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
            </motion.div>
            <motion.button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-[#f8f8f2] hover:text-gray-900 dark:hover:text-[#f8f8f2] bg-white/50 dark:bg-[#44475a] backdrop-blur-sm hover:bg-white/80 dark:hover:bg-[#4a4c5a] rounded-xl border border-white/20 dark:border-[#6272a4] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 