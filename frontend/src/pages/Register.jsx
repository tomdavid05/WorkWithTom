import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import LogoIcon from '../components/LogoIcon';
import ThemeToggle from '../components/ThemeToggle';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert(t('passwords_do_not_match'));
      return;
    }

    if (formData.password.length < 6) {
      alert(t('password_min_length'));
      return;
    }

    setLoading(true);
    
    const { username, email, password } = formData;
    await register({ username, email, password });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-secondary-50 to-accent-50 dark:from-[#1a1b26] dark:via-[#282a36] dark:to-[#44475a] relative">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary-300/30 to-accent-300/30 dark:from-secondary-400/20 dark:to-accent-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary-300/20 to-secondary-300/20 dark:from-primary-400/10 dark:to-secondary-400/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LogoIcon className="w-20 h-20" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-secondary-600 to-accent-600 dark:from-[#f8f8f2] dark:via-[#bd93f9] dark:to-[#8be9fd] bg-clip-text text-transparent mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('register_title')}
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 dark:text-[#bcbcbc] text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('register_subtitle')}
          </motion.p>
        </div>

        {/* Register Form */}
        <motion.div
          className="backdrop-blur-xl bg-white/80 dark:bg-[#282a36]/80 rounded-3xl shadow-2xl border border-white/20 dark:border-[#44475a]/50 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 dark:text-[#f8f8f2] mb-3">
                {t('username')}
              </label>
              <div className="relative group">
                <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors z-20 ${
                  focusedField === 'username' ? 'text-secondary-500 dark:text-[#bd93f9]' : 'text-gray-400 dark:text-[#6272a4]'
                }`} />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-[#44475a]/50 border-2 border-gray-200 dark:border-[#44475a] rounded-xl focus:border-secondary-500 dark:focus:border-[#bd93f9] focus:ring-4 focus:ring-secondary-500/20 dark:focus:ring-[#bd93f9]/20 hover:border-secondary-300 dark:hover:border-[#bd93f9]/50 transition-all duration-300 placeholder-gray-400 dark:placeholder-[#6272a4] relative z-10 text-gray-900 dark:text-[#f8f8f2]"
                  placeholder={t('enter_your_username')}
                  required
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-[#f8f8f2] mb-3">
                {t('email_address')}
              </label>
              <div className="relative group">
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors z-20 ${
                  focusedField === 'email' ? 'text-secondary-500 dark:text-[#bd93f9]' : 'text-gray-400 dark:text-[#6272a4]'
                }`} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-[#44475a]/50 border-2 border-gray-200 dark:border-[#44475a] rounded-xl focus:border-secondary-500 dark:focus:border-[#bd93f9] focus:ring-4 focus:ring-secondary-500/20 dark:focus:ring-[#bd93f9]/20 hover:border-secondary-300 dark:hover:border-[#bd93f9]/50 transition-all duration-300 placeholder-gray-400 dark:placeholder-[#6272a4] relative z-10 text-gray-900 dark:text-[#f8f8f2]"
                  placeholder={t('enter_your_email')}
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-[#f8f8f2] mb-3">
                {t('password')}
              </label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors z-20 ${
                  focusedField === 'password' ? 'text-secondary-500 dark:text-[#bd93f9]' : 'text-gray-400 dark:text-[#6272a4]'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-12 pr-12 py-4 bg-white/50 dark:bg-[#44475a]/50 border-2 border-gray-200 dark:border-[#44475a] rounded-xl focus:border-secondary-500 dark:focus:border-[#bd93f9] focus:ring-4 focus:ring-secondary-500/20 dark:focus:ring-[#bd93f9]/20 hover:border-secondary-300 dark:hover:border-[#bd93f9]/50 transition-all duration-300 placeholder-gray-400 dark:placeholder-[#6272a4] relative z-10 text-gray-900 dark:text-[#f8f8f2]"
                  placeholder={t('enter_your_password')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-[#6272a4] hover:text-gray-600 dark:hover:text-[#f8f8f2] transition-colors z-20"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
            {/* Confirm Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-[#f8f8f2] mb-3">
                {t('confirm_password')}
              </label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors z-20 ${
                  focusedField === 'confirmPassword' ? 'text-secondary-500 dark:text-[#bd93f9]' : 'text-gray-400 dark:text-[#6272a4]'
                }`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-12 pr-12 py-4 bg-white/50 dark:bg-[#44475a]/50 border-2 border-gray-200 dark:border-[#44475a] rounded-xl focus:border-secondary-500 dark:focus:border-[#bd93f9] focus:ring-4 focus:ring-secondary-500/20 dark:focus:ring-[#bd93f9]/20 hover:border-secondary-300 dark:hover:border-[#bd93f9]/50 transition-all duration-300 placeholder-gray-400 dark:placeholder-[#6272a4] relative z-10 text-gray-900 dark:text-[#f8f8f2]"
                  placeholder={t('enter_confirm_password')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-[#6272a4] hover:text-gray-600 dark:hover:text-[#f8f8f2] transition-colors z-20"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-secondary-500 to-accent-500 dark:from-[#bd93f9] dark:to-[#8be9fd] text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  {t('register')}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div 
            className="my-8 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="flex-1 border-t border-gray-200 dark:border-[#44475a]"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-[#6272a4] font-medium">{t('or')}</span>
            <div className="flex-1 border-t border-gray-200 dark:border-[#44475a]"></div>
          </motion.div>

          {/* Login Link */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-gray-600 dark:text-[#bcbcbc]">
              {t('have_account')}{' '}
              <Link 
                to="/login" 
                className="text-secondary-600 dark:text-[#bd93f9] hover:text-secondary-700 dark:hover:text-[#8be9fd] font-semibold transition-colors"
              >
                {t('login_now')}
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register; 
