/* import { type SharedData } from '@/types'; */

import HeroSection from '@/components/sections/HeroSection';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
export default function Welcome() {
    /* const { auth } = usePage<SharedData>().props; */

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <AppLayout>
                <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
                    <BackgroundRippleEffect />
                    <HeroSection />
                </div>
                hey
            </AppLayout>
        </>
    );
}
