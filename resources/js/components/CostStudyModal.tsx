import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Form, useForm } from '@inertiajs/react';

interface CostStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ar' | 'en';
}

const CostStudyModal: React.FC<CostStudyModalProps> = ({ isOpen, onClose, language }) => {
  const [errors, setErrors] = useState<{ full_name?: string; mobile_number?: string }>({});
  const [touched, setTouched] = useState<{ full_name?: boolean; mobile_number?: boolean }>({});
  
  const { data, setData, post, processing, recentlySuccessful } = useForm({
    full_name: '',
    mobile_number: '',
  });

  // Frontend validation
  const validateForm = (): boolean => {
    const newErrors: { full_name?: string; mobile_number?: string } = {};
    
    // Full name validation
    const fullNameTrimmed = data.full_name.trim();
    if (!fullNameTrimmed) {
      newErrors.full_name = 'Full name is required';
    } else if (fullNameTrimmed.length < 4) {
      newErrors.full_name = 'Name must be at least 4 characters';
    } else if (fullNameTrimmed.length > 20) {
      newErrors.full_name = 'Name must be 20 characters maximum';
    } else if (!/^[a-zA-Z\s]+$/.test(fullNameTrimmed)) {
      newErrors.full_name = 'Name must contain only letters';
    }
    
    // Mobile number validation
    const mobileNumberTrimmed = data.mobile_number.trim();
    if (!mobileNumberTrimmed) {
      newErrors.mobile_number = 'Mobile number is required';
    } else if (!/^[0-9]+$/.test(mobileNumberTrimmed)) {
      newErrors.mobile_number = 'Mobile number must contain only numbers';
    } else if (mobileNumberTrimmed.length < 8) {
      newErrors.mobile_number = 'Mobile number must be at least 8 digits';
    } else if (mobileNumberTrimmed.length > 20) {
      newErrors.mobile_number = 'Mobile number must be 20 digits maximum';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Close modal and set localStorage when successfully submitted
  React.useEffect(() => {
    if (recentlySuccessful) {
      localStorage.setItem('cost_study_submitted', 'true');
      localStorage.setItem('cost_study_timestamp', Date.now().toString());
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }, [recentlySuccessful, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate on frontend first
    if (!validateForm()) {
      return;
    }
    
    post('/cost-study', {
      onError: (errors) => {
        setErrors(errors);
      },
    });
  };

  if (!isOpen) return null;

  return (
    // Clean modal without card appearance
    <div className="flex justify-center p-4 text-left">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="max-w-md w-full"
      >
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#3a3b3a] mb-2">
              Explore Your Project Costs
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your information to access the cost calculator
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-medium text-[#3a3b3a] mb-2 text-left">
                  Full Name
                </label>
                <input
                  type="text"
                  value={data.full_name}
                  onChange={(e) => {
                    setData('full_name', e.target.value);
                    setTouched({ ...touched, full_name: true });
                    
                    // Validate immediately and show errors
                    const value = e.target.value.trim();
                    if (value && (value.length < 4 || value.length > 20 || !/^[a-zA-Z\s]+$/.test(value))) {
                      if (value.length < 4) {
                        setErrors({ ...errors, full_name: 'Name must be at least 4 characters' });
                      } else if (value.length > 20) {
                        setErrors({ ...errors, full_name: 'Name must be 20 characters maximum' });
                      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                        setErrors({ ...errors, full_name: 'Name must contain only letters' });
                      }
                    } else if (value.length >= 4 && value.length <= 20 && /^[a-zA-Z\s]+$/.test(value)) {
                      setErrors({ ...errors, full_name: undefined });
                    }
                  }}
                  onBlur={() => setTouched({ ...touched, full_name: true })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3a3b3a] focus:border-[#3a3b3a] transition-colors text-left ${
                    errors.full_name ? 'border-red-500' : touched.full_name && data.full_name.trim() ? 'border-green-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.full_name && touched.full_name && (
                  <p className="mt-1 text-sm text-red-600 text-left">{errors.full_name}</p>
                )}
              </div>

              {/* Mobile Number Field */}
              <div>
                <label className="block text-sm font-medium text-[#3a3b3a] mb-2 text-left">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={data.mobile_number}
                  onChange={(e) => {
                    setData('mobile_number', e.target.value);
                    setTouched({ ...touched, mobile_number: true });
                    
                    // Validate immediately and show errors
                    const value = e.target.value.trim();
                    if (value && (value.length < 8 || value.length > 20 || !/^[0-9]+$/.test(value))) {
                      if (value.length < 8) {
                        setErrors({ ...errors, mobile_number: 'Mobile number must be at least 8 digits' });
                      } else if (value.length > 20) {
                        setErrors({ ...errors, mobile_number: 'Mobile number must be 20 digits maximum' });
                      } else if (!/^[0-9]+$/.test(value)) {
                        setErrors({ ...errors, mobile_number: 'Mobile number must contain only numbers' });
                      }
                    } else if (value.length >= 8 && value.length <= 20 && /^[0-9]+$/.test(value)) {
                      setErrors({ ...errors, mobile_number: undefined });
                    }
                  }}
                  onBlur={() => setTouched({ ...touched, mobile_number: true })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3a3b3a] focus:border-[#3a3b3a] transition-colors text-left ${
                    errors.mobile_number ? 'border-red-500' : touched.mobile_number && data.mobile_number.trim() ? 'border-green-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your mobile number"
                />
                {errors.mobile_number && touched.mobile_number && (
                  <p className="mt-1 text-sm text-red-600 text-left">{errors.mobile_number}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-[#3a3b3a] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#2a2b2a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3a3b3a] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Calculating...' : 'Calculate Costs'}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {recentlySuccessful && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
              Your information has been saved successfully! You can now use the cost calculator.
            </div>
          )}

          {/* Note */}
          <p className="mt-4 text-xs text-gray-500 text-center">
            Your information will be securely saved and you won't need to enter it again
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CostStudyModal;
