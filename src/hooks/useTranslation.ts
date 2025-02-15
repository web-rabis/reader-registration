
import { useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

type Language = 'ru' | 'kk' | 'en';

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'ru';
  });

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language') {
        setCurrentLanguage((e.newValue as Language) || 'ru');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const t = (key: keyof typeof translations['ru']) => {
    return translations[currentLanguage][key] || key;
  };

  return { t, currentLanguage, changeLanguage };
}
