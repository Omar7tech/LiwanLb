import React from 'react';
import { Language, SavedResult, InputState } from '../types';
import { BUILDING_GROUPS, COMPLEXITY_LEVELS, TRANSLATIONS } from '../constants';

interface FormProps {
  language: Language;
  selectedGroup: string;
  selectedCategory: string;
  selectedComplexity: number;
  area: string;
  errors: { area?: string; group?: string; category?: string; complexity?: string };
  availableCategories: Array<{
    key: string;
    labelAr: string;
    labelEn: string;
    group: string;
  }>;
  availableComplexities: typeof COMPLEXITY_LEVELS;
  uniqueGroups: string[];
  isGroupEnabled: () => boolean;
  isCategoryEnabled: () => boolean;
  isComplexityEnabled: () => boolean;
  isAreaEnabled: () => boolean;
  getGroupState: () => InputState;
  getCategoryState: () => InputState;
  getComplexityState: () => InputState;
  getAreaState: () => InputState;
  getInputStyles: (state: InputState, hasError?: boolean) => string;
  getLabelStyles: (state: InputState) => string;
  setSelectedGroup: (value: string) => void;
  setSelectedCategory: (value: string) => void;
  setSelectedComplexity: (value: number) => void;
  setArea: (value: string) => void;
  calculateFees: () => void;
  clearForm: () => void;
  isCalculating: boolean;
  hasCalculated: boolean;
  currentSavedResult: SavedResult | null;
}

const Form: React.FC<FormProps> = ({
  language,
  selectedGroup,
  selectedCategory,
  selectedComplexity,
  area,
  errors,
  availableCategories,
  availableComplexities,
  uniqueGroups,
  isGroupEnabled,
  isCategoryEnabled,
  isComplexityEnabled,
  isAreaEnabled,
  getGroupState,
  getCategoryState,
  getComplexityState,
  getAreaState,
  getInputStyles,
  getLabelStyles,
  setSelectedGroup,
  setSelectedCategory,
  setSelectedComplexity,
  setArea,
  calculateFees,
  clearForm,
  isCalculating,
  hasCalculated,
  currentSavedResult
}) => {
  const t = (key: string): string => {
    return TRANSLATIONS[key]?.[language] || key;
  };

  return (
    <div className="space-y-4">
      <div className={`grid md:grid-cols-2 gap-8 ${language === 'ar' ? 'md:grid-flow-col-dense' : ''}`}>
        {/* Step 1: Building Group Selection */}
        <div className={`space-y-2 ${language === 'ar' ? 'md:col-start-2' : ''}`}>
          <label className={getLabelStyles(getGroupState())}>
            {t('step1')}
          </label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className={getInputStyles(getGroupState(), !!errors.group)}
            disabled={!isGroupEnabled()}
          >
            <option value="">{t('selectGroup')}</option>
            {uniqueGroups.map((group) => (
              <option key={group} value={group}>
                {BUILDING_GROUPS[group]?.name[language] || group}
              </option>
            ))}
          </select>
          {errors.group && (
            <p className="text-red-500 text-sm">{errors.group}</p>
          )}
          {getGroupState() === 'completed' && (
            <p className="text-green-600 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {language === 'ar' ? 'تم الاختيار' : 'Selected'}
            </p>
          )}
        </div>

        {/* Step 2: Building Type Selection */}
        <div className={`space-y-2 ${language === 'ar' ? 'md:col-start-1' : ''}`}>
          <label className={getLabelStyles(getCategoryState())}>
            {t('step2')}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={getInputStyles(getCategoryState(), !!errors.category)}
            disabled={!isCategoryEnabled()}
          >
            <option value="">{t('selectCategory')}</option>
            {availableCategories.map((category) => (
              <option key={category.key} value={category.key}>
                {category.key} - {language === 'ar' ? category.labelAr : category.labelEn}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
          {getCategoryState() === 'completed' && (
            <p className="text-green-600 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {language === 'ar' ? 'تم الاختيار' : 'Selected'}
            </p>
          )}
        </div>

        {/* Step 3: Complexity Selection */}
        <div className={`space-y-2 ${language === 'ar' ? 'md:col-start-2' : ''}`}>
          <label className={getLabelStyles(getComplexityState())}>
            {t('step3')}
          </label>
          <select
            value={selectedComplexity}
            onChange={(e) => setSelectedComplexity(parseInt(e.target.value))}
            className={getInputStyles(getComplexityState(), !!errors.complexity)}
            disabled={!isComplexityEnabled()}
          >
            {availableComplexities.map((level) => (
              <option key={level.value} value={level.value}>
                {language === 'ar' ? level.labelAr : level.labelEn}
              </option>
            ))}
          </select>
          {errors.complexity && (
            <p className="text-red-500 text-sm">{errors.complexity}</p>
          )}
          {getComplexityState() === 'completed' && (
            <p className="text-green-600 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {language === 'ar' ? 'تم الاختيار' : 'Selected'}
            </p>
          )}
        </div>

        {/* Step 4: Area Input */}
        <div className={`space-y-2 ${language === 'ar' ? 'md:col-start-1' : ''}`}>
          <label className={getLabelStyles(getAreaState())}>
            {t('step4')} ({t('areaUnit')})
          </label>
          <div className="relative">
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder={t('areaPlaceholder')}
              className={`${getInputStyles(getAreaState(), !!errors.area)} ${language === 'ar' ? 'pl-12' : 'pr-12'}`}
              disabled={!isAreaEnabled()}
              min="0"
              step="1"
            />
            <div className={`absolute ${language === 'ar' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 text-gray-500 text-sm`}>
              m²
            </div>
          </div>
          {errors.area && (
            <p className="text-red-500 text-sm">{errors.area}</p>
          )}
          {getAreaState() === 'completed' && (
            <p className="text-green-600 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {language === 'ar' ? 'جاهز للحساب' : 'Ready to calculate'}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
        <button
          onClick={calculateFees}
          disabled={isCalculating || !isAreaEnabled() || area === '' || parseFloat(area) <= 0 || !!currentSavedResult}
          className={`w-full sm:flex-1 px-4 sm:px-6 py-3 sm:py-3 rounded-lg transition-all font-medium flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base ${isAreaEnabled() && area !== '' && parseFloat(area) > 0 && !currentSavedResult
            ? 'bg-[#3a3b3a] text-white hover:bg-[#2a2b2a] shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
            }`}
        >
          {isCalculating ? (
            <>
              <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {language === 'ar' ? 'جاري الحساب...' : 'Calculating...'}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {hasCalculated
                ? (language === 'ar' ? 'احسب مرة أخرى' : 'Calculate Again')
                : t('calculate')
              }
            </>
          )}
        </button>

        <button
          onClick={clearForm}
          className="w-full sm:flex-1 px-4 sm:px-6 py-3 sm:py-3 bg-white text-[#3a3b3a] border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          {t('clear')}
        </button>
      </div>
    </div>
  );
};

export default Form;
