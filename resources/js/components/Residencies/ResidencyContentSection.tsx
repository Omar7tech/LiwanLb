import { ResidencyContent } from "@/types";
import { motion } from "framer-motion";


interface Props {
    section: ResidencyContent;
    index: number;
}

export default function ResidencyContentSection({ section, index }: Props) {
    const hasImage = !!section.image;
    const hasContent = !!section.content;
    const isEven = index % 2 === 0;

    // Display all content without truncation or scrolling

    // Case 1: Image Only
    if (hasImage && !hasContent) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-10 sticky top-0"
            >
                <div className="relative w-full overflow-hidden rounded-2xl group">
                    <div className="relative aspect-video w-full overflow-hidden">
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
                    <div className="space-y-6 md:space-y-8 overflow-visible">
                        <div className="max-w-4xl h-auto min-h-0">
                            <div 
                                className="prose prose-lg md:prose-xl text-[#3a3b3a]/80 font-light leading-[1.65] rich-content [&>p]:mb-5 [&>h3]:text-[#3a3b3a] [&>h1]:text-[#3a3b3a] [&>h3]:font-medium [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3 h-auto min-h-0"
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
        <div className="w-full px-6 md:px-12 lg:px-16 py-8 md:py-12 overflow-visible overflow-x-visible overflow-y-visible">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                
                {/* Image Side */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`${!isEven ? 'lg:col-start-2' : ''} lg:sticky lg:top-24`}
                >
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl group">
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
                    className={`space-y-5 md:space-y-6 overflow-visible ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                >
                    <div className="h-auto min-h-0">
                        <div 
                            className="prose prose-base md:prose-lg text-[#3a3b3a]/75 font-light leading-[1.65] rich-content [&>p]:mb-4 [&>h1]:text-[#3a3b3a] [&>h3]:text-[#3a3b3a] [&>h3]:font-medium [&>h3]:text-lg [&>h3]:mt-6 [&>h3]:mb-2 h-auto min-h-0"
                            dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}