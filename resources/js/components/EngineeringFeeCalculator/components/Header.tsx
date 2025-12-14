import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const t = (key: string): string => {
    return TRANSLATIONS[key]?.[language] || key;
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#3a3b3a] font-instrument-sans">
          {t('title')}
        </h1>
        <p className="text-lg sm:text-xl font-medium text-gray-600 mt-3 font-instrument-sans">
          {language === 'ar' ? 'احسب الأتعاب الهندسية الدقيقة لمشروعك' : 'Calculate precise engineering fees for your project'}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setLanguage('ar')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${language === 'ar'
            ? 'bg-[#3a3b3a] text-white'
            : 'bg-gray-100 text-[#3a3b3a] hover:bg-gray-200'
            }`}
        >
          🇱🇧 العربية
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${language === 'en'
            ? 'bg-[#3a3b3a] text-white'
            : 'bg-gray-100 text-[#3a3b3a] hover:bg-gray-200'
            }`}
        >
          🇬🇧 English
        </button>
      </div>
    </div>
  );
};

export default Header;
