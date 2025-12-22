import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, ModalState } from '../types';

interface ModalProps {
  modal: ModalState | null;
  onClose: () => void;
  language: Language;
}

const Modal: React.FC<ModalProps> = ({ modal, onClose, language }) => {
  if (!modal) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.4, 0, 0.2, 1],
            scale: { type: "spring", stiffness: 300, damping: 30 }
          }}
          className="relative w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden"
        >
          {/* Header */}
          <div className={`relative px-6 py-5 ${
            modal.type === 'success' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100' :
            modal.type === 'error' ? 'bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-100' :
            'bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-yellow-100'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  modal.type === 'success' ? 'bg-green-100 text-green-600' :
                  modal.type === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {modal.type === 'success' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {modal.type === 'error' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  {modal.type === 'warning' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                
                {/* Title */}
                <div>
                  <h3 className={`text-lg font-semibold ${
                    modal.type === 'success' ? 'text-green-900' :
                    modal.type === 'error' ? 'text-red-900' :
                    'text-yellow-900'
                  }`}>
                    {modal.title}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  modal.type === 'success' ? 'hover:bg-green-100 text-green-600 hover:text-green-700' :
                  modal.type === 'error' ? 'hover:bg-red-100 text-red-600 hover:text-red-700' :
                  'hover:bg-yellow-100 text-yellow-600 hover:text-yellow-700'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-5">
            <p className="text-gray-700 leading-relaxed text-base">{modal.message}</p>

            {modal.showGuidance && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mt-4 bg-blue-50/70 border border-blue-100 rounded-xl p-4"
              >
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1zM8 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H8z" clipRule="evenodd" />
                  </svg>
                  {language === 'ar' ? 'كيفية الوصول إلى النتائج المحفوظة' : 'How to Access Saved Results'}
                </h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    <span>{language === 'ar' ? 'انقر على زر "النتائج المحفوظة" أسفل النتائج الحالية' : 'Click the "Saved Results" button below the current results'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    <span>{language === 'ar' ? 'اختر أي نتيجة محفوظة لعرضها' : 'Select any saved result to view it'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    <span>{language === 'ar' ? 'استخدم أيقونة سلة المهملات لحذف النتائج غير المرغوب فيها' : 'Use the trash icon to delete unwanted results'}</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className={`w-full px-6 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                modal.type === 'success' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700' :
                modal.type === 'error' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700' :
                'bg-gradient-to-r from-yellow-600 to-amber-600 text-white hover:from-yellow-700 hover:to-amber-700'
              }`}
            >
              {language === 'ar' ? 'حسناً' : 'OK'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
