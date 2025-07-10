import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LoadingSpinner = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 dark:text-[#bcbcbc] text-lg font-medium">{t('loading')}</p>
    </div>
  );
};

export default LoadingSpinner; 