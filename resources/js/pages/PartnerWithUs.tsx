import InquirySection from "@/components/sections/InquirySection"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

function PartnerWithUs() {
    const inquiryRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const scrollToInquiry = () => {
        const element = inquiryRef.current;
        if (element) {
            const yOffset = -100; 
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };



    return (
        <>
            <Head title="Partner With Us">
                <meta head-key="description" name="description" content="Partner with Liwan Architecture to bring exceptional architectural visions to life. Whether you're a contractor, developer, or designer, let's collaborate on innovative design projects." />
                <meta head-key="keywords" name="keywords" content="partner, collaboration, architectural partnership, contractor, developer, designer, Liwan Architecture, design projects, architectural visions" />
                <meta head-key="og:title" property="og:title" content="Partner With Us - Liwan Architecture" />
                <meta head-key="og:description" property="og:description" content="Partner with Liwan Architecture to bring exceptional architectural visions to life. Whether you're a contractor, developer, or designer, let's collaborate on innovative design projects." />
                <meta head-key="og:image" property="og:image" content="/images/logo.png" />
                <meta head-key="og:url" property="og:url" content={window.location.origin + '/partner-with-us'} />
                <meta head-key="og:type" property="og:type" content="website" />
                <meta head-key="og:site_name" property="og:site_name" content="Liwan Architecture" />
                <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
                <meta head-key="twitter:title" name="twitter:title" content="Partner With Us - Liwan Architecture" />
                <meta head-key="twitter:description" name="twitter:description" content="Partner with Liwan Architecture to bring exceptional architectural visions to life. Whether you're a contractor, developer, or designer, let's collaborate on innovative design projects." />
                <meta head-key="twitter:image" name="twitter:image" content="/images/logo.png" />
                <meta head-key="structured-data" name="structured-data" content="partner-with-us">
                    <script type="application/ld+json">
                        {JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebPage',
                            'name': 'Partner With Us - Liwan Architecture',
                            'description': 'Partner with Liwan Architecture to bring exceptional architectural visions to life. Whether you\'re a contractor, developer, or designer, let\'s collaborate on innovative design projects.',
                            'url': window.location.origin + '/partner-with-us',
                            'image': '/images/logo.png',
                            'mainEntity': {
                                '@type': 'Organization',
                                'name': 'Liwan Architecture'
                            }
                        })}
                    </script>
                </meta>
            </Head>
            <AppLayout>
                <div>
            {/* Hero Section */}
            <section ref={heroRef} className="pt-16 pb-20 px-5 md:px-16 text-[#3a3b3a]">
                <div 
                    className="max-w-[1400px]"
                >
                    
                    <motion.h1 
                        style={{ y: titleY, opacity }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="text-[clamp(3.5rem,12vw,14rem)] font-extralight leading-[0.85] tracking-tight mb-12"
                    >
                        <h1>Partner With Us</h1>
                    </motion.h1>

                    <motion.div
                        style={{ y: contentY, opacity }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 max-w-6xl"
                    >
                        <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-xl">
                            Whether you're a contractor, developer, or fellow designer, we'd love to explore how we can collaborate to bring exceptional architectural visions to life.
                        </p>

                        <button
                            onClick={scrollToInquiry}
                            className="group flex items-center gap-3 text-[#3a3b3a] pb-2 hover:gap-4 transition-all duration-300 self-start"
                        >
                            <span className="text-base font-medium uppercase tracking-wider">Send Inquiry</span>
                            <svg 
                                className="w-6 h-6 transition-transform group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>



            {/* Inquiry Section */}
            <div ref={inquiryRef}>
                <InquirySection type="partner" />
            </div>
                </div>
            </AppLayout>
        </>
    )
}

export default PartnerWithUs