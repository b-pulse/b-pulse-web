'use client';
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export const useTranslation = () => {
  const { language, toggleLanguage, setLanguage } = useContext(LanguageContext);

  const t = language === 'es' ? translations.es : translations.en;

  return { t, language, toggleLanguage, setLanguage };
};
