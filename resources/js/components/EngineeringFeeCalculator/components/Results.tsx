import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ResultsProps {
  language: Language;
  hasCalculated: boolean;
  estimatedCost: number;
  applicablePercentage: number;
  minimumFee: number;
  baseCostPerSqm: number;
  currentSavedResult: any;
  onSaveResult: () => void;
  onDownloadImage: () => void;
  onToggleSavedResults: () => void;
  savedResultsCount: number;
}

const Results: React.FC<ResultsProps> = ({
  language,
  hasCalculated,
  estimatedCost,
  applicablePercentage,
  minimumFee,
  baseCostPerSqm,
  currentSavedResult,
  onSaveResult,
  onDownloadImage,
  onToggleSavedResults,
  savedResultsCount
}) => {
  const t = (key: string): string => {
    return TRANSLATIONS[key]?.[language] || key;
  };

  if (!hasCalculated || (estimatedCost === 0 && applicablePercentage === 0 && minimumFee === 0)) {
    return null;
  }

  return (
    <div id="results-section" className="mt-12  animate-fadeIn">
      <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-6 ${language === 'ar' ? 'sm:flex-row-reverse' : ''} animate-slideDown`}>
        <h2 className={`text-2xl font-semibold text-[#3a3b3a] font-instrument-sans ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {t('results')}
        </h2>
        {currentSavedResult && (
          <span className={`text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 ${language === 'ar' ? 'self-start' : 'self-start'} animate-slideDown`}>
            {language === 'ar' ? 'نتيجة محفوظة' : 'Saved Result'}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 animate-scaleIn" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm font-medium text-gray-700 mb-3 font-instrument-sans">
            {t('baseCost')}
          </p>
          <p className="text-2xl font-semibold text-[#3a3b3a] font-instrument-sans">
            ${baseCostPerSqm.toLocaleString()}/m²
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 animate-scaleIn" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm font-medium text-gray-700 mb-3 font-instrument-sans">
            {t('estimatedCost')}
          </p>
          <p className="text-3xl font-bold text-green-700 font-instrument-sans">
            ${estimatedCost.toLocaleString()}
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 animate-scaleIn" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm font-medium text-gray-700 mb-3 font-instrument-sans">
            {t('applicableFee')}
          </p>
          <p className="text-2xl font-semibold text-yellow-600 font-instrument-sans">
            {applicablePercentage.toFixed(1)}%
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 animate-scaleIn" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm font-medium text-gray-700 mb-3 font-instrument-sans">
            {t('minimumFee')}
          </p>
          <p className="text-3xl font-bold text-green-700 font-instrument-sans">
            ${minimumFee.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Results Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
        {!currentSavedResult && (
          <button
            onClick={onSaveResult}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
          >
            {language === 'ar' ? 'حفظ النتيجة' : 'Save Result'}
          </button>
        )}

        <button
          onClick={onDownloadImage}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {language === 'ar' ? 'تحميل كصورة' : 'Download as Image'}
        </button>

        <button
          onClick={onToggleSavedResults}
          className={`w-full px-6 py-3 bg-white text-[#3a3b3a] border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium ${currentSavedResult ? 'sm:col-span-2' : 'lg:col-span-1'}`}
        >
          {language === 'ar' ? 'النتائج المحفوظة' : 'Saved Results'} ({savedResultsCount})
        </button>
      </div>
    </div>
  );
};

export default Results;
