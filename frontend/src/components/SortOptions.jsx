import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SortAsc, Clock, Star, Type } from 'lucide-react';
import { getSortOptionLabel, getSortOptionDescription } from '../utils/sortTasks';
import { useTranslation } from 'react-i18next';

const SortOptions = ({ onSortChange, currentSort }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { id: 'priority', label: t('sort_priority'), icon: Star, shortLabel: t('sort_priority'), description: t('sort_priority_desc') },
    { id: 'time', label: t('sort_due_date'), icon: Clock, shortLabel: t('sort_due_date'), description: t('sort_due_date_desc') },
    { id: 'name', label: t('sort_name'), icon: Type, shortLabel: t('sort_name'), description: t('sort_name_desc') },
  ];

  const currentOption = options.find(option => option.id === currentSort) || options[0];

  const handleOptionSelect = (optionId) => {
    onSortChange(optionId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Sort Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#282a36] border border-gray-200 dark:border-[#44475a] rounded-xl hover:border-primary-300 dark:hover:border-[#bd93f9] transition-all duration-300 shadow-sm hover:shadow-md"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <SortAsc className="w-5 h-5 text-gray-600 dark:text-[#bcbcbc]" />
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500 dark:text-[#6272a4]">Sắp xếp theo</span>
          <span className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2]">
            {currentOption.shortLabel}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-[#6272a4]" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#282a36] border border-gray-200 dark:border-[#44475a] rounded-xl shadow-lg z-50 overflow-hidden min-w-[280px]"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-2">
              {options.map((option) => {
                const IconComponent = option.icon;
                const isSelected = option.id === currentSort;
                
                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-[#44475a] transition-colors duration-200 ${
                      isSelected 
                        ? 'bg-primary-50 dark:bg-[#44475a] text-primary-600 dark:text-[#bd93f9]' 
                        : 'text-gray-700 dark:text-[#f8f8f2]'
                    }`}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent className={`w-5 h-5 ${
                      isSelected 
                        ? 'text-primary-500 dark:text-[#bd93f9]' 
                        : 'text-gray-500 dark:text-[#6272a4]'
                    }`} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-gray-500 dark:text-[#6272a4] mt-0.5">
                        {option.description}
                      </div>
                    </div>
                    {isSelected && (
                      <motion.div
                        className="w-2 h-2 bg-primary-500 dark:bg-[#bd93f9] rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SortOptions; 