import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Prevent scrolling when loading screen is visible
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 400);
        }, 2100); // Show for 2.1 seconds to match animation

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, [onComplete, isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#fafafa] overflow-hidden"
        >
            <div className="relative w-full max-w-6xl px-4 sm:px-8 lg:px-12 text-center">
                <motion.div
                    className="text-6xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-9xl 2xl:text-9xl font-black tracking-tight text-[#3a3b3a] whitespace-nowrap inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <motion.div className="relative inline-block">
                        <motion.span
                            animate={{ 
                                opacity: [1, 1, 0, 0],
                                y: [0, 0, -10, -10]
                            }}
                            transition={{ 
                                duration: 0.7, 
                                ease: 'easeInOut'
                            }}
                            className="inline-block relative pr-2"
                        >
                            DESIGN
                            {/* Custom punctuation mark */}
                            <span className="inline-block align-bottom ml-1">
                                <span className="relative inline-block">
                                    <span className="block bg-[#f2ae1d] h-[0.7em] w-[0.18em] min-w-[3px]"></span>
                                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[0.12em] min-w-[3px] h-[0.12em] min-h-[3px] bg-[#3a3b3a] rounded-full"></span>
                                    
                                </span>
                            </span>
                        </motion.span>
                        <motion.span
                            animate={{ 
                                opacity: [0, 0, 1, 1, 0, 0],
                                y: [10, 10, 0, 0, -10, -10]
                            }}
                            transition={{ 
                                duration: 1.4, 
                                ease: 'easeInOut'
                            }}
                            className="inline-block absolute left-0"
                        >
                            DEVELOP
                            {/* Custom punctuation mark */}
                            <span className="inline-block align-bottom ml-1">
                                <span className="relative inline-block">
                                    <span className="block bg-[#f2ae1d] h-[0.7em] w-[0.18em] min-w-[3px]"></span>
                                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[0.12em] min-w-[3px] h-[0.12em] min-h-[3px] bg-[#3a3b3a] rounded-full"></span>
                                </span>
                            </span>
                        </motion.span>
                        <motion.span
                            animate={{ 
                                opacity: [0, 0, 0, 0, 1, 1],
                                y: [10, 10, 10, 10, 0, 0]
                            }}
                            transition={{ 
                                duration: 2.1, 
                                ease: 'easeInOut'
                            }}
                            className="inline-block absolute left-0"
                        >
                            DELIVER
                            {/* Custom punctuation mark */}
                            <span className="inline-block align-bottom ml-1">
                                <span className="relative inline-block">
                                    <span className="block bg-[#f2ae1d] h-[0.7em] w-[0.18em] min-w-[3px]"></span>
                                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[0.12em] min-w-[3px] h-[0.12em] min-h-[3px] bg-[#3a3b3a] rounded-full"></span>
                                </span>
                            </span>
                        </motion.span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};