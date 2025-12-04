import { FAQ, FAQs } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// --- CUSTOM COLORS DERIVED FROM YOUR CARD ---
// Adjusted light theme colors for clean separation and contrast
const LIGHT_BG = "#FAFAFA";               // Main section background
const CARD_BACKGROUND_COLOR = "#ffffff";  // Card Background (White)
const ACCENT_COLOR = "#f2ae1d";          // Accent (Gold/Yellow)
const QUESTION_COLOR = "#2C2C2C";        // Primary Dark Text (Question)
const ANSWER_COLOR = "#666666";          // Muted Gray Text (Answer)
const BORDER_COLOR = "#E5E5E5";          // Light Border/Line
const MAIN_TEXT_COLOR = "#3a3b3a";        // Main Text color for non-card elements
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
        // Main section background set to LIGHT_BG for contrast (or keep transparent if needed)
        <section
            className={`py-10 `}
            style={{ backgroundColor: LIGHT_BG }}
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

                    {/* 1. Image Section (Left - 5/12 columns) - Image styling remains from your last version */}
                    {hasImage && (
                        <div className="lg:col-span-5 lg:sticky lg:top-16 lg:h-full">
                            <div
                                className="w-full relative overflow-hidden h-full rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-gray-400/30"
                                style={{ border: `1px solid ${BORDER_COLOR}` }}
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

                        {/* FAQ List: Tightly Spaced CARDS */}
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-4"
                            defaultValue={defaultOpenItem}
                        >
                            {faqList.length === 0 ? (
                                <div className="p-6 text-center border rounded-xl shadow-md" style={{ borderColor: BORDER_COLOR, backgroundColor: CARD_BACKGROUND_COLOR }}>
                                    <p className="text-gray-500">No questions available.</p>
                                </div>
                            ) : (
                                faqList.map((faq, index) => (
                                    <AccordionItem
                                        key={faq.id}
                                        value={`item-${faq.id}`}
                                        // p-0 here, but the trigger and content will get the padding
                                        className={`p-0 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg border`}
                                        style={{
                                            backgroundColor: CARD_BACKGROUND_COLOR,
                                            borderColor: BORDER_COLOR
                                        }}
                                    >
                                        {/* AccordionTrigger: Receives the p-6 padding to make the entire area clickable */}
                                        <AccordionTrigger
                                            className={`text-left text-lg md:text-xl font-medium p-6 group hover:no-underline`}
                                            style={{ color: QUESTION_COLOR }}
                                        >
                                            <span className={`flex-1 pr-6 transition-colors duration-300 group-hover:text-[${ACCENT_COLOR}]`}>
                                                {faq.question}
                                            </span>
                                        </AccordionTrigger>

                                        <AccordionContent
                                            // Adjusted padding for the content area: top=0, bottom=p-6, horizontal=p-6.
                                            // This creates the continuous p-6 margin around the whole element when open.
                                            className={`pt-0 pb-6 px-6 leading-relaxed text-base`}
                                            style={{ color: ANSWER_COLOR }}
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