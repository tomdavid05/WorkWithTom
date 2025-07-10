import { motion } from 'framer-motion';
import { Clock, Target, TrendingUp } from 'lucide-react';
import EnergyBar from './EnergyBar';
import { useTranslation } from 'react-i18next';

const TaskStats = ({ stats }) => {
  const { t } = useTranslation();
  const statCards = [
    {
      title: t('total_tasks'),
      value: stats.total,
      icon: Target,
      color: 'text-blue-600 dark:text-[#8be9fd]',
      iconBg: 'bg-blue-100 dark:bg-[#35365c]',
      borderColor: 'border-blue-200 dark:border-[#8be9fd]/30'
    },
    {
      title: t('active_tasks'),
      value: stats.active,
      icon: Clock,
      color: 'text-yellow-600 dark:text-[#ffb86c]',
      iconBg: 'bg-yellow-100 dark:bg-[#35365c]',
      borderColor: 'border-yellow-200 dark:border-[#ffb86c]/30'
    },
    {
      title: t('completion_rate'),
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-[#bd93f9]',
      iconBg: 'bg-purple-100 dark:bg-[#35365c]',
      borderColor: 'border-purple-200 dark:border-[#bd93f9]/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Stat cards */}
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          className={`card border ${stat.borderColor} bg-white/80 dark:bg-[#282a36] shadow-xl flex flex-col items-center py-8 px-4 transition-all duration-300`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(80,34,180,0.15)' }}
        >
          <div className={`flex flex-col items-center gap-3 w-full`}>
            <div className={`rounded-full ${stat.iconBg} flex items-center justify-center mb-2`} style={{ width: 48, height: 48 }}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div className="flex flex-col items-center w-full">
              <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-[#f8f8f2] leading-tight mb-1">{stat.value}</span>
              <span className="text-base sm:text-lg font-semibold text-gray-700 dark:text-[#bd93f9] text-center tracking-wide">{stat.title}</span>
            </div>
          </div>
        </motion.div>
      ))}
      {/* Energy Bar */}
      <EnergyBar completed={stats.completed} total={stats.total} />
    </div>
  );
};

export default TaskStats; 