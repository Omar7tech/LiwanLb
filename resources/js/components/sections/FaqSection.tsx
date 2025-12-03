import { FAQ, FAQs } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// --- CUSTOM COLORS DERIVED FROM YOUR CARD ---
const CARD_BACKGROUND_COLOR = "#3a3b3a"; // Card Background
const ACCENT_COLOR = "#f2ae1d";          // Accent (Gold/Yellow)
const TEXT_COLOR_LIGHT = "#d9d9d9";      // Primary Light Text (Card Content)
const TEXT_COLOR_MUTED = "#afafaf";      // Muted Gray Text (Question)
const LINE_COLOR_DARK = "#4a4a4a";        // Darker line/border for structure
const MAIN_TEXT_COLOR = "#3a3b3a";       // Main Text color for non-card elements (since main section is transparent)
const DEFAULT_IMAGE = "/images/blognoimage.webp";
// ------------------------------------------

// Simple container fade-in
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.7,
        }
    }
};

interface FaqSectionProps {
    faqs?: FAQs;
    workImage?: string;
    overlayText?: string;
}

export default function FaqSection({ faqs, workImage, overlayText }: FaqSectionProps) {
    const faqList = faqs?.data || [];
    const hasImage = !!workImage;
    const [imageSrc, setImageSrc] = useState(workImage ?? DEFAULT_IMAGE);
    const [isLoadingImage, setIsLoadingImage] = useState(!!workImage);

    useEffect(() => {
        setImageSrc(workImage ?? DEFAULT_IMAGE);
        setIsLoadingImage(!!workImage);
    }, [workImage]);

    const defaultOpenItem = faqList.length > 0 ? `item-${faqList[0].id}` : undefined;

    return (
        // Main section is TRANSPARENT, general text is dark
        <section
            className={`text-[${MAIN_TEXT_COLOR}] py-10 `}
            style={{ backgroundColor: 'transparent' }}
        >

            <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className={`max-w-screen-2xl mx-auto px-5 `}
            >

                {/* Responsive Grid Layout (Image Left, FAQs Right) */}
                <div
                    className={`grid ${hasImage ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'} gap-12 lg:gap-16 items-start`}
                >

                    {/* 1. Image Section (Left - 5/12 columns) */}
                    {hasImage && (
                        <div className="lg:col-span-5 lg:sticky lg:top-16 lg:h-full">
                            <div
                                // Image container with rounded corners, hover effect, and border
                                className="w-full relative overflow-hidden h-full rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-gray-400/30"
                                style={{
                                    border: `1px solid ${MAIN_TEXT_COLOR}` // Dark border for the visual
                                }}
                            >
                                {isLoadingImage && (
                                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#f2ae1d] rounded-full animate-spin"></div>
                                        </div>
                                    </div>
                                )}
                                <img
                                    src={imageSrc}
                                    alt="Project Visual"
                                    loading="lazy"
                                    onLoad={() => setIsLoadingImage(false)}
                                    onError={() => {
                                        setImageSrc(DEFAULT_IMAGE);
                                        setIsLoadingImage(false);
                                    }}
                                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoadingImage ? "opacity-0" : "opacity-100"}`}
                                />
                                {/* Overlay Text on Image */}
                                {overlayText && (
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                                        <p className="text-white text-lg font-light italic">
                                            {overlayText}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 2. FAQs Section (Right - 7/12 columns) */}
                    <div className={`space-y-4 ${hasImage ? 'lg:col-span-7' : 'max-w-4xl mx-auto'}`}>

                        {/* NO HEADER / NO TITLE */}

                        {/* FAQ List: Tightly Spaced DARK CARDS */}
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-4"
                            defaultValue={defaultOpenItem}
                        >
                            {faqList.length === 0 ? (
                                <div className="p-6 text-center border rounded-lg" style={{ borderColor: LINE_COLOR_DARK, backgroundColor: 'white' }}>
                                    <p className="text-gray-500">No questions available.</p>
                                </div>
                            ) : (
                                faqList.map((faq, index) => (
                                    <AccordionItem
                                        key={faq.id}
                                        value={`item-${faq.id}`}
                                        className={`p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md border`}
                                        style={{ 
                                            backgroundColor: '#FAFAFA',
                                            borderColor: '#E5E5E5'
                                        }}
                                    >
                                        <AccordionTrigger
                                            className={`text-left text-lg md:text-xl font-normal py-2 group hover:no-underline`}
                                            style={{ color: '#2C2C2C' }}
                                        >
                                            <span className={`flex-1 pr-4 transition-colors duration-300 group-hover:text-[${ACCENT_COLOR}]`}>
                                                {faq.question}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent
                                            className={`pt-3 pb-1 leading-relaxed text-base`}
                                            style={{ color: '#666666' }}
                                        >
                                            <p>{faq.answer}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))
                            )}
                        </Accordion>

                    </div>
                </div>
            </motion.div>
        </section>
    );
}
