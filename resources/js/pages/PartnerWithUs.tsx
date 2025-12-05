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

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const scrollToInquiry = () => {
        const element = inquiryRef.current;
        if (element) {
            const yOffset = -100; // Offset for navbar height
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const features = [
        {
            title: "Innovative Projects",
            description: "Work on cutting-edge architectural projects that push boundaries and redefine spaces."
        },
        {
            title: "Collaborative Team",
            description: "Join a passionate team of architects, designers, and visionaries dedicated to excellence."
        },
        {
            title: "Growth Opportunities",
            description: "Expand your portfolio and expertise with diverse projects across residential and commercial sectors."
        },
        {
            title: "Award-Winning Work",
            description: "Be part of a studio recognized for design excellence and architectural innovation."
        }
    ];

    return (
        <>
            <Head title="Partner With Us" />
            <AppLayout>
                {/* Hero Section */}
                <section ref={heroRef} className="relative overflow-hidden min-h-[80vh] flex items-center">
                    <motion.div 
                        style={{ y, opacity }}
                        className="relative max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-32 w-full"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-extralight mb-6 leading-tight text-[#3a3b3a]"
                            >
                                Partner With
                                <motion.span 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="block text-[#F2AE1D] font-light mt-2"
                                >
                                    Liwan
                                </motion.span>
                            </motion.h1>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto mb-10"
                            >
                                Join forces with Lebanon's premier architectural studio. Together, we'll create spaces that inspire, innovate, and endure.
                            </motion.p>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                                onClick={scrollToInquiry}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#F2AE1D] text-white font-semibold rounded-lg hover:bg-[#d99a1a] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Send Us an Inquiry
                                <svg 
                                    className="w-5 h-5 transition-transform group-hover:translate-y-1" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.05 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute top-20 right-10 w-64 h-64 border-2 border-[#F2AE1D] rounded-full"
                        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.05 }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="absolute bottom-20 left-10 w-48 h-48 border-2 border-[#F2AE1D] rounded-full"
                        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]) }}
                    />
                </section>

                {/* Why Partner Section */}
                <section className="py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-5 md:px-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12 md:mb-16"
                        >
                            <h2 className="text-4xl md:text-6xl font-extralight text-[#3a3b3a] mb-4">
                                Why Partner With Us?
                            </h2>
                            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                                We believe in the power of collaboration to create extraordinary architectural experiences.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="group border-l-4 border-gray-200 pl-6 py-4 hover:border-[#F2AE1D] transition-all duration-300"
                                >
                                    <h3 className="text-xl md:text-2xl font-semibold text-[#3a3b3a] mb-2 group-hover:text-[#F2AE1D] transition-colors duration-300">
                                        {feature.title}
                                    </h3>

                                    <p className="text-gray-600 font-light leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-20">
                    <div className="max-w-4xl mx-auto px-5 md:px-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-light text-[#3a3b3a] mb-6">
                                Ready to Create Something Amazing?
                            </h2>
                            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                                Whether you're a contractor, developer, or fellow designer, we'd love to explore how we can collaborate to bring exceptional architectural visions to life.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Inquiry Section */}
                <div ref={inquiryRef}>
                    <InquirySection />
                </div>
            </AppLayout>
        </>
    )
}

export default PartnerWithUs

