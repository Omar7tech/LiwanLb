import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function WhatsAppWidget() {
    const { socialSettings } = usePage<SharedData>().props;
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    // Don't render if WhatsApp is not active or no number or widget is disabled
    if (!socialSettings.whatsapp_active || !socialSettings.whatsapp_number || !socialSettings.whatsapp_widget_active) {
        return null;
    }

    const handleSendMessage = () => {
        if (!message.trim() || !socialSettings.whatsapp_number) return;
        
        const phoneNumber = socialSettings.whatsapp_number.replace(/[^0-9]/g, '');
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        setMessage("");
        setIsOpen(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#F2AE1D] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {isOpen ? <FaTimes size={28} /> : <FaWhatsapp size={32} />}
            </motion.button>

            {/* Chat Widget */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[#F2AE1D] px-5 py-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white overflow-hidden">
                                    <img 
                                        src="/images/blognoimage.webp" 
                                        alt="Liwan Architecture" 
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Chat with us</h3>
                                    <p className="text-sm text-white/90">We typically reply instantly</p>
                                </div>
                            </div>
                        </div>

                        {/* Message from "us" */}
                        <div className="bg-gray-50 px-5 py-4">
                            <div className="bg-white rounded-lg rounded-tl-none shadow-sm px-4 py-3 max-w-[85%]">
                                <p className="text-gray-800 text-sm">
                                    👋 Hi there! How can I help you today?
                                </p>
                                <span className="text-xs text-gray-400 mt-1 block">Just now</span>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="bg-white px-4 py-4 border-t border-gray-100">
                            <div className="flex items-end gap-2">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[#F2AE1D] focus:outline-none focus:ring-2 focus:ring-[#F2AE1D]/20 max-h-32 min-h-[44px]"
                                    rows={1}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F2AE1D] text-white transition-all hover:bg-[#E09D0F] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F2AE1D]"
                                >
                                    <FaPaperPlane size={18} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 text-center">
                                Press Enter to send, Shift+Enter for new line
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
