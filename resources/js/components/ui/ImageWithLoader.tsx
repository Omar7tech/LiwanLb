import { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageWithLoaderProps {
    src: string;
    alt: string;
    className?: string;
    onClick?: () => void;
}

export const ImageWithLoader = ({ src, alt, className, onClick }: ImageWithLoaderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 rounded-lg">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-6 w-6 border-2 border-yellow-500 border-t-transparent rounded-full"
                    />
                </div>
            )}
            
            {hasError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 rounded-lg">
                    <div className="text-center text-neutral-400">
                        <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs mt-1">Failed to load</p>
                    </div>
                </div>
            ) : null}
            
            <img
                src={src}
                alt={alt}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${onClick ? 'cursor-pointer hover:opacity-90' : ''}`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
                loading="lazy"
                onClick={onClick}
            />
        </div>
    );
};
