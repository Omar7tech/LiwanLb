import BuiltFor from '@/components/sections/BuiltFor';
import HeroSection from '@/components/sections/HeroSection';
import OnePartner from '@/components/sections/OnePartner';
import OurDesignDeliveryStandards from '@/components/sections/OurDesignDeliveryStandards';
import TestimonialsSection from '@/components/sections/Testimonials';
import WhatsAppButton from '@/components/WhatsAppButton';
import AppLayout from '@/layouts/app-layout';
import {  DesignDeliveryStandards, Testimonials } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Welcome({designDeliveryStandards , testimonials}: {designDeliveryStandards: DesignDeliveryStandards , testimonials : Testimonials}) {
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
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex w-full justify-center px-5 py-10 text-center align-middle text-3xl text-[#3a3b3a] md:text-5xl md:font-extralight lg:text-8xl"
                    >
                        <p>هندسة . بناء . اشراف</p>
                    </motion.div>
                    <OnePartner />
                    <BuiltFor />
                    {designDeliveryStandards?.data && designDeliveryStandards.data.length > 0 && (
                        <OurDesignDeliveryStandards designDeliveryStandards={designDeliveryStandards} />
                    )}

                    <TestimonialsSection testimonials={testimonials}/>
                    
                    <div className="py-10">
                        <WhatsAppButton />
                    </div>

                </>
            </AppLayout>
        </>
    );
}
