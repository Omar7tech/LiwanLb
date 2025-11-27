import { FAQ, FAQs } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function FaqSection({ faqs }: { faqs: FAQs }) {
    return (
        <section className="text-[#3a3b3a] py-12 md:py-16 lg:py-20 px-5">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto text-lg">
                    Find answers to common questions about our services and processes
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    
                    {/* Image - Sticky on desktop */}
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl group h-[300px] md:h-[400px] lg:h-[600px] lg:sticky lg:top-8">
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
                    </div>

                    {/* FAQs - Scrollable container */}
                    <div className="relative">
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
                                    {faqs.data.map((faq, index) => (
                                        <AccordionItem
                                            key={faq.id}
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
                                    ))}
                                </Accordion>
                            )}
                        </div>
                        
                        {/* Scroll indicator for many FAQs */}
                        {faqs.data.length > 5 && (
                            <div className="hidden lg:block absolute -bottom-4 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
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
