import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';
import LogoIcon from './LogoIcon';

const Header = ({ user, onLogout }) => {
  return (
    <motion.header
      className="backdrop-blur-xl bg-white/80 shadow-2xl border-b border-white/20 relative z-20"
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
              <p className="text-sm text-gray-600 font-medium">Task Management</p>
            </div>
          </motion.div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <motion.div 
              className="hidden sm:flex items-center gap-4 text-right"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <p className="text-sm font-semibold text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
            </motion.div>
            
            <motion.button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 bg-white/50 backdrop-blur-sm hover:bg-white/80 rounded-xl border border-white/20 transition-all duration-300"
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