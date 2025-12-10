import { ResidencyContent } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
    section: ResidencyContent;
    index: number;
}

export default function ResidencyContentSection({ section, index }: Props) {
    const hasImage = !!section.image;
    const hasContent = !!section.content;
    const isEven = index % 2 === 0;

    const [isExpanded, setIsExpanded] = useState(false);
    const contentLength = section.content ? section.content.length : 0;
    const shouldTruncate = contentLength > 500; // Character threshold for truncation

    // Case 1: Image Only
    if (hasImage && !hasContent) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-10"
            >
                <div className="relative w-full overflow-hidden rounded-2xl group">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <img 
                            src={section.image!} 
                            alt="Section Image" 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                    </div>
                </div>
            </motion.div>
        );
    }

    // Case 2: Content Only
    if (!hasImage && hasContent) {
        return (
            <div className="w-full px-6 md:px-12 lg:px-16 py-10 md:py-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-[1200px] mx-auto"
                >
                    <div className="space-y-6 md:space-y-8">
                        <div className="max-w-4xl">
                            <div 
                                className="prose prose-lg md:prose-xl text-[#3a3b3a]/80 font-light leading-[1.65] rich-content [&>p]:mb-5 [&>h3]:text-[#3a3b3a] [&>h1]:text-[#3a3b3a] [&>h3]:font-medium [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Case 3: Image + Content
    return (
        <div className="w-full px-6 md:px-12 lg:px-16 py-8 md:py-12">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                
                {/* Image Side */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`${!isEven ? 'lg:col-start-2' : ''} lg:sticky lg:top-24`}
                >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl group">
                        <img 
                            src={section.image!} 
                            alt="Section Image"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                    </div>
                </motion.div>

                {/* Content Side */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className={`space-y-5 md:space-y-6 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                >
                    <div className="relative">
                        <div 
                            className={`prose prose-base md:prose-lg text-[#3a3b3a]/75 font-light leading-[1.65] rich-content [&>p]:mb-4 [&>h1]:text-[#3a3b3a] [&>h3]:text-[#3a3b3a] [&>h3]:font-medium [&>h3]:text-lg [&>h3]:mt-6 [&>h3]:mb-2 transition-all duration-500 ease-linear ${
                                shouldTruncate && !isExpanded ? 'max-h-[300px] overflow-hidden' : ''
                            }`}
                            dangerouslySetInnerHTML={{ __html: section.content }}
                        />

                        {shouldTruncate && (
                             <div className={`mt-2 flex justify-start pt-6 ${
                                !isExpanded ? 'absolute bottom-0 left-0 w-full bg-linear-to-t from-[#fafafa] via-[#fafafa]/80 to-transparent pt-20' : ''
                            }`}>
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-[#f2ae1d] text-sm font-bold uppercase tracking-wider hover:text-[#d49619] transition-colors flex items-center gap-2"
                                >
                                    {isExpanded ? 'Read Less' : 'Read More'}
                                    <svg 
                                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor" data-slot="icon"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}