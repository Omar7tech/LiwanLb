import React, { useState, useEffect, useMemo } from 'react';
import { Language, SavedResult, ModalState, InputState } from './EngineeringFeeCalculator/types';
import { Header, Form, Results, SavedResults, Modal } from './EngineeringFeeCalculator/components';
import { useCalculations } from './EngineeringFeeCalculator/hooks/useCalculations';
import { useLocalStorage } from './EngineeringFeeCalculator/hooks/useLocalStorage';
import { useImageGeneration } from './EngineeringFeeCalculator/hooks/useImageGeneration';
import { BUILDING_GROUPS, COMPLEXITY_LEVELS, TRANSLATIONS } from './EngineeringFeeCalculator/constants';

const EngineeringFeeCalculator: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedComplexity, setSelectedComplexity] = useState<number>(2);
  const [area, setArea] = useState<string>('');
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [applicablePercentage, setApplicablePercentage] = useState<number>(0);
  const [minimumFee, setMinimumFee] = useState<number>(0);
  const [baseCostPerSqm, setBaseCostPerSqm] = useState<number>(0);
  const [errors, setErrors] = useState<{ area?: string; group?: string; category?: string; complexity?: string }>({});
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [currentSavedResult, setCurrentSavedResult] = useState<SavedResult | null>(null);
  const [showSavedResults, setShowSavedResults] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalState | null>(null);

  // Use custom hooks
  const { availableCategories, availableComplexities, calculateFees: calculateFeesHook } = useCalculations(
    selectedGroup,
    selectedCategory,
    selectedComplexity,
    area
  );
  
  const [savedResults, setSavedResults] = useLocalStorage('engineeringFeeCalculator_results');
  const { downloadResultAsPNG } = useImageGeneration(language);

  // Get unique groups
  const uniqueGroups = useMemo(() => {
    return Object.keys(BUILDING_GROUPS);
  }, []);

  // Translation helper
  const t = (key: string): string => {
    return TRANSLATIONS[key]?.[language] || key;
  };

  // Reset category and complexity if group changes
  useEffect(() => {
    setSelectedCategory('');
    setSelectedComplexity(2);
    setBaseCostPerSqm(0);
  }, [selectedGroup]);

  // Reset complexity if category changes or not available
  useEffect(() => {
    if (availableComplexities.length > 0 && !availableComplexities.some(level => level.value === selectedComplexity)) {
      setSelectedComplexity(availableComplexities[0].value);
    }
  }, [selectedCategory, selectedComplexity, availableComplexities]);

  // Reset hasCalculated when form inputs change
  useEffect(() => {
    setHasCalculated(false);
  }, [selectedGroup, selectedCategory, selectedComplexity, area]);

  // Helper functions for progressive input states
  const isGroupEnabled = () => true; // Always enabled - it's the first step
  const isCategoryEnabled = () => selectedGroup !== '';
  const isComplexityEnabled = () => selectedGroup !== '' && selectedCategory !== '';
  const isAreaEnabled = () => selectedGroup !== '' && selectedCategory !== '' && selectedComplexity !== 0;

  const getGroupState = (): InputState => {
    if (selectedGroup === '') return 'active'; // First step - needs input
    return 'completed';
  };

  const getCategoryState = (): InputState => {
    if (!isCategoryEnabled()) return 'disabled';
    if (selectedCategory === '') return 'active'; // Next step that needs input
    return 'completed';
  };

  const getComplexityState = (): InputState => {
    if (!isComplexityEnabled()) return 'disabled';
    if (selectedComplexity === 0) return 'active'; // Next step that needs input
    return 'completed';
  };

  const getAreaState = (): InputState => {
    if (!isAreaEnabled()) return 'disabled';
    if (area === '' || parseFloat(area) <= 0) return 'active'; // Next step that needs input
    return 'completed';
  };

  // Helper function to get input styling based on state
  const getInputStyles = (state: InputState, hasError: boolean = false): string => {
    const baseStyles = 'w-full px-4 py-3 border rounded-lg transition-all font-light relative';

    if (hasError) {
      return `${baseStyles} border-red-500 bg-red-50`;
    }

    switch (state) {
      case 'active':
        return `${baseStyles} border-[#3a3b3a] bg-white focus:ring-2 focus:ring-[#3a3b3a] focus:border-[#3a3b3a] shadow-md animate-pulse-slow`;
      case 'completed':
        return `${baseStyles} border-green-300 bg-green-50 focus:ring-2 focus:ring-green-500 focus:border-green-500`;
      case 'disabled':
        return `${baseStyles} border-gray-200 bg-gray-100 cursor-not-allowed opacity-60`;
      default:
        return `${baseStyles} border-gray-300 bg-white focus:ring-2 focus:ring-[#3a3b3a] focus:border-[#3a3b3a]`;
    }
  };

  // Helper function to get label styling based on state
  const getLabelStyles = (state: InputState): string => {
    switch (state) {
      case 'active':
        return 'block text-sm font-medium text-[#3a3b3a]';
      case 'completed':
        return 'block text-sm font-medium text-green-700';
      case 'disabled':
        return 'block text-sm font-medium text-gray-400';
      default:
        return 'block text-sm font-medium text-[#3a3b3a]';
    }
  };

  // Validate inputs
  const validateInputs = (): boolean => {
    const newErrors: { area?: string; group?: string; category?: string; complexity?: string } = {};

    if (!selectedGroup) {
      newErrors.group = t('selectGroupError');
    }

    if (!selectedCategory) {
      newErrors.category = t('selectCategoryError');
    }

    if (!selectedComplexity) {
      newErrors.complexity = t('selectComplexityLevel');
    }

    if (!area || parseFloat(area) <= 0) {
      newErrors.area = t('enterArea');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate fees with improved UX
  const calculateFees = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = await calculateFeesHook();
    
    setEstimatedCost(result.estimatedCost);
    setApplicablePercentage(result.applicablePercentage);
    setMinimumFee(result.minimumFee);
    setBaseCostPerSqm(result.baseCostPerSqm);

    setIsCalculating(false);
    setHasCalculated(true);
  };

  // Clear form
  const clearForm = () => {
    setSelectedGroup('');
    setSelectedCategory('');
    setSelectedComplexity(2);
    setArea('');
    setEstimatedCost(0);
    setApplicablePercentage(0);
    setMinimumFee(0);
    setBaseCostPerSqm(0);
    setErrors({});
    setCurrentSavedResult(null);
  };

  // Save current result
  const saveCurrentResult = () => {
    if (!hasCalculated || !selectedGroup || !selectedCategory || !area) return;

    // Check if this exact result already exists
    const isDuplicate = savedResults.some(result =>
      result.selectedGroup === selectedGroup &&
      result.selectedCategory === selectedCategory &&
      result.selectedComplexity === selectedComplexity &&
      result.area === area
    );

    if (isDuplicate) {
      showModal('error',
        language === 'ar' ? 'نتيجة مكررة' : 'Duplicate Result',
        language === 'ar' ? 'هذه النتيجة محفوظة بالفعل' : 'This result is already saved'
      );
      return;
    }

    // Check if limit reached
    if (savedResults.length >= 10) {
      showModal('warning',
        language === 'ar' ? 'الحد الأقصى للنتائج' : 'Results Limit',
        language === 'ar' ? 'تم الوصول إلى الحد الأقصى من النتائج المحفوظة (10). يمكنك حذف بعض النتائج القديمة لإضافة نتائج جديدة.' : 'Maximum saved results limit reached (10). You can delete some old results to add new ones.'
      );
      return;
    }

    const newResult: SavedResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      selectedGroup,
      selectedCategory,
      selectedComplexity,
      area,
      estimatedCost,
      applicablePercentage,
      minimumFee,
      baseCostPerSqm,
      groupName: BUILDING_GROUPS[selectedGroup]?.name[language] || selectedGroup,
      categoryName: availableCategories.find(c => c.key === selectedCategory)?.[language === 'ar' ? 'labelAr' : 'labelEn'] || selectedCategory,
      complexityName: COMPLEXITY_LEVELS.find(l => l.value === selectedComplexity)?.[language === 'ar' ? 'labelAr' : 'labelEn'] || selectedComplexity.toString()
    };

    setSavedResults(prev => [newResult, ...prev]);
    showModal('success',
      language === 'ar' ? 'تم الحفظ بنجاح!' : 'Saved Successfully!',
      language === 'ar' ? 'تم حفظ نتيجتك بنجاح. يمكنك الوصول إلى جميع النتائج المحفوظة من خلال زر "النتائج المحفوظة" الموجود أسفل النتائج الحالية.' : 'Your result has been saved successfully. You can access all saved results using the "Saved Results" button below the current results.',
      true
    );
  };

  // Load saved result
  const loadSavedResult = (result: SavedResult) => {
    setCurrentSavedResult(result);
    setSelectedGroup(result.selectedGroup);
    setSelectedCategory(result.selectedCategory);
    setSelectedComplexity(result.selectedComplexity);
    setArea(result.area);
    setEstimatedCost(result.estimatedCost);
    setApplicablePercentage(result.applicablePercentage);
    setMinimumFee(result.minimumFee);
    setBaseCostPerSqm(result.baseCostPerSqm);
    setHasCalculated(true);
    setShowSavedResults(false);
  };

  // Delete saved result
  const deleteSavedResult = (id: string) => {
    setSavedResults(prev => prev.filter(result => result.id !== id));
    if (currentSavedResult?.id === id) {
      setCurrentSavedResult(null);
      clearForm();
    }
  };

  // Start new calculation
  const startNewCalculation = () => {
    setCurrentSavedResult(null);
    clearForm();
  };

  // Download result as PNG
  const downloadResult = async () => {
    // Create current result object for image generation
    const currentResult: SavedResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      selectedGroup,
      selectedCategory,
      selectedComplexity,
      area,
      estimatedCost,
      applicablePercentage,
      minimumFee,
      baseCostPerSqm,
      groupName: BUILDING_GROUPS[selectedGroup]?.name[language] || selectedGroup,
      categoryName: availableCategories.find(c => c.key === selectedCategory)?.[language === 'ar' ? 'labelAr' : 'labelEn'] || selectedCategory,
      complexityName: COMPLEXITY_LEVELS.find(l => l.value === selectedComplexity)?.[language === 'ar' ? 'labelAr' : 'labelEn'] || selectedComplexity.toString()
    };

    const success = await downloadResultAsPNG(currentResult);
    if (success) {
      showModal('success',
        language === 'ar' ? 'تم التحميل بنجاح!' : 'Downloaded Successfully!',
        language === 'ar' ? 'تم تحميل النتيجة كصورة PNG بنجاح.' : 'Result has been downloaded as PNG image successfully.'
      );
    } else {
      showModal('error',
        language === 'ar' ? 'خطأ في التحميل' : 'Download Error',
        language === 'ar' ? 'حدث خطأ أثناء تحميل النتيجة.' : 'An error occurred while downloading the result.'
      );
    }
  };

  // Download saved result as PNG
  const downloadSavedResult = async (result: SavedResult) => {
    const success = await downloadResultAsPNG(result);
    if (success) {
      showModal('success',
        language === 'ar' ? 'تم التحميل بنجاح!' : 'Downloaded Successfully!',
        language === 'ar' ? 'تم تحميل النتيجة المحفوظة كصورة PNG بنجاح.' : 'Saved result has been downloaded as PNG image successfully.'
      );
    } else {
      showModal('error',
        language === 'ar' ? 'خطأ في التحميل' : 'Download Error',
        language === 'ar' ? 'حدث خطأ أثناء تحميل النتيجة المحفوظة.' : 'An error occurred while downloading the saved result.'
      );
    }
  };

  // Show modal
  const showModal = (type: 'success' | 'error' | 'warning', title: string, message: string, showGuidance?: boolean) => {
    setModal({ type, title, message, showGuidance });
  };

  // Close modal
  const closeModal = () => {
    setModal(null);
  };

  return (
    <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse-slow {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(74, 85, 104, 0.4);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(74, 85, 104, 0);
            }
          }
          .animate-pulse-slow {
            animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideDown {
            animation: slideDown 0.6s ease-out;
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-scaleIn {
            animation: scaleIn 0.4s ease-out both;
          }
        `
      }} />
      
      {/* Main Content */}
      <div className="space-y-12">
        {/* Header Component */}
        <Header language={language} setLanguage={setLanguage} />

        {/* Form Component */}
        <Form
          language={language}
          selectedGroup={selectedGroup}
          selectedCategory={selectedCategory}
          selectedComplexity={selectedComplexity}
          area={area}
          errors={errors}
          availableCategories={availableCategories}
          availableComplexities={availableComplexities}
          uniqueGroups={uniqueGroups}
          isGroupEnabled={isGroupEnabled}
          isCategoryEnabled={isCategoryEnabled}
          isComplexityEnabled={isComplexityEnabled}
          isAreaEnabled={isAreaEnabled}
          getGroupState={getGroupState}
          getCategoryState={getCategoryState}
          getComplexityState={getComplexityState}
          getAreaState={getAreaState}
          getInputStyles={getInputStyles}
          getLabelStyles={getLabelStyles}
          setSelectedGroup={setSelectedGroup}
          setSelectedCategory={setSelectedCategory}
          setSelectedComplexity={setSelectedComplexity}
          setArea={setArea}
          calculateFees={calculateFees}
          clearForm={currentSavedResult ? startNewCalculation : clearForm}
          isCalculating={isCalculating}
          hasCalculated={hasCalculated}
          currentSavedResult={currentSavedResult}
        />

        {/* Results Component */}
        <Results
          language={language}
          hasCalculated={hasCalculated}
          estimatedCost={estimatedCost}
          applicablePercentage={applicablePercentage}
          minimumFee={minimumFee}
          baseCostPerSqm={baseCostPerSqm}
          currentSavedResult={currentSavedResult}
          onSaveResult={saveCurrentResult}
          onDownloadImage={downloadResult}
          onToggleSavedResults={() => setShowSavedResults(!showSavedResults)}
          savedResultsCount={savedResults.length}
        />

        {/* Saved Results Component */}
        <SavedResults
          language={language}
          showSavedResults={showSavedResults}
          savedResults={savedResults}
          currentSavedResult={currentSavedResult}
          onLoadResult={loadSavedResult}
          onDeleteResult={deleteSavedResult}
          onDownloadResult={downloadSavedResult}
        />

        {/* Error Message */}
        {area && parseFloat(area) <= 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {language === 'ar'
              ? 'الرجاء إدخال مساحة البناء الإجمالية لحساب الأتعاب.'
              : 'Please enter the total building area to calculate fees.'
            }
          </div>
        )}
      </div>

      {/* Modal Component */}
      <Modal modal={modal} onClose={closeModal} language={language} />
    </div>
  );
};

export default EngineeringFeeCalculator;
