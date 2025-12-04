import { ResidencyContent } from "@/types";
import { motion } from "framer-motion";

interface Props {
    section: ResidencyContent;
    index: number;
}

export default function ResidencyContentSection({ section, index }: Props) {
    const hasImage = !!section.image;
    const hasText = !!(section.title || section.subtitle || section.content);
    const isEven = index % 2 === 0;

    // Case 1: Image Only - Clean & Minimal
    if (hasImage && !hasText) {
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

    // Case 2: Text Only - Professional Editorial
    if (!hasImage && hasText) {
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
                        {section.subtitle && (
                            <p className="text-[#f2ae1d] text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                                {section.subtitle}
                            </p>
                        )}
                        
                        {section.title && (
                            <h2 className="text-[#3a3b3a] text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight">
                                {section.title}
                            </h2>
                        )}
                        
                        {section.content && (
                            <div className="max-w-4xl">
                                <div 
                                    className="prose prose-lg md:prose-xl text-[#3a3b3a]/80 font-light leading-[1.65] rich-content [&>p]:mb-5 [&>h3]:text-[#3a3b3a] [&>h3]:font-medium [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3"
                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    }

    // Case 3: Image + Text - Compact Professional Grid
    return (
        <div className="w-full px-6 md:px-12 lg:px-16 py-8 md:py-12">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                
                {/* Image Side */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`${!isEven ? 'lg:col-start-2' : ''}`}
                >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl group">
                        <img 
                            src={section.image!} 
                            alt={section.title || "Section Image"}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                    </div>
                </motion.div>

                {/* Text Side */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className={`space-y-5 md:space-y-6 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                >
                    {section.subtitle && (
                        <p className="text-[#f2ae1d] text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                            {section.subtitle}
                        </p>
                    )}
                    
                    {section.title && (
                        <h2 className="text-[#3a3b3a] text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight transition-colors duration-300 hover:text-[#f2ae1d]">
                            {section.title}
                        </h2>
                    )}

                    {section.content && (
                        <div className="max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                            <div 
                                className="prose prose-base md:prose-lg text-[#3a3b3a]/75 font-light leading-[1.65] rich-content [&>p]:mb-4 [&>h3]:text-[#3a3b3a] [&>h3]:font-medium [&>h3]:text-lg [&>h3]:mt-6 [&>h3]:mb-2"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}