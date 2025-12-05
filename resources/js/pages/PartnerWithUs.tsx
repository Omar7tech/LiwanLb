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

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const scrollToInquiry = () => {
        const element = inquiryRef.current;
        if (element) {
            const yOffset = -100; 
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const features = [
        {
            number: "01",
            title: "Innovative Projects",
            description: "Work on cutting-edge architectural projects that push boundaries and redefine spaces."
        },
        {
            number: "02",
            title: "Collaborative Team",
            description: "Join a passionate team of architects, designers, and visionaries dedicated to excellence."
        },
        {
            number: "03",
            title: "Growth Opportunities",
            description: "Expand your portfolio and expertise with diverse projects across residential and commercial sectors."
        },
        {
            number: "04",
            title: "Award-Winning Work",
            description: "Be part of a studio recognized for design excellence and architectural innovation."
        }
    ];

    return (
        <>
            <Head title="Partner With Us" />
            <AppLayout>
                <div>
            {/* Hero Section */}
            <section ref={heroRef} className="pt-16 pb-20 px-5 md:px-16">
                <motion.div 
                    style={{ y }}
                    className="max-w-[1400px]"
                >
                    

                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="text-[clamp(3.5rem,12vw,14rem)] font-extralight leading-[0.85] tracking-tight mb-12"
                    >
                        <span className="block text-[#1a1a1a]">Partner</span>
                        <span className="block text-[#1a1a1a]">With</span>
                        <span className="block text-[#F2AE1D] italic font-light">Liwan</span>
                    </motion.h1>

                    <motion.div
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
                            className="group flex items-center gap-3 text-[#1a1a1a] border-b-2 border-[#F2AE1D] pb-2 hover:gap-4 transition-all duration-300 self-start"
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
                </motion.div>
            </section>



            {/* CTA Section */}
            <section className="py-20 px-5 md:px-16 lg:px-24">
                <div className="max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="border-t border-gray-200 pt-20"
                    >
                        <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-extralight leading-[0.9] tracking-tight text-[#1a1a1a] mb-12">
                            Ready to create<br />something amazing?
                        </h2>
                        
                        <button
                            onClick={scrollToInquiry}
                            className="group inline-flex items-center gap-4 text-xl text-[#1a1a1a] border-b-2 border-[#F2AE1D] pb-3 hover:gap-6 transition-all duration-300"
                        >
                            <span className="font-medium uppercase tracking-wider">Let's Talk</span>
                            <svg 
                                className="w-7 h-7 transition-transform group-hover:translate-x-2" 
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
                <InquirySection />
            </div>
                </div>
            </AppLayout>
        </>
    )
}

export default PartnerWithUs