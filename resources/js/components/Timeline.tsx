import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle, ChevronDown, Clock, ChevronRight } from 'lucide-react';
import { TimelineItem } from '../types/index';

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

interface TimelineModalProps {
  item: TimelineItem;
  isOpen: boolean;
  onClose: () => void;
}

const TimelineModal: React.FC<TimelineModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl w-full max-w-md max-h-[80vh] shadow-lg border border-neutral-200 flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-neutral-50 border-b border-neutral-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Active</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 leading-tight">{item.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-neutral-400 hover:text-neutral-600" />
              </button>
            </div>
            
            {item.date && (
              <div className="flex items-center gap-2 text-sm text-neutral-600 mt-2">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {item.children && item.children.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-neutral-900">Milestones</h4>
                  <span className="text-xs text-neutral-500 font-medium">{item.children.filter(c => c.is_active).length} of {item.children.length} completed</span>
                </div>
                
                <div className="space-y-2">
                  {item.children.map((child, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.15 }}
                      className={`group relative flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                        child.is_active 
                          ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100' 
                          : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="pt-0.5">
                        {child.is_active ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                            <CheckCircle className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-white border-2 border-neutral-300 flex items-center justify-center">
                            <Clock className="w-2.5 h-2.5 text-neutral-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium leading-snug mb-1 ${
                          child.is_active ? 'text-neutral-900' : 'text-neutral-500'
                        }`}>
                          {child.title}
                        </p>
                        {child.date && (
                          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(child.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        )}
                      </div>
                      
                      {child.is_active && (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Smart percentage calculator that considers all nested items
  const calculateSmartPercentage = (timelineItems: TimelineItem[]): number => {
    let totalItems = 0;
    let completedItems = 0;

    timelineItems.forEach(item => {
      // Count parent item
      totalItems++;
      if (item.is_active) {
        completedItems++;
      }

      // Count children items
      if (item.children && item.children.length > 0) {
        item.children.forEach(child => {
          totalItems++;
          if (child.is_active) {
            completedItems++;
          }
        });
      }
    });

    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const openModal = (item: TimelineItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 200);
  };

  const handleItemClick = (item: TimelineItem, index: number) => {
    if (!item.is_active) return;
    
    if (window.innerWidth >= 1024) {
      openModal(item);
    } else {
      toggleExpanded(index);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16 text-neutral-400">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
          <Clock className="w-6 h-6 text-neutral-300" />
        </div>
        <p className="text-sm font-medium">No timeline items available</p>
      </div>
    );
  }

  const smartPercentage = calculateSmartPercentage(items || []);

  return (
    <>
      <div className={className}>
        {/* Progress indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">Progress</span>
            <span className="text-xs font-bold text-emerald-600">{smartPercentage}%</span>
          </div>
          <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${smartPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full"
            />
          </div>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative px-4">
            {/* Timeline line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-neutral-200"></div>
            
            {/* Scrollable container */}
            <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400">
              <div className="flex gap-6 min-w-max py-1">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, type: 'spring', damping: 20, stiffness: 300 }}
                    className="relative w-40"
                  >
                    {/* Timeline dot */}
                    <div className="flex justify-center mb-3">
                      <motion.button
                        whileHover={item.is_active ? { scale: 1.1 } : {}}
                        whileTap={item.is_active ? { scale: 0.95 } : {}}
                        onClick={() => handleItemClick(item, index)}
                        disabled={!item.is_active}
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
                          item.is_active
                            ? 'bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-200 cursor-pointer ring-3 ring-emerald-100 hover:shadow-lg'
                            : 'bg-white border-2 border-neutral-300 text-neutral-400 cursor-not-allowed'
                        }`}
                      >
                        {item.is_active ? (
                          <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                        
                        {/* Pulse effect for active items */}
                        {item.is_active && (
                          <motion.div
                            animate={{ 
                              boxShadow: [
                                "0 0 0 0 rgba(16, 185, 129, 0.4)",
                                "0 0 0 8px rgba(16, 185, 129, 0)",
                                "0 0 0 0 rgba(16, 185, 129, 0.4)"
                              ]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0 rounded-full bg-emerald-400 opacity-20"
                          />
                        )}
                      </motion.button>
                    </div>

                    {/* Content card */}
                    <motion.button
                      whileHover={item.is_active ? { y: -2 } : {}}
                      onClick={() => handleItemClick(item, index)}
                      disabled={!item.is_active}
                      className={`group w-full bg-white rounded-lg border p-3 transition-all duration-200 text-left ${
                        item.is_active
                          ? 'border-neutral-200 shadow-sm hover:shadow-md hover:border-emerald-200 cursor-pointer'
                          : 'border-neutral-200 bg-neutral-50/50 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <h3 className={`font-semibold text-xs mb-1 line-clamp-2 leading-snug transition-colors duration-200 ${
                        item.is_active ? 'text-neutral-900 group-hover:text-emerald-700' : 'text-neutral-400'
                      }`}>
                        {item.title}
                      </h3>
                      
                      {item.date && (
                        <div className="flex items-center gap-1 text-xs text-neutral-500 mb-2">
                          <Calendar className="w-3 h-3" />
                          <span className="font-medium">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      )}
                      
                      {item.children && item.children.length > 0 && (
                        <div className={`flex items-center justify-between text-xs pt-1 border-t ${
                          item.is_active ? 'border-neutral-100' : 'border-neutral-200'
                        }`}>
                          <span className={item.is_active ? 'text-neutral-600 font-medium' : 'text-neutral-400'}>
                            {item.children.filter(c => c.is_active).length}/{item.children.length}
                          </span>
                          {item.is_active && (
                            <ChevronRight className="w-3 h-3 text-neutral-400 transition-all duration-200 group-hover:text-emerald-600 group-hover:translate-x-0.5" />
                          )}
                        </div>
                      )}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="lg:hidden">
          <div className="relative pl-10">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-neutral-200"></div>
            
            {/* Progress line */}
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${smartPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className="absolute left-4 top-0 w-0.5 bg-linear-to-b from-emerald-500 to-emerald-400"
            />
            
            <div className="space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, type: 'spring', damping: 20, stiffness: 300 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-10 top-2">
                    <motion.button
                      whileTap={item.is_active ? { scale: 0.9 } : {}}
                      onClick={() => handleItemClick(item, index)}
                      disabled={!item.is_active}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        item.is_active
                          ? 'bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-200 cursor-pointer'
                          : 'bg-white border-2 border-neutral-300 text-neutral-400 cursor-not-allowed'
                      }`}
                    >
                      {item.is_active ? (
                        <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>

                  {/* Content card */}
                  <motion.button
                    whileTap={item.is_active ? { scale: 0.98 } : {}}
                    onClick={() => handleItemClick(item, index)}
                    disabled={!item.is_active}
                    className={`w-full bg-white rounded-xl border p-4 transition-all duration-300 text-left ${
                      item.is_active
                        ? 'border-neutral-200 shadow-sm active:shadow-md cursor-pointer'
                        : 'border-neutral-200 bg-neutral-50/50 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm mb-2 leading-snug ${
                          item.is_active ? 'text-neutral-900' : 'text-neutral-400'
                        }`}>
                          {item.title}
                        </h3>
                        
                        {item.date && (
                          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="font-medium">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        )}
                        
                        {item.children && item.children.length > 0 && (
                          <div className={`text-xs ${item.is_active ? 'text-neutral-600' : 'text-neutral-400'}`}>
                            {item.children.filter(c => c.is_active).length}/{item.children.length} completed
                          </div>
                        )}
                      </div>
                      
                      {item.children && item.children.length > 0 && item.is_active && (
                        <motion.div
                          animate={{ rotate: expandedItems.has(index) ? 180 : 0 }}
                          transition={{ duration: 0.3, type: 'spring', damping: 15 }}
                          className="text-neutral-400"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>

                  {/* Expanded section (mobile only) */}
                  <AnimatePresence>
                    {expandedItems.has(index) && item.children && item.children.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, type: 'spring', damping: 20 }}
                        className="mt-3 overflow-hidden"
                      >
                        <div className="bg-linear-to-br from-neutral-50 to-neutral-100/50 rounded-xl border border-neutral-200/50 p-4 space-y-2">
                          {item.children.map((child, childIndex) => (
                            <motion.div
                              key={childIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: childIndex * 0.05, type: 'spring', damping: 20 }}
                              className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                                child.is_active 
                                  ? 'bg-emerald-50/50 border-emerald-200/50' 
                                  : 'bg-white border-neutral-200/50'
                              }`}
                            >
                              <div className="pt-0.5">
                                {child.is_active ? (
                                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <CheckCircle className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 rounded-full bg-white border-2 border-neutral-300 flex items-center justify-center">
                                    <Clock className="w-2.5 h-2.5 text-neutral-400" />
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-medium leading-snug ${
                                  child.is_active ? 'text-neutral-900' : 'text-neutral-500'
                                }`}>
                                  {child.title}
                                </p>
                                {child.date && (
                                  <div className="flex items-center gap-1 text-xs text-neutral-500 mt-1">
                                    <Calendar className="w-2.5 h-2.5" />
                                    <span>{new Date(child.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <TimelineModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Timeline;
