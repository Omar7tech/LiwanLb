import { FAQ, FAQs } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { motion } from "framer-motion";

// --- CUSTOM COLORS DERIVED FROM YOUR CARD ---
const CARD_BACKGROUND_COLOR = "#3a3b3a"; // Card Background
const ACCENT_COLOR = "#f2ae1d";          // Accent (Gold/Yellow)
const TEXT_COLOR_LIGHT = "#d9d9d9";      // Primary Light Text (Card Content)
const TEXT_COLOR_MUTED = "#afafaf";      // Muted Gray Text (Question)
const LINE_COLOR_DARK = "#4a4a4a";        // Darker line/border for structure
const MAIN_TEXT_COLOR = "#3a3b3a";       // Main Text color for non-card elements (since main section is transparent)
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

export default function FaqSection({ faqs, workImage }: { faqs?: FAQs; workImage?: string }) {
    const faqList = faqs?.data || [];
    const hasImage = !!workImage;
    
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
                className={`max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8`}
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
                                <img
                                    src={workImage}
                                    alt="Project Visual"
                                    className="w-full h-full object-cover" 
                                />
                                {/* Overlay Text on Image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                                    <p className="text-white text-lg font-light italic">
                                        Visualizing clarity in every architectural proposition.
                                    </p>
                                </div>
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
                                        // CARD STYLING: Dark background, light text, gold hover/accent
                                        className={`p-4 rounded-lg shadow-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(242,174,29,0.3)]`}
                                        style={{ backgroundColor: CARD_BACKGROUND_COLOR, border: `1px solid ${LINE_COLOR_DARK}` }}
                                    >
                                        <AccordionTrigger 
                                            // Question Text color is muted light by default
                                            className={`text-left text-lg md:text-xl font-normal py-1 px-2 group`}
                                            style={{ color: TEXT_COLOR_MUTED }}
                                        >
                                            <span className="flex items-center gap-4">
                                                {/* Index Marker: uses accent color */}
                                                <span 
                                                    className={`flex-shrink-0 text-base font-mono transition-colors duration-300 group-hover:text-white`}
                                                    style={{ color: ACCENT_COLOR }}
                                                >
                                                    [{(index + 1).toString().padStart(2, '0')}]
                                                </span>
                                                {/* Question Text: turns accent color on hover */}
                                                <span className={`flex-1 pr-4 group-hover:text-[${ACCENT_COLOR}] transition-colors duration-300`}>
                                                    {faq.question}
                                                </span>
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent 
                                            // Content text is the primary light color
                                            className={`pt-1 pb-2 pl-10 leading-relaxed text-base border-l-2`}
                                            style={{ borderLeftColor: ACCENT_COLOR, color: TEXT_COLOR_LIGHT }}
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