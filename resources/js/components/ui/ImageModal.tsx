import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithLoader } from './ImageWithLoader';
import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageModalProps {
    isOpen: boolean;
    images: Array<{ src: string; alt: string }>;
    currentIndex: number;
    onClose: () => void;
}

export const ImageModal = ({ isOpen, images, currentIndex, onClose }: ImageModalProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
    const [zoomLevel, setZoomLevel] = useState(1);

    const navigateImage = useCallback((direction: 'prev' | 'next') => {
        if (images.length <= 1) return;
        
        if (direction === 'prev') {
            setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
        } else {
            setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
        }
        setZoomLevel(1);
    }, [images.length]);

    const handleZoom = useCallback((direction: 'in' | 'out') => {
        if (direction === 'in') {
            setZoomLevel(prev => Math.min(prev + 0.25, 3));
        } else {
            setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
        }
    }, []);

    const handleResetZoom = useCallback(() => {
        setZoomLevel(1);
    }, []);

    // Reset zoom when index changes
    useEffect(() => {
        setZoomLevel(1);
    }, [currentImageIndex]);

    // Sync with external currentIndex prop
    useEffect(() => {
         
        setCurrentImageIndex(currentIndex);
    }, [currentIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigateImage('prev');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                navigateImage('next');
            } else if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            } else if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                handleZoom('in');
            } else if (e.key === '-' || e.key === '_') {
                e.preventDefault();
                handleZoom('out');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, navigateImage, onClose, handleZoom]);

    if (!isOpen || images.length === 0) return null;

    const currentImage = images[currentImageIndex];
    const showNavigation = images.length > 1;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                {/* Top Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between"
                >
                    {/* Image Info */}
                    <div className="flex items-center gap-4">
                        {showNavigation && (
                            <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium">
                                {currentImageIndex + 1} / {images.length}
                            </div>
                        )}
                        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm max-w-xs truncate">
                            {currentImage.alt}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {/* Zoom Controls */}
                        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1">
                            <button
                                onClick={() => handleZoom('out')}
                                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                                aria-label="Zoom out"
                                disabled={zoomLevel <= 0.5}
                            >
                                <ZoomOut className="h-4 w-4" />
                            </button>
                            <div className="px-2 text-white text-sm font-medium min-w-[3rem] text-center">
                                {Math.round(zoomLevel * 100)}%
                            </div>
                            <button
                                onClick={() => handleZoom('in')}
                                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                                aria-label="Zoom in"
                                disabled={zoomLevel >= 3}
                            >
                                <ZoomIn className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-200 hover:scale-105"
                            aria-label="Close image"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </motion.div>

                {/* Main Image Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative max-w-7xl max-h-[85vh] w-full flex items-center justify-center"
                >
                    <div 
                        className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
                        style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease-out' }}
                    >
                        <ImageWithLoader
                            src={currentImage.src}
                            alt={currentImage.alt}
                            className="max-h-[80vh] object-contain cursor-grab active:cursor-grabbing"
                            onClick={handleResetZoom}
                            
                        />
                    </div>
                </motion.div>

                {/* Navigation Buttons */}
                {showNavigation && (
                    <>
                        {/* Left Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onClick={() => navigateImage('prev')}
                            className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 border border-white/20"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-7 w-7" />
                        </motion.button>

                        {/* Right Button */}
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onClick={() => navigateImage('next')}
                            className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 border border-white/20"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-7 w-7" />
                        </motion.button>
                    </>
                )}

                {/* Thumbnail Strip */}
                {showNavigation && images.length > 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-3 max-w-4xl overflow-x-auto"
                    >
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentImageIndex(index);
                                    setZoomLevel(1);
                                }}
                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                    index === currentImageIndex 
                                        ? 'border-white scale-110 shadow-lg' 
                                        : 'border-white/30 hover:border-white/60 hover:scale-105'
                                }`}
                            >
                                <ImageWithLoader
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Background overlay to close */}
                <div
                    className="absolute inset-0 -z-10"
                    onClick={onClose}
                />
            </div>
        </AnimatePresence>
    );
};
