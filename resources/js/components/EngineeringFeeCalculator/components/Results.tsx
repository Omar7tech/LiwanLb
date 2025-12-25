import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { usePage } from '@inertiajs/react';

// Type declaration for Puter.js
declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (prompt: string, options?: { model?: string; temperature?: number; max_tokens?: number }) =>
          Promise<string | {
            success?: boolean;
            error?: any;
            response?: string;
            text?: string;
            data?: string;
            // OpenAI-style response format
            index?: number;
            finish_reason?: string;
            usage?: any;
            via_ai_chat_service?: boolean;
            message: { role: string; content: string; refusal?: any };
          }>;
      };
    };
  }
}

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
  savedResultsCount,
}) => {
  const { props } = usePage();
  const generalSettings = props.generalSettings as any;
  const socialSettings = props.socialSettings as any;
  const costStudyAIEnabled = generalSettings?.cost_study_ai_enabled || false;
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);
  const [showAIResults, setShowAIResults] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [userInput, setUserInput] = useState('');
  const [isConversationMode, setIsConversationMode] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);

  // Get contact info from settings
  const phoneNumber = socialSettings?.phone_number || null;
  const whatsappNumber = socialSettings?.whatsapp_number || null;
  const hasContactInfo = phoneNumber || whatsappNumber;

  const t = (key: string): string => {
    return TRANSLATIONS[key]?.[language] || key;
  };

  // XSS protection function to escape HTML entities
  const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Parse markdown bold text (**text**) to HTML
  const parseMarkdownBold = (text: string): string => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  };

  // Auto-scroll when conversation history updates
  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory, isAILoading]);

  // Reset AI analysis when calculation data changes
  useEffect(() => {
    if (hasCalculated) {
      setAiAnalysis('');
      setShowAIResults(false);
      setIsAILoading(false);
      setConversationHistory([]);
      setUserInput('');
      setIsConversationMode(false);
    }
  }, [estimatedCost, applicablePercentage, minimumFee, baseCostPerSqm, hasCalculated]);

  // Generate AI analysis using Puter.js
  const generateAIAnalysis = async () => {
    setIsAILoading(true);
    setShowAIResults(true);
    setAiAnalysis('');
    setIsConversationMode(true);

    try {
    const prompt = language === 'ar'
        ? `أنت ذكاء ليوان الاصطناعي. قدم تحليلاً احترافياً للبيانات التالية:
        
        بيانات المشروع (بيانات حقيقية):
        - التكلفة المقدرة: $${estimatedCost.toLocaleString()}
        - تكلفة الأساس لكل متر مربع: $${baseCostPerSqm.toLocaleString()}
        - كفاءة التكلفة: ${baseCostPerSqm > 1000 ? 'منخفضة' : baseCostPerSqm > 500 ? 'متوسطة' : 'عالية'}
        - تصنيف المشروع: ${estimatedCost > 500000 ? 'ضخم' : estimatedCost > 100000 ? 'متوسط' : 'صغير'}
        ${hasContactInfo ? `- معلومات التواصل: ${phoneNumber || ''}${whatsappNumber ? ` (واتساب: ${whatsappNumber})` : ''}` : ''}
        
        قدم تحليلاً معماري احترافي (100-150 كلمة) يتضمن:
        1. تحليل إحصائيات ومقاييس الأداء
        2. تحليل كفاءة التكلفة مع أرقام محددة
        3. تصنيف المشروع بناءً على المعايير المعمارية
        4. توصيات عملية قابلة للتنفيذ
        5. ${hasContactInfo ? 'معلومات التواصل المتاحة للتواصل المباشر' : 'معلومات التواصل: تواصل مع ليوان للحصول على التفاصيل'}
        6. ملاحظة: التحليل والرؤى التالية مولدة بواسطة ذكاء ليوان`
        : `You are Liwan AI. Provide professional analysis of the following data:
        
        Project Data (real data):
        - Estimated Cost: $${estimatedCost.toLocaleString()}
        - Base Cost per Square Meter: $${baseCostPerSqm.toLocaleString()}
        - Cost Efficiency: ${baseCostPerSqm > 1000 ? 'Low' : baseCostPerSqm > 500 ? 'Medium' : 'High'}
        - Project Classification: ${estimatedCost > 500000 ? 'Large' : estimatedCost > 100000 ? 'Medium' : 'Small'}
        ${hasContactInfo ? `- Contact Info: ${phoneNumber || ''}${whatsappNumber ? ` (WhatsApp: ${whatsappNumber})` : ''}` : ''}
        
        Provide professional architectural analysis (100-150 words) including:
        1. Analysis of statistics and performance metrics
        2. Cost efficiency analysis with specific numbers
        3. Project classification based on architectural standards
        4. Actionable practical recommendations
        5. ${hasContactInfo ? 'Available contact information for direct communication' : 'Contact: Contact Liwan for details'}
        6. Note: The analysis and insights below are AI-generated by Liwan AI`;

      console.log('Sending prompt to AI:', prompt.substring(0, 100) + '...');

      // Use Puter.js API with Gemini 3 Flash
      if (!window.puter) {
        throw new Error('Puter.js not available');
      }
      const response = await window.puter.ai.chat(prompt, {
        model: 'gemini-3-flash-preview'
      });
      console.log('AI response received:', response);
      console.log('Response type:', typeof response);
      console.log('Response keys:', response ? Object.keys(response) : 'null');

      // Handle different response formats
      let analysisText = '';
      if (typeof response === 'string' && response.trim().length > 0) {
        analysisText = response;
        console.log('Using string response, length:', analysisText.length);
      } else if (response && typeof response === 'object') {
        // Check for OpenAI-style response with message.content
        if (response.message && response.message.content) {
          analysisText = response.message.content;
          console.log('Using OpenAI-style message.content, length:', analysisText.length);
          console.log('Content sample:', analysisText.substring(0, 200));
        } else if (response.success === false && response.error) {
          console.error('Puter.js API error:', response.error);
          throw new Error(response.error.message || response.error.toString() || 'Puter.js API error');
        } else if (response.success === true && response.response) {
          analysisText = response.response;
          console.log('Using success.response, length:', analysisText.length);
        } else if (response.text) {
          analysisText = response.text;
          console.log('Using response.text, length:', analysisText.length);
        } else if (response.data) {
          analysisText = response.data;
          console.log('Using response.data, length:', analysisText.length);
        } else {
          console.error('Unknown response format, keys:', Object.keys(response));
          console.error('Full response object:', JSON.stringify(response, null, 2));
          throw new Error('Unknown response format');
        }
      } else {
        console.error('Invalid AI response format:', response);
        throw new Error('Invalid AI response format');
      }

      if (!analysisText || analysisText.trim().length === 0) {
        console.error('Analysis text is empty or invalid');
        throw new Error('Empty analysis text received');
      }

      console.log('Final analysisText:', analysisText.substring(0, 100) + '...');
      console.log('Setting full AI analysis text immediately');

      // Set the full text immediately instead of typing animation (escape HTML to prevent XSS)
      setAiAnalysis(escapeHtml(analysisText));

      // Add to conversation history (escape HTML to prevent XSS)
      setConversationHistory([
        { role: 'assistant', content: escapeHtml(analysisText) }
      ]);

    } catch (error) {
      console.error('AI analysis failed:', error);

      // Don't use hardcoded fallback - let AI handle it even with errors
      const errorPrompt = language === 'ar'
        ? `حدث خطأ فني. ذكاء ليوان يرجى تقديم تحليل أساسي:
        
        بيانات المشروع (حقيقية):
        - التكلفة المقدرة: $${estimatedCost.toLocaleString()}
        - تكلفة الأساس لكل متر مربع: $${baseCostPerSqm.toLocaleString()}
        ${hasContactInfo ? `- معلومات التواصل: ${phoneNumber || ''}${whatsappNumber ? ` (واتساب: ${whatsappNumber})` : ''}` : ''}
        
        قدم تحليلاً معمارياً أساسياً. ملاحظة: التحليل والرؤى التالية مولدة بواسطة ذكاء ليوان.`
        : `Technical error. Liwan AI please provide basic analysis:
        
        Project Data (real):
        - Estimated Cost: $${estimatedCost.toLocaleString()}
        - Base Cost per Square Meter: $${baseCostPerSqm.toLocaleString()}
        ${hasContactInfo ? `- Contact Info: ${phoneNumber || ''}${whatsappNumber ? ` (WhatsApp: ${whatsappNumber})` : ''}` : ''}
        
        Provide basic architectural analysis. Note: The analysis below is AI-generated by Liwan AI.`;

      // Try a simpler AI call as fallback
      try {
        if (window.puter) {
          const fallbackResponse = await window.puter.ai.chat(errorPrompt, {
            model: 'gemini-3-flash-preview'
          });
          const analysisText = typeof fallbackResponse === 'string' ? fallbackResponse :
            fallbackResponse?.message?.content ||
            fallbackResponse?.text ||
            fallbackResponse?.response ||
            fallbackResponse?.data ||
            'Analysis temporarily unavailable';

          // Set the full fallback text immediately instead of typing animation (escape HTML to prevent XSS)
          setAiAnalysis(escapeHtml(analysisText));
        }
      } catch (fallbackError) {
        console.error('Fallback AI also failed:', fallbackError);
      }

      // Only show error message if both attempts fail (escape HTML to prevent XSS)
      setAiAnalysis(escapeHtml(language === 'ar'
        ? 'عذراً، حدث خطأ في تحليل Liwan AI. يرجى المحاولة مرة أخرى.'
        : 'Sorry, Liwan AI analysis failed. Please try again.'));
    } finally {
      setIsAILoading(false);
    }
  };

  // Handle user message in conversation
  const handleUserMessage = async () => {
    if (!userInput.trim()) return;

    // Escape HTML to prevent XSS attacks
    const userMessage = escapeHtml(userInput.trim());
    setUserInput('');
    setIsAILoading(true);

    // Add user message to history
    const newHistory = [...conversationHistory, { role: 'user' as const, content: userMessage }];
    setConversationHistory(newHistory);

    try {
      // Build conversation context
      const contextMessages = newHistory.map(msg =>
        `${msg.role === 'user' ? (language === 'ar' ? 'المستخدم' : 'User') : (language === 'ar' ? 'المساعد' : 'Assistant')}: ${msg.content}`
      ).join('\n\n');

      const conversationPrompt = language === 'ar'
        ? `أنت Liwan AI الخبير المعماري. استخدم بيانات المشروع (حقيقية) ومعلومات التواصل المتاحة.
        
        بيانات المشروع الحالية (حقيقية):
        - التكلفة الإجمالية: $${estimatedCost.toLocaleString()}
        - تكلفة المتر المربع: $${baseCostPerSqm.toLocaleString()}
        ${hasContactInfo ? `- معلومات التواصل: ${phoneNumber || ''}${whatsappNumber ? ` (واتساب: ${whatsappNumber})` : ''}` : '- معلومات التواصل: غير متاحة، تواصل مع ليوان'}
        
        المحادثة السابقة:
        ${contextMessages}
        
        سؤال المستخدم: ${userMessage}
        
        كن خبيراً حقيقياً:
        1. استخدم بيانات المشروع الحقيقية في إجاباتك
        2. أعط نصائح عملية واقعية
        3. إذا سأل عن تكاليف، استخدم الأرقام الفعلية
        4. إذا سأل عن تصميم، ربطه بالتكلفة والحجم
        5. كن واثقاً ومختصراً (30-70 كلمة)
        6. ملاحظة: إجاباتك وتحليلك مولدة بواسطة ذكاء ليوان
        7. إذا السؤال غير معماري، قل "اسألني عن التصميم أو التكاليف أو البناء"`
        : `You are Liwan AI architectural expert. Use project data (real) and available contact info.
        
        Current project data (real):
        - Total cost: $${estimatedCost.toLocaleString()}
        - Cost per square meter: $${baseCostPerSqm.toLocaleString()}
        ${hasContactInfo ? `- Contact Info: ${phoneNumber || ''}${whatsappNumber ? ` (WhatsApp: ${whatsappNumber})` : ''}` : '- Contact Info: Not available, contact Liwan'}
        
        Previous conversation:
        ${contextMessages}
        
        User question: ${userMessage}
        
        Be a real expert:
        1. Use real project data in your answers
        2. Give practical, realistic advice
        3. If asked about costs, use actual numbers
        4. If asked about design, connect to cost and size
        5. Be confident and concise (30-70 words)
        6. Note: Your answers and analysis are AI-generated by Liwan AI
        7. If not architectural, say "Ask me about design, costs, or construction"`;

      if (!window.puter) {
        throw new Error('Puter.js not available');
      }

      const response = await window.puter.ai.chat(conversationPrompt, {
        model: 'gemini-3-flash-preview'
      });

      let analysisText = '';
      if (typeof response === 'string' && response.trim().length > 0) {
        analysisText = response;
      } else if (response && typeof response === 'object' && response.message && response.message.content) {
        analysisText = response.message.content;
      } else {
        throw new Error('Invalid AI response format');
      }

      // Post-processing check for unrelated responses
      const architecturalKeywords = [
        'architecture', 'design', 'building', 'construction', 'materials',
        'cost', 'fee', 'project', 'structure', 'plan', 'budget', 'price',
        'square meter', 'area', 'space', 'interior', 'exterior', 'foundation',
        'معماري', 'تصميم', 'بناء', 'مشروع', 'تكلفة', 'مادة', 'هندسة',
        'مساحة', 'مسطح', 'داخلي', 'خارجي', 'أساسات', 'ميزانية', 'سعر'
      ];

      const isArchitecturalResponse = architecturalKeywords.some(keyword =>
        analysisText.toLowerCase().includes(keyword.toLowerCase())
      );

      // Also check if the response contains specific project data
      const hasProjectData = analysisText.includes('$' + estimatedCost.toLocaleString()) ||
        analysisText.includes(baseCostPerSqm.toLocaleString());

      // If response doesn't contain architectural keywords or project data, use a fallback
      if (!isArchitecturalResponse && !hasProjectData && analysisText.length > 30) {
        console.warn('AI response seems unrelated to architecture, using fallback');
        analysisText = language === 'ar'
          ? 'اسألني عن التصميم أو التكاليف أو البناء'
          : 'Ask me about design, costs, or construction';
      }

      // Add AI response to history (escape HTML to prevent XSS)
      setConversationHistory(prev => [...prev, { role: 'assistant' as const, content: escapeHtml(analysisText) }]);

    } catch (error) {
      console.error('Conversation AI failed:', error);
      const errorMessage = language === 'ar'
        ? 'عذراً، حدث خطأ في معالجة سؤالك. يرجى المحاولة مرة أخرى.'
        : 'Sorry, there was an error processing your question. Please try again.';

      setConversationHistory(prev => [...prev, { role: 'assistant' as const, content: escapeHtml(errorMessage) }]);
    } finally {
      setIsAILoading(false);
    }
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 lg:max-w-2xl lg:mx-auto">
        <div className="group hidden lg:block p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-[#F2AE1D]/30 hover:-translate-y-1">
          <p className="text-sm font-medium text-gray-700 mb-3 font-instrument-sans group-hover:text-[#3a3b3a] transition-colors">
            {t('baseCost')}
          </p>
          <p className="text-2xl font-semibold text-[#3a3b3a] font-instrument-sans group-hover:scale-105 transition-transform duration-300">
            ${baseCostPerSqm.toLocaleString()}/m²
          </p>
        </div>

        <div className="group hidden lg:block p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-green-200 hover:-translate-y-1">
          <p className="text-sm font-medium text-gray-700 mb-3 font-instrument-sans group-hover:text-green-700 transition-colors">
            {t('estimatedCost')}
          </p>
          <p className="text-3xl font-bold text-green-700 font-instrument-sans group-hover:scale-105 transition-transform duration-300">
            ${estimatedCost.toLocaleString()}
          </p>
        </div>


        {/* Mobile versions without hover effects */}
        <div className="lg:hidden p-6 bg-white rounded-lg shadow-sm border border-gray-100 animate-scaleIn" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm font-medium text-gray-700 mb-3 font-instrument-sans">
            {t('baseCost')}
          </p>
          <p className="text-2xl font-semibold text-[#3a3b3a] font-instrument-sans">
            ${baseCostPerSqm.toLocaleString()}/m²
          </p>
        </div>

        <div className="lg:hidden p-6 bg-white rounded-lg shadow-sm border border-gray-100 animate-scaleIn" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm font-medium text-gray-700 mb-3 font-instrument-sans">
            {t('estimatedCost')}
          </p>
          <p className="text-3xl font-bold text-green-700 font-instrument-sans">
            ${estimatedCost.toLocaleString()}
          </p>
        </div>

      </div>

      {/* AI Analysis Section */}
      {costStudyAIEnabled && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8"
      >
        {/* AI Analysis Button */}
        {!showAIResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="text-center"
          >
            <button
              onClick={generateAIAnalysis}
              disabled={isAILoading}
              className="group inline-flex items-center justify-center px-8 py-4 bg-[#3a3b3a] hover:bg-[#4a4b4a] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center space-x-3">
                {isAILoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{language === 'ar' ? 'Liwan AI يحلل...' : 'Liwan AI Analyzing...'}</span>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 bg-[#F2AE1D] rounded-lg flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-[#3a3b3a]" />
                    </div>
                    <span>{language === 'ar' ? 'تحليل Liwan AI' : 'Liwan AI Analysis'}</span>
                  </>
                )}
              </div>
            </button>

            <p className={`mt-4 text-sm text-gray-600 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {language === 'ar'
                ? 'احصل على تحليل معماري احترافي باستخدام ذكاء Liwan AI الاصطناعي'
                : 'Get professional architectural analysis using Liwan AI'
              }
            </p>
          </motion.div>
        )}

        {/* AI Results Display */}
        {showAIResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4  sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-lg"
          >
            <div className="flex items-start space-x-3 sm:space-x-4">
              {/* Simple Liwan Logo */}


              <div className="flex-1 min-w-0">
                {/* Clean Header */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Cpu className="w-4 h-4 sm:w-6 sm:h-6 text-[#F2AE1D]" />

                    {language === 'ar' ? 'Liwan AI Architecture' : 'Liwan AI Architecture'}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isAILoading ? 'bg-[#F2AE1D] animate-pulse' : 'bg-green-500'}`}></div>
                    <span className="text-xs text-gray-500">
                      {isAILoading
                        ? (language === 'ar' ? 'جاري التحليل' : 'Analyzing')
                        : (language === 'ar' ? 'مكتمل' : 'Complete')
                      }
                    </span>
                  </div>
                </div>

                {/* Conversation History */}
                <div
                  ref={conversationRef}
                  className="space-y-3 sm:space-y-4 mb-3 sm:mb-4 max-h-80 sm:max-h-96 overflow-y-auto"
                  style={{
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none' /* IE and Edge */
                  }}
                >
                  <style>{`
                    .scrollbar-hide::-webkit-scrollbar {
                      display: none; /* Chrome, Safari, Opera */
                    }
                  `}</style>
                  {conversationHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${message.role === 'user'
                            ? 'bg-[#3a3b3a] text-white'
                            : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        <div className="text-xs font-medium mb-1 opacity-70">
                          {message.role === 'user'
                            ? (language === 'ar' ? 'أنت' : 'You')
                            : (language === 'ar' ? 'Liwan AI' : 'Liwan AI')
                          }
                        </div>
                        <div
                          className="text-xs sm:text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: message.role === 'assistant'
                              ? parseMarkdownBold(message.content)
                              : message.content
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isAILoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 p-2 sm:p-3 rounded-lg max-w-[85%] sm:max-w-[80%] w-[65%]">
                        {/* Skeleton loader */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-[#F2AE1D] rounded-full animate-pulse"></div>
                            <span className="text-xs sm:text-sm text-[#F2AE1D] font-medium">
                              {language === 'ar' ? 'Liwan AI يفكر...' : 'Liwan AI thinking...'}
                            </span>
                          </div>
                          {/* Skeleton text lines */}
                          <div className="space-y-1">
                            <div className="h-2 sm:h-3 bg-gray-300 rounded animate-pulse" style={{ width: '95%' }}></div>
                            <div className="h-2 sm:h-3 bg-gray-300 rounded animate-pulse" style={{ width: '85%' }}></div>
                            <div className="h-2 sm:h-3 bg-gray-300 rounded animate-pulse" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Field for Conversation */}
                {isConversationMode && (
                  <div className="border-t border-gray-100 pt-3 sm:pt-4">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-linear-to-r from-[#F2AE1D]/5 to-[#3a3b3a]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleUserMessage();
                          }
                        }}
                        placeholder={language === 'ar'
                          ? 'اسأل عن أي شيء معماري...'
                          : 'Ask anything architectural...'}
                        className="relative w-full px-4 py-3 pr-14 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#F2AE1D] focus:ring-0 text-sm resize-none transition-all duration-300 group-hover:border-gray-300 shadow-sm"
                        rows={1}
                        disabled={isAILoading}
                        style={{
                          minHeight: '48px',
                          maxHeight: '120px',
                          overflowY: 'auto'
                        }}
                      />
                      <div className="absolute right-2 top-2 flex items-center gap-1">
                        <div className="h-6 w-px bg-gray-300"></div>
                        <button
                          onClick={handleUserMessage}
                          disabled={isAILoading || !userInput.trim()}
                          className="p-2 bg-[#3a3b3a] text-white rounded-lg hover:bg-[#2a2b2a] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                        >
                          {isAILoading ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Simple Footer */}
                {!isConversationMode && aiAnalysis && !isAILoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100"
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                      <span>{language === 'ar' ? 'اكتمل التحليل المعماري' : 'Architectural analysis complete'}</span>
                      <span className="text-[#F2AE1D] font-medium">Liwan AI</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
      )}

      {/* Results Actions */}
      <div className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
        {!currentSavedResult && (
          <button
            onClick={onSaveResult}
            className="w-full px-4 py-2.5 sm:px-6 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium cursor-pointer text-sm"
          >
            {language === 'ar' ? 'حفظ النتيجة' : 'Save Result'}
          </button>
        )}

        <button
          onClick={onDownloadImage}
          className="w-full px-4 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {language === 'ar' ? 'تحميل كصورة' : 'Download as Image'}
        </button>

        <button
          onClick={onToggleSavedResults}
          className={`w-full px-4 py-2.5 sm:px-6 sm:py-3 bg-white text-[#3a3b3a] border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium cursor-pointer text-sm ${currentSavedResult ? 'sm:col-span-2' : 'lg:col-span-1'}`}
        >
          {language === 'ar' ? 'النتائج المحفوظة' : 'Saved Results'} ({savedResultsCount})
        </button>
      </div>
    </div>
  );
};

export default Results;
