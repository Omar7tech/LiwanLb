import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const words = ['DESIGN', 'DEVELOP', 'DELIVER'];

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

    useEffect(() => {
        const wordTimer = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 700); // Switch words every 700ms

        return () => clearInterval(wordTimer);
    }, []);

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
                    <div className="inline-grid grid-cols-[auto_1fr] items-center gap-0">
                        <span className="col-start-1 row-start-1">
                            D
                        </span>
                        <span className="col-start-2 row-start-1">
                            {words[currentWordIndex].substring(1)}
                        </span>
                        {/* Custom punctuation mark */}
                        <span className="inline-block align-bottom ml-1 col-start-3 row-start-1">
                            <span className="relative inline-block">
                                <span className="block bg-[#f2ae1d] h-[0.7em] w-[0.18em] min-w-[3px]"></span>
                                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[0.12em] min-w-[3px] h-[0.12em] min-h-[3px] bg-[#3a3b3a] rounded-full"></span>
                            </span>
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};