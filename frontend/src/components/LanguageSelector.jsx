import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('lang', e.target.value);
  };

  return (
    <select
      className="px-3 py-2 rounded-xl border border-gray-300 dark:border-[#44475a] bg-white dark:bg-[#282a36] text-sm font-medium text-gray-700 dark:text-[#f8f8f2] focus:outline-none focus:ring-2 focus:ring-primary-400"
      value={i18n.language}
      onChange={handleChange}
      style={{ minWidth: 120 }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>{lang.label}</option>
      ))}
    </select>
  );
};

export default LanguageSelector; 