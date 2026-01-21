import React, { useState } from 'react'
import Card from '../Residencies/Card'
import { Residencies } from '@/types'
import { InfiniteScroll } from '@inertiajs/react'
import { motion, AnimatePresence } from 'framer-motion'

function ResidenciesSection({ residencies }: { residencies: Residencies }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="p-5 md:p-8">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Residency Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-white hover:text-[#f2ae1d] transition-colors bg-black/50 rounded-full"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <InfiniteScroll 
        data="residencies"
        manual
        next={({ loading, fetch, hasMore }) => (
            hasMore && (
                <div className="mt-12 flex justify-center w-full">
                    <button 
                        onClick={fetch} 
                        disabled={loading}
                        className="group flex items-center gap-3 rounded-full bg-[#f2ae1d] px-8 py-3 text-lg font-bold text-white transition-all duration-300 hover:bg-[#3a3b3a] hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#f2ae1d]"
                    >
                        {loading ? (
                            <>
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                <span>Loading...</span>
                            </>
                        ) : (
                            <>
                                <span>Load More</span>
                                <svg 
                                    className="h-6 w-6 transition-transform duration-300 group-hover:translate-y-1" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            )
        )}
      >
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3'>
            {residencies.data.map((residency) => (
                <Card 
                    key={residency.id} 
                    residency={residency} 
                    onImageClick={(img) => setSelectedImage(img)}
                />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default ResidenciesSection