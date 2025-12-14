import TestimonialsSection from "@/components/sections/Testimonials";
import FaqSection from "@/components/sections/FaqSection";
import ResidenciesSection from "@/components/sections/ResidenciesSection";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Work, Residencies, SharedData, Testimonials } from '@/types'
import WhatsAppButton from "@/components/WhatsAppButton";
import InquirySection from "@/components/sections/InquirySection";
import { useRef } from "react";
import TextType from "@/components/TextType";
import { motion, useScroll, useTransform } from "framer-motion";


export default function Show({ work, residencies, testimonials }: { work: Work; residencies: Residencies; testimonials: Testimonials }) {
    const { auth } = usePage<SharedData>().props;
    const faqs = work.faqs;

    // Only show process section if there's actual data
    const hasProcessData = work.process_title || (work.process_steps && work.process_steps.length > 0);

    const processRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ["start start", "end start"]
    });

    const { scrollYProgress: pageScroll } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    const bgY1 = useTransform(pageScroll, [0, 1], ["0%", "200%"]);
    const bgY2 = useTransform(pageScroll, [0, 1], ["0%", "-100%"]);
    const bgRotate = useTransform(pageScroll, [0, 1], [0, 720]);

    const scrollToProcess = () => {
        processRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const buttonClass =
        "cursor-pointer rounded-lg bg-[#F2AE1D] px-4 py-3 md:px-3 md:py-2 text-lg md:text-xl font-bold text-white transition-all hover:opacity-95 hover:scale-105 hover:shadow-lg flex items-center gap-2 whitespace-nowrap text-center justify-center";

    return (
        <>
            <Head title={work.title || work.name} />
            <AppLayout>
                <div ref={containerRef} className="relative">
                    {/* Animated Background Elements */}
                    <motion.div
                        style={{ y: bgY1, rotate: bgRotate }}
                        className="fixed top-20 right-10 w-96 h-96 border-2 border-[#F2AE1D]/10 rounded-full pointer-events-none -z-10"
                    />
                    <motion.div
                        style={{ y: bgY2 }}
                        className="fixed bottom-20 left-10 w-64 h-64 border-2 border-[#F2AE1D]/10 rounded-full pointer-events-none -z-10"
                    />
                    <motion.div
                        style={{ y: bgY1 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#F2AE1D]/5 rounded-full pointer-events-none -z-10"
                    />

                    {/* Hero Section with Parallax */}
                    <div ref={headerRef} className="relative overflow-hidden">
                        <motion.div
                            style={{ y, opacity }}
                            className="w-full"
                        >
                            <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold p-5 text-[#3a3b3a]">
                                <TextType
                                    text={[work.title || `Liwan For Every ${work.name}`]}
                                    typingSpeed={50}
                                    pauseDuration={2500}
                                    showCursor={false}
                                    loop={false}
                                />
                            </h1>
                        </motion.div>
                    </div>

                    {/* FAQ Section with entrance animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <FaqSection faqs={faqs} workImage={work.image} overlayText={work.visual_text} />
                    </motion.div>

                    {/* Action Buttons Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
                    >
                        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-6 w-full max-w-md md:max-w-none mx-auto">
                            {/* Calculate The Cost */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="w-full md:w-auto"
                            >
                                <Link
                                viewTransition
                                    href="/cost-study"
                                    className={`${buttonClass} w-full md:w-auto`}
                                >
                                    Calculate The Cost
                                </Link>
                            </motion.div>

                            {/* Meet The Architect */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="w-full md:w-auto"
                            >
                                <WhatsAppButton fullWidth className="px-4 py-3 text-lg md:px-3 md:py-2 md:text-xl" />
                            </motion.div>

                            {/* Check The Process - Only show if there's process data */}
                            {hasProcessData && (
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    onClick={scrollToProcess}
                                    className={`${buttonClass} w-full md:w-auto`}
                                >
                                    Check The Process
                                </motion.button>
                            )}
                        </div>
                    </motion.div>

                    {/* Residencies Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <ResidenciesSection residencies={residencies} />
                    </motion.div>

                    {hasProcessData && (
                        <>
                            <motion.section 
                                ref={processRef} 
                                initial={{ opacity: 0, x: -20, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true, margin: "-20px" }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="my-16"
                            >
                                <p className="text-[#3a3b3a] text-2xl md:text-4xl lg:text-7xl font-bold p-5 flex flex-col">
                                    {work.process_title?.split("\n").map((line: string, index: number) => (
                                        <motion.span 
                                            key={index}
                                            initial={{ opacity: 0, x: -15 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-10px" }}
                                            transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
                                        >
                                            {line}
                                        </motion.span>
                                    ))}
                                </p>
                            </motion.section>

                            <section className="mx-auto px-5 mb-32">
                                <div className="flex flex-col">
                                    {work.process_steps?.map((step: { title: string; description: string }, index: number) => (
                                        <motion.div 
                                            key={index} 
                                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-10px" }}
                                            transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
                                            className="flex flex-col gap-2 pb-10 last:pb-0"
                                        >
                                            <h3 className="text-sm md:text-2xl lg:text-3xl font-bold text-[#3a3b3a]">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm md:text-2xl lg:text-2xl text-gray-500 font-light">
                                                {step.description}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}

                    {testimonials.data.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <TestimonialsSection testimonials={testimonials} showTitle={false} />
                        </motion.div>
                    )}

                    <div className="mt-20" />
                    
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <InquirySection preselectedWork={work.name} />
                    </motion.div>
                </div>
            </AppLayout>
        </>
    );
}
