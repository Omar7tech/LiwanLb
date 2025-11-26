import BuiltFor from '@/components/sections/BuiltFor';
import HeroSection from '@/components/sections/HeroSection';
import OnePartner from '@/components/sections/OnePartner';
import OurDesignDeliveryStandards from '@/components/sections/OurDesignDeliveryStandards';
import AppLayout from '@/layouts/app-layout';
import {  DesignDeliveryStandards } from '@/types';
import { Head } from '@inertiajs/react';

export default function Welcome({designDeliveryStandards}: {designDeliveryStandards: DesignDeliveryStandards}) {
    console.log(designDeliveryStandards);
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
                <>
                    <HeroSection />
                    <div className="flex w-full justify-center px-5 py-10 text-center align-middle text-3xl text-[#3a3b3a] md:text-5xl md:font-extralight lg:text-8xl">
                        <p>هندسة . بناء . اشراف</p>
                    </div>
                    <OnePartner />
                    <BuiltFor />
                    {designDeliveryStandards?.data && designDeliveryStandards.data.length > 0 && (
                        <OurDesignDeliveryStandards designDeliveryStandards={designDeliveryStandards} />
                    )}
                </>
            </AppLayout>
        </>
    );
}
