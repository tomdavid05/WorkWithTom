import { motion } from 'framer-motion';

const LogoIcon = ({ className = "w-10 h-10", animated = true }) => {
  const icon = (
    <div className={`relative ${className}`}>
      {/* Background Circle */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 rounded-2xl shadow-lg"></div>
      
      {/* Letter T - Enhanced Typography */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Main T letter */}
          <div className="text-white font-black text-4xl tracking-tight drop-shadow-lg transform scale-110">
            T
          </div>
          
          {/* Subtle inner shadow for depth */}
          <div className="absolute inset-0 text-white/20 font-black text-4xl tracking-tight transform scale-110 translate-x-0.5 translate-y-0.5">
            T
          </div>
          
          {/* Highlight effect */}
          <div className="absolute inset-0 text-white/40 font-black text-4xl tracking-tight transform scale-110 -translate-x-0.5 -translate-y-0.5">
            T
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-300 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      
      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-secondary-300 rounded-full flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.05, rotate: 5 }}
        className="relative"
      >
        {icon}
        {/* Floating sparkle */}
        <motion.div
          className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-1 bg-yellow-800 rounded-full"></div>
        </motion.div>
      </motion.div>
    );
  }

  return icon;
};

export default LogoIcon; 