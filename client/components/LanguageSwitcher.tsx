import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode: string) => {
    if (location.pathname === '/home') {
      window.location.reload();
    }
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  // Reset page state when language changes for smooth transitions
  useEffect(() => {
    // Scroll to top for clean page reload
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger a custom event to notify all components about language change
    const event = new CustomEvent('languageChanged', { detail: { language: i18n.language } });
    window.dispatchEvent(event);
  }, [i18n.language]);

  return (
    <div className="flex gap-2 items-center">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-2 py-1 rounded-lg text-sm font-medium transition-all ${
            i18n.language === lang.code
              ? 'bg-blue-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={lang.name}
        >
          <span className="text-lg">{lang.flag}</span>
        </motion.button>
      ))}
    </div>
  );
}