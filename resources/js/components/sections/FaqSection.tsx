import { FAQs } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { motion } from "framer-motion";
import { useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";


const CARD_BACKGROUND_COLOR = "#ffffff";  
const QUESTION_COLOR = "#2C2C2C";        
const ANSWER_COLOR = "#666666";          
const BORDER_COLOR = "#E5E5E5";          
const DEFAULT_IMAGE = "/images/blognoimage.webp";

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

    const defaultOpenItem = faqList.length > 0 ? `item-${faqList[0].id}` : undefined;

    return (
        <section
            className={`py-3`}
        >

            <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className={`max-w-screen-2xl mx-auto px-4 md:px-8`}
            >

                <div
                    className={`grid ${hasImage ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-8 lg:gap-12 items-stretch`}
                >

                    {hasImage && (
                        <div className="relative h-full min-h-[400px] lg:min-h-0">
                            <div
                                className="w-full relative overflow-hidden h-full lg:absolute lg:inset-0 rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.005] hover:shadow-2xl hover:shadow-gray-400/30"
                                style={{ border: `1px solid ${BORDER_COLOR}` }}
                            >
                                {isLoadingImage && (
                                    <div className="absolute inset-0 z-10 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
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
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 md:p-8">
                                        <p className="text-white text-xl md:text-2xl font-light italic leading-relaxed">
                                            {overlayText}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className={`flex flex-col justify-center ${hasImage ? '' : 'max-w-4xl mx-auto w-full'}`}>

                        <div className={`w-full ${faqList.length > 3 ? 'lg:max-h-[600px] lg:overflow-y-auto lg:pr-4 custom-scrollbar' : ''}`}>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full space-y-3"
                                defaultValue={defaultOpenItem}
                            >
                                {faqList.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center p-10 md:p-16 text-center border rounded-2xl shadow-sm bg-white h-full min-h-[300px]" style={{ borderColor: BORDER_COLOR }}>
                                        <h3 className="text-2xl font-light text-[#3a3b3a] mb-2">Have Questions?</h3>
                                        <p className="text-gray-500 mb-6 font-light">We're here to help you with any inquiries you might have.</p>
                                        <div className="flex gap-4">
                                            <WhatsAppButton 
                                                className="bg-[#F2AE1D]! text-white! hover:bg-[#d99a16]! transition-colors duration-300 px-6 py-3 rounded-full font-medium"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    faqList.map((faq) => (
                                        <AccordionItem
                                            key={faq.id}
                                            value={`item-${faq.id}`}
                                            className={`rounded-xl shadow-sm transition-all duration-300 hover:shadow-md border overflow-hidden`}
                                            style={{
                                                backgroundColor: CARD_BACKGROUND_COLOR,
                                                borderColor: BORDER_COLOR
                                            }}
                                        >
                                            <AccordionTrigger
                                                className={`text-left text-lg md:text-xl font-medium p-5 md:p-6 group hover:no-underline`}
                                                style={{ color: QUESTION_COLOR }}
                                            >
                                                <span className={`flex-1 pr-4 text-xl transition-colors duration-300 text-[#3a3b3a] group-hover:text-[#f2ae1d]`}>
                                                    {faq.question}
                                                </span>
                                            </AccordionTrigger>

                                            <AccordionContent
                                                className={`pt-0 pb-5 px-5 md:pb-6 md:px-6 leading-relaxed text-base md:text-lg font-light`}
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
                </div>
            </motion.div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #e5e5e5;
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #d4d4d4;
                }
            `}</style>
        </section>
    );
}