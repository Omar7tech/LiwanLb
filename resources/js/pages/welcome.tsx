import BuiltFor from '@/components/sections/BuiltFor';
import HeroSection from '@/components/sections/HeroSection';
import OnePartner from '@/components/sections/OnePartner';
import OurDesignDeliveryStandards from '@/components/sections/OurDesignDeliveryStandards';
import TestimonialsSection from '@/components/sections/Testimonials';
import WhatsAppButton from '@/components/WhatsAppButton';
import AppLayout from '@/layouts/app-layout';
import { DesignDeliveryStandards, Testimonials } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Welcome({ designDeliveryStandards, testimonials }: { designDeliveryStandards: DesignDeliveryStandards, testimonials: Testimonials }) {
    console.log(designDeliveryStandards);
    return (
        <>
            <Head title="Welcome">
                <meta head-key="description" name="description" content="We listen first, design spaces that reflect your identity, carry purpose, and deliver lasting value." />
                <meta head-key="keywords" name="keywords" content="design, creative, residency, collaboration, innovation, art, architecture, design standards" />
                <meta head-key="og:title" property="og:title" content="Welcome - Liwan Architecture" />
                <meta head-key="og:description" property="og:description" content="We listen first, design spaces that reflect your identity, carry purpose, and deliver lasting value." />
                <meta head-key="og:image" property="og:image" content="/images/logo.png" />
                <meta head-key="og:url" property="og:url" content={window.location.origin} />
                <meta head-key="og:type" property="og:type" content="website" />
                <meta head-key="og:site_name" property="og:site_name" content="Liwan Architecture" />
                <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
                <meta head-key="twitter:title" name="twitter:title" content="Welcome - Liwan Architecture" />
                <meta head-key="twitter:description" name="twitter:description" content="We listen first, design spaces that reflect your identity, carry purpose, and deliver lasting value." />
                <meta head-key="twitter:image" name="twitter:image" content="/images/logo.png" />
                <meta head-key="structured-data" name="structured-data" content="welcome">
                    <script type="application/ld+json">
                        {JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebPage',
                            'name': 'Welcome - Liwan Architecture',
                            'description': 'We listen first, design spaces that reflect your identity, carry purpose, and deliver lasting value.',
                            'url': window.location.origin,
                            'image': '/images/logo.png',
                            'mainEntity': {
                                '@type': 'Organization',
                                'name': 'Liwan Architecture'
                            }
                        })}
                    </script>
                </meta>
                <link head-key="preconnect" rel="preconnect" href="https://fonts.bunny.net" />
                <link head-key="stylesheet" href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <AppLayout>
                <>
                    <HeroSection />
                    <OnePartner />
                    <BuiltFor />
                    {designDeliveryStandards?.data && designDeliveryStandards.data.length > 0 && (
                        <OurDesignDeliveryStandards designDeliveryStandards={designDeliveryStandards} />
                    )}

                    <TestimonialsSection testimonials={testimonials} />

                    <div className="py-10">
                        <WhatsAppButton />
                    </div>

                </>
            </AppLayout>
        </>
    );
}
