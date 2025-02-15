
import { useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

type Language = 'ru' | 'kk' | 'en';

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ru');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const t = (key: keyof typeof translations['ru']) => {
    return translations[currentLanguage][key] || key;
  };

  return { t, currentLanguage, changeLanguage };
}
