import HeroSection from '@/components/sections/HeroSection';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Welcome() {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleLoadingComplete = () => {
        setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = 'unset';
            setTimeout(() => {
                setShowContent(true);
            }, 300);
        }, 500);
    };

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen onComplete={handleLoadingComplete} />
                )}
            </AnimatePresence>

            <AppLayout>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoading ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden"
                >
                    <BackgroundRippleEffect />
                    {showContent && <HeroSection />}
                </motion.div>

                
            </AppLayout>
        </>
    );
}
