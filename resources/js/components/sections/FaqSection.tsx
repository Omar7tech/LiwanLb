import { FAQ, FAQs } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { motion } from "framer-motion";

export default function FaqSection({ faqs }: { faqs: FAQs }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <section className="text-[#3a3b3a] p-5 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                
                {/* Image - Sticky on desktop */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative overflow-hidden rounded-2xl shadow-2xl group h-[300px] md:h-[400px] lg:h-full lg:sticky lg:top-25"
                >
                    <img
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Liwan Architecture"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Overlay Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">Have More Questions?</h3>
                        <p className="text-gray-200">We're here to help you every step of the way</p>
                    </div>
                </motion.div>

                {/* FAQs Section */}
                <div className="space-y-6">
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-3"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl ">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Find answers to common questions about our services and processes
                        </p>
                    </motion.div>

                    {/* FAQ List - Scrollable on desktop */}
                    <div 
                        className={`
                            ${faqs.data.length > 5 ? 'lg:max-h-[600px] lg:overflow-y-auto lg:pr-4' : ''}
                        `}
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#F2AE1D #f1f1f1'
                        }}
                    >
                        {faqs.data.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                                <p className="text-gray-500 text-lg">No FAQs available at the moment.</p>
                            </div>
                        ) : (
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full space-y-4"
                                defaultValue={faqs.data.length > 0 ? `item-${faqs.data[0].id}` : undefined}
                            >
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-4"
                                >
                                    {faqs.data.map((faq, index) => (
                                        <motion.div key={faq.id} variants={itemVariants}>
                                            <AccordionItem
                                                value={`item-${faq.id}`}
                                                className="bg-white border-2 border-gray-100 rounded-xl px-6 hover:border-[#F2AE1D] hover:shadow-lg transition-all duration-300"
                                            >
                                                <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:text-[#F2AE1D] py-5 group">
                                                    <span className="flex items-start gap-3">
                                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F2AE1D]/10 text-[#F2AE1D] flex items-center justify-center text-sm font-bold mt-0.5">
                                                            {index + 1}
                                                        </span>
                                                        <span className="flex-1 pr-4">{faq.question}</span>
                                                    </span>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-gray-600 pb-6 pl-9 leading-relaxed">
                                                    <p className="text-base">{faq.answer}</p>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </Accordion>
                        )}
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style dangerouslySetInnerHTML={{__html: `
                .lg\\:overflow-y-auto::-webkit-scrollbar {
                    width: 8px;
                }
                
                .lg\\:overflow-y-auto::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                
                .lg\\:overflow-y-auto::-webkit-scrollbar-thumb {
                    background: #F2AE1D;
                    border-radius: 10px;
                }
                
                .lg\\:overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: #d99a15;
                }
            `}} />
        </section>
    );
}
