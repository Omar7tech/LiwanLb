import { motion } from 'framer-motion';
import { ImageWithLoader } from './ImageWithLoader';

interface ImageModalProps {
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
    onClose: () => void;
}

export const ImageModal = ({ isOpen, imageSrc, imageAlt, onClose }: ImageModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-4xl max-h-[90vh] w-full"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                    aria-label="Close image"
                >
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image */}
                <div className="relative bg-white rounded-lg overflow-hidden">
                    <ImageWithLoader
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-full max-h-[80vh] object-contain"
                    />
                </div>
            </motion.div>

            {/* Background overlay to close */}
            <div
                className="absolute inset-0 -z-10"
                onClick={onClose}
            />
        </div>
    );
};
