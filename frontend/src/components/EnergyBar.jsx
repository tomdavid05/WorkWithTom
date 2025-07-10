import { motion } from 'framer-motion';
import { Zap, Battery, BatteryCharging } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EnergyBar = ({ completed, total, maxEnergy = 100 }) => {
  const { t } = useTranslation();
  // Tính toán energy dựa trên completion rate
  const energyPercentage = total > 0 ? (completed / total) * maxEnergy : 0;
  const clampedEnergy = Math.min(energyPercentage, maxEnergy);
  
  // Xác định level và màu sắc
  const getEnergyLevel = (energy) => {
    if (energy >= 80) return { level: t('high'), color: 'from-green-400 to-green-600 dark:from-green-500 dark:to-green-700', icon: BatteryCharging };
    if (energy >= 50) return { level: t('medium'), color: 'from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700', icon: Battery };
    if (energy >= 20) return { level: t('low'), color: 'from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700', icon: Battery };
    return { level: t('empty'), color: 'from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-600', icon: Battery };
  };

  const energyLevel = getEnergyLevel(clampedEnergy);

  return (
    <motion.div
      className="card border-l-4 border-green-200 bg-green-50 dark:border-[#44475a] dark:bg-[#282a36]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-[#bcbcbc] mb-1">{t('energy_level')}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-[#f8f8f2]">{energyLevel.level}</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-[#44475a] flex items-center justify-center">
          <energyLevel.icon className="w-6 h-6 text-green-600 dark:text-[#50fa7b]" />
        </div>
      </div>

      {/* Energy Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-[#bcbcbc]">{t('progress')}</span>
          <span className="font-semibold text-gray-900 dark:text-[#f8f8f2]">
            {completed}/{total} {t('tasks_completed')}
          </span>
        </div>
        
        {/* Main Energy Bar */}
        <div className="relative">
          <div className="w-full h-4 bg-gray-200 dark:bg-[#44475a] rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${energyLevel.color} relative`}
              initial={{ width: 0 }}
              animate={{ width: `${clampedEnergy}%` }}
              transition={{ 
                duration: 1, 
                ease: "easeOut",
                delay: 0.2 
              }}
            >
              {/* Energy particles effect */}
              {clampedEnergy > 0 && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white dark:bg-[#f8f8f2] rounded-full opacity-70"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                      animate={{
                        y: [-2, 2, -2],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Energy boost message */}
        {clampedEnergy > 0 && (
          <motion.div
            className="flex items-center gap-2 text-sm text-green-600 dark:text-[#50fa7b]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Zap className="w-4 h-4" />
            <span>
              {clampedEnergy >= 80 
                ? t('amazing_energy')
                : clampedEnergy >= 50 
                ? t('good_progress')
                : clampedEnergy >= 20 
                ? t('keep_going')
                : t('start_completing')
              }
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EnergyBar; 