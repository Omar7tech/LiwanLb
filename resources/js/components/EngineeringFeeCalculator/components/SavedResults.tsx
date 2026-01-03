import React from 'react';
import { Language, SavedResult } from '../types';


interface SavedResultsProps {
  language: Language;
  showSavedResults: boolean;
  savedResults: SavedResult[];
  currentSavedResult: SavedResult | null;
  onLoadResult: (result: SavedResult) => void;
  onDeleteResult: (id: string) => void;
  onDownloadResult: (result: SavedResult) => void;
}

const SavedResults: React.FC<SavedResultsProps> = ({
  language,
  showSavedResults,
  savedResults,
  currentSavedResult,
  onDeleteResult,
  onDownloadResult
}) => {
  if (!showSavedResults) {
    return null;
  }

  return (
    <div className="mt-8">
      {savedResults.length === 0 ? (
        <p className="text-gray-500 text-left py-8">
          {language === 'ar' ? 'لا توجد نتائج محفوظة' : 'No saved results'}
        </p>
      ) : (
        <div className="space-y-4">
          {savedResults.map((result) => (
            <div
              key={result.id}
              className={`bg-white border rounded-xl p-6 transition-all ${currentSavedResult?.id === result.id
                ? 'border-[#3a3b3a] bg-[#fafafa]'
                : 'border-gray-200'
                }`}
            >
              <div>
                {/* Mobile-first layout */}
                <div className="space-y-4">
                  {/* Title and Date */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <h4 className="font-semibold text-[#3a3b3a] text-lg">
                      {result.groupName} - {result.categoryName}
                    </h4>
                    <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                      {new Date(result.date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Data Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#fafafa] rounded-lg p-4 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1 font-medium">
                        {language === 'ar' ? 'المساحة' : 'Area'}
                      </div>
                      <div className="text-base font-semibold text-[#3a3b3a]">
                        {result.area} m²
                      </div>
                    </div>
                    <div className="bg-[#fafafa] rounded-lg p-4 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1 font-medium">
                        {language === 'ar' ? 'التعقيد' : 'Complexity'}
                      </div>
                      <div className="text-base font-semibold text-[#3a3b3a]">
                        {result.complexityName}
                      </div>
                    </div>
                    <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                      <div className="text-xs text-gray-600 mb-1 font-medium">
                        {language === 'ar' ? 'الكلفة' : 'Cost'}
                      </div>
                      <div className="text-lg font-bold text-green-700">
                        ${result.estimatedCost.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                      <div className="text-xs text-gray-600 mb-1 font-medium">
                        {language === 'ar' ? 'الأتعاب' : 'Fee'}
                      </div>
                      <div className="text-lg font-bold text-green-700">
                        ${result.minimumFee.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => onDownloadResult(result)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer"
                      title={language === 'ar' ? 'تحميل كصورة' : 'Download as Image'}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {language === 'ar' ? 'تحميل' : 'Download'}
                    </button>
                    <button
                      onClick={() => onDeleteResult(result.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {language === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedResults;
