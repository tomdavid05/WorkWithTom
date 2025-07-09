import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-4 rounded-3xl bg-white/10 dark:bg-[#282a36]/20 backdrop-blur-xl border border-white/20 dark:border-[#44475a]/50 hover:border-[#bd93f9]/50 dark:hover:border-[#bd93f9]/70 transition-all duration-700 ease-out transform hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-2xl"
      aria-label="Toggle theme"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#bd93f9]/10 via-[#ff79c6]/5 to-[#50fa7b]/10 dark:from-[#bd93f9]/20 dark:via-[#ff79c6]/10 dark:to-[#50fa7b]/15 opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#bd93f9]/30 to-[#ff79c6]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl scale-110 group-hover:scale-125" />
      
      {/* Icon container with glass effect */}
      <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-2xl bg-white/20 dark:bg-[#44475a]/30 backdrop-blur-sm border border-white/30 dark:border-[#44475a]/50">
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-[#f1fa8c] transition-all duration-700 group-hover:rotate-180 group-hover:scale-110 drop-shadow-lg" />
        ) : (
          <Moon className="w-5 h-5 text-[#bd93f9] transition-all duration-700 group-hover:-rotate-12 group-hover:scale-110 drop-shadow-lg" />
        )}
      </div>
      
      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#bd93f9]/40 to-[#ff79c6]/40 opacity-0 group-active:opacity-100 transition-opacity duration-300 scale-0 group-active:scale-100" />
      
      {/* Tooltip with improved styling */}
      <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-[#282a36]/90 dark:bg-[#1a1b26]/90 backdrop-blur-xl text-[#f8f8f2] text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap shadow-2xl border border-[#44475a]/30">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#282a36]/90 dark:bg-[#1a1b26]/90 rotate-45 border-l border-t border-[#44475a]/30" />
      </div>
    </button>
  );
};

export default ThemeToggle; 