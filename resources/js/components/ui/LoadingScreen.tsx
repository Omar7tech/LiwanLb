import { motion } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const duration = 0.8; // 800ms

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black"
        >
            <div className="relative">
                {/* Ripple 1 */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.1, 1], opacity: [0, 0.4, 0] }}
                    transition={{
                        duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute inset-0 rounded-full bg-yellow-500/30 blur-xl"
                />

                {/* Ripple 2 */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.1, 1], opacity: [0, 0.25, 0] }}
                    transition={{
                        duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: duration * 0.2,
                    }}
                    className="absolute inset-0 rounded-full bg-yellow-400/20 blur-2xl"
                />

                {/* Logo */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: duration * 0.6,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative z-10"
                >
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-32 w-auto sm:h-40 md:h-48"
                    />
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration, ease: 'easeInOut' }}
                    onAnimationComplete={onComplete}
                    className="absolute -bottom-12 left-0 right-0 mx-auto h-1 w-64 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
                >
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration, ease: 'easeInOut' }}
                        className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};
