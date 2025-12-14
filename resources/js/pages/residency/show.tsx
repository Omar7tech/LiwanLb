import AppLayout from "@/layouts/app-layout"
import { Residency } from "@/types"
import { Head } from "@inertiajs/react"
import ResidencyContentSection from "@/components/Residencies/ResidencyContentSection"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

function Show({residency}: {residency: Residency}) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const nameWords = residency.name.split(' ');
    
    const pageTitle = residency.name || "Residency";
    const description = (residency as any).description || 
        (residency.content?.data && residency.content.data.length > 0 
            ? residency.content.data[0].content?.replace(/<[^>]*>/g, '').substring(0, 160) + '...' 
            : 'Explore our residency programs and discover creative opportunities.');
    const imageUrl = residency.image || '/images/residenceNoImg.webp';
    const siteUrl = window.location.origin + '/residency/' + residency.slug;

    return (
        <>
            <Head>
                <title>{`${pageTitle} - Residency`}</title>
                <meta head-key="description" name="description" content={description} />
                <meta head-key="og:title" property="og:title" content={pageTitle} />
                <meta head-key="og:description" property="og:description" content={description} />
                <meta head-key="og:image" property="og:image" content={imageUrl} />
                <meta head-key="og:url" property="og:url" content={siteUrl} />
                <meta head-key="og:type" property="og:type" content="article" />
                <meta head-key="og:site_name" property="og:site_name" content="Residency" />
                <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
                <meta head-key="twitter:title" name="twitter:title" content={pageTitle} />
                <meta head-key="twitter:description" name="twitter:description" content={description} />
                <meta head-key="twitter:image" name="twitter:image" content={imageUrl} />
                <meta head-key="structured-data" name="structured-data" content="residency">
                    <script type="application/ld+json">
                        {JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Article',
                            'headline': pageTitle,
                            'description': description,
                            'image': imageUrl,
                            'author': {
                                '@type': 'Organization',
                                'name': 'Residency'
                            },
                            'url': siteUrl
                        })}
                    </script>
                </meta>
            </Head>
            <AppLayout>
                <div ref={containerRef} className="relative bg-[#fafafa]">

                    {/* ================= MOBILE HERO ================= */}
                    <div className="md:hidden relative min-h-screen w-full overflow-hidden flex flex-col pt-32 pb-0 z-10">
                        


                        {/* Title - Staggered Animation */}
                        <div className="relative z-30 px-12 mb-10">
                            {nameWords.map((word, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                >
                                    <h1 className="text-[#3a3b3a] text-[75px] font-light leading-[0.85] tracking-tighter wrap-break-word -ml-1">
                                        {word}
                                    </h1>
                                </motion.div>
                            ))}
                        </div>

                        {/* Image - Full Bleed */}
                        <div className="flex-1 relative w-full">
                            <motion.div 
                                style={{ y }}
                                className="absolute inset-0 w-full h-[120%]"
                            >
                                <motion.div
                                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                                    animate={{ clipPath: 'inset(0 0 0 0)' }}
                                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full h-full relative"
                                >
                                    <img 
                                        src={residency.image || '/images/residenceNoImg.webp'} 
                                        alt={residency.name}
                                        className="w-full h-full object-cover grayscale-10 contrast-100"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#fafafa] via-transparent to-transparent opacity-20" />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Scroll Indicator */}
                        <motion.div 
                            style={{ opacity }}
                            className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-30"
                        >
                            <div className="h-16 w-px bg-[#3a3b3a]/20 overflow-hidden">
                                <motion.div 
                                    animate={{ y: ["-100%", "100%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-1/2 bg-[#f2ae1d]"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* ================= DESKTOP HERO ================= */}
                    <div className="hidden md:block relative min-h-[75vh] w-full z-10 overflow-hidden">
                        <div className="max-w-[1800px] mx-auto px-8 lg:px-16 h-full">
                            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center min-h-[75vh]">
                                
                                {/* Text Content - Clean & Spacious */}
                                <div className="col-span-5 z-20 relative">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        className="space-y-6"
                                    >

                                        
                                        <h1 className="text-[#3a3b3a] text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.05] tracking-tight">
                                            {residency.name}
                                        </h1>
                                    </motion.div>
                                </div>

                                {/* Image Content - Professional Frame */}
                                <div className="col-span-7 relative h-[65vh]">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                        className="relative h-full w-full rounded-2xl overflow-hidden group"
                                    >
                                        <img 
                                            src={residency.image || '/images/residenceNoImg.webp'} 
                                            alt={residency.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                        />
                                        
                                        {/* Subtle Overlay */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/5 via-transparent to-transparent" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="relative z-10 bg-[#fafafa] overflow-visible">
                        {residency.content?.data.map((section, index) => (
                            <ResidencyContentSection 
                                key={section.id} 
                                section={section} 
                                index={index} 
                            />
                        ))}
                        
                        {(!residency.content?.data || residency.content.data.length === 0) && (
                            <div className="text-center py-20 text-gray-500">
                                <p>No content details available for this residency yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </AppLayout>
        </>
    )
}

export default Show