import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';
import LogoIcon from './LogoIcon';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Header = ({ user, onLogout }) => {
  const { t } = useTranslation();
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
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 dark:from-[#bd93f9] dark:via-[#8be9fd] dark:to-[#50fa7b] bg-clip-text text-transparent drop-shadow-lg tracking-tight select-none" style={{letterSpacing: '-0.02em'}}>
                  {t('app_title')}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-[#6272a4] font-medium">{t('task_management')}</p>
            </div>
          </motion.div>
          {/* User Info */}
          <div className="flex items-center gap-4">
            <LanguageSelector />
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
              <span className="hidden sm:inline">{t('logout')}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 