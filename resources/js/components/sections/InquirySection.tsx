import { store } from "@/actions/App/Http/Controllers/InquiryController";
import { router, usePage } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { SharedData } from '@/types';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

interface InquiryFormData {
    full_name: string;
    phone: string;
    email: string;
    project_type: string;
    project_location: string;
    notes: string;
    [key: string]: string;
}

interface FormErrors {
    full_name?: string;
    phone?: string;
    email?: string;
    project_type?: string;
    project_location?: string;
    notes?: string;
    [key: string]: string | undefined;
}

export default function InquirySection() {
    const { errors: serverErrors, socialSettings } = usePage<{
        errors: FormErrors;
    } & SharedData>().props;

    const [formData, setFormData] = useState<InquiryFormData>({
        full_name: "",
        phone: "+961",
        email: "",
        project_type: "",
        project_location: "",
        notes: "",
        timestamp: Math.floor(Date.now() / 1000).toString(),
    });

    const [clientErrors, setClientErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Combine client and server errors, prioritizing server errors
    const errors = { ...clientErrors, ...serverErrors };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Full name validation
        if (!formData.full_name.trim()) {
            newErrors.full_name = "Full name is required.";
        } else if (formData.full_name.length > 255) {
            newErrors.full_name = "Full name cannot exceed 255 characters.";
        }

        // Phone validation
        if (!formData.phone || formData.phone.length <= 4) { // Check if only code exists
            newErrors.phone = "Phone number is required.";
        } else if (formData.phone.length > 20) {
            newErrors.phone = "Phone number cannot exceed 20 characters.";
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please provide a valid email address.";
        } else if (formData.email.length > 255) {
            newErrors.email = "Email address cannot exceed 255 characters.";
        }

        // Optional fields validation
        if (formData.project_type && formData.project_type.length > 255) {
            newErrors.project_type = "Project type cannot exceed 255 characters.";
        }

        if (formData.project_location && formData.project_location.length > 255) {
            newErrors.project_location = "Project location cannot exceed 255 characters.";
        }

        if (formData.notes && formData.notes.length > 1000) {
            newErrors.notes = "Notes cannot exceed 1000 characters.";
        }

        setClientErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const generateWhatsAppMessage = (): string => {
        let message = `Hello! I just submitted an inquiry through your website.\n\n`;
        message += `*Name:* ${formData.full_name}\n`;
        message += `*Phone:* ${formData.phone}\n`;
        message += `*Email:* ${formData.email}\n`;
        
        if (formData.project_type) {
            message += `*Project Type:* ${formData.project_type}\n`;
        }
        
        if (formData.project_location) {
            message += `*Project Location:* ${formData.project_location}\n`;
        }
        
        if (formData.notes) {
            message += `*Notes:* ${formData.notes}\n`;
        }
        
        return encodeURIComponent(message);
    };

    const redirectToWhatsApp = () => {
        if (socialSettings?.whatsapp_active && socialSettings?.whatsapp_number) {
            const cleanNumber = socialSettings.whatsapp_number.replace(/[^0-9]/g, '');
            const message = generateWhatsAppMessage();
            const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Frontend validation before submission
        if (!validateForm()) {
            return;
        }

        // Check local storage for rate limiting
        const MAX_INQUIRIES = 3;
        const INQUIRY_COUNT_KEY = "liwan_inquiry_count";
        const currentCount = parseInt(localStorage.getItem(INQUIRY_COUNT_KEY) || "0", 10);

        if (currentCount >= MAX_INQUIRIES) {
            setClientErrors((prev) => ({
                ...prev,
                submit: "You have reached the maximum number of inquiries allowed from this device.",
            }));
            return;
        }

        setIsSubmitting(true);

        // Submit to backend
        router.post(store(), formData, {
            preserveScroll: true,
            onSuccess: () => {
                // Increment submission count
                const INQUIRY_COUNT_KEY = "liwan_inquiry_count";
                const currentCount = parseInt(localStorage.getItem(INQUIRY_COUNT_KEY) || "0", 10);
                const newCount = currentCount + 1;
                localStorage.setItem(INQUIRY_COUNT_KEY, newCount.toString());

                // Show success message
                setShowSuccess(true);

                // Redirect to WhatsApp after a short delay
                setTimeout(() => {
                    redirectToWhatsApp();
                }, 1500);

                // Reset form on success
                setFormData({
                    full_name: "",
                    phone: "+961",
                    email: "",
                    project_type: "",
                    project_location: "",
                    notes: "",
                    timestamp: Math.floor(Date.now() / 1000).toString(),
                });
                setClientErrors({});
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleChange = (field: keyof InquiryFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setClientErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-5 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 items-start">
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {showSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center justify-center py-16 text-center space-y-6 bg-gray-50 rounded-2xl border border-gray-100 p-8 min-h-[500px]"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4"
                                >
                                    <CheckCircle className="w-12 h-12 text-green-600" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h3>
                                    <p className="text-xl text-gray-600 max-w-md mx-auto">
                                        Your inquiry has been submitted successfully. We will contact you soon.
                                    </p>
                                </motion.div>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={() => setShowSuccess(false)}
                                    className="px-8 py-3 bg-[#3a3b3a] text-white font-bold rounded-lg hover:bg-black transition-colors mt-4"
                                >
                                    Send Another Inquiry
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-3xl font-bold text-[#3a3b3a] mb-8">Start Your Project With Liwan</h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="flex justify-between text-sm font-medium text-gray-700">
                                                <span>Full Name</span>
                                                <span>اﻻﺳﻢ اﻟﻜﺎﻣﻞ</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={(e) => handleChange("full_name", e.target.value)}
                                                className={`w-full border-b py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent ${errors.full_name ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.full_name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex justify-between text-sm font-medium text-gray-700">
                                                <span>Phone</span>
                                                <span>رﻗﻢ اﻟﻬﺎﺗﻒ</span>
                                            </label>
                                            <div dir="ltr">
                                                <PhoneInput
                                                    international
                                                    defaultCountry="LB"
                                                    value={formData.phone}
                                                    onChange={(value) => handleChange("phone", value || "")}
                                                    className={`w-full border-b py-3 focus-within:border-[#F2AE1D] transition-colors bg-transparent flex gap-2 ${
                                                        errors.phone ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                    numberInputProps={{
                                                        className: "w-full bg-transparent border-none focus:ring-0 focus:outline-none p-0 placeholder-gray-400 text-base",
                                                        placeholder: "Enter phone number"
                                                    }}
                                                />
                                            </div>
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="flex justify-between text-sm font-medium text-gray-700">
                                                <span>Email</span>
                                                <span>اﻟبرﻳﺪ اﻹﻟﻜتروﻧﻲ</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={(e) => handleChange("email", e.target.value)}
                                                className={`w-full border-b py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent ${errors.email ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex justify-between text-sm font-medium text-gray-700">
                                                <span>Project Type</span>
                                                <span>ﻧﻮع اﻟﻤشروع</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="project_type"
                                                value={formData.project_type}
                                                onChange={(e) => handleChange("project_type", e.target.value)}
                                                className={`w-full border-b py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent ${errors.project_type ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.project_type && (
                                                <p className="text-red-500 text-sm mt-1">{errors.project_type}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex justify-between text-sm font-medium text-gray-700">
                                            <span>Project Location</span>
                                            <span>ﻣﻮﻗﻊ اﻟﻤشروع</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="project_location"
                                            value={formData.project_location}
                                            onChange={(e) => handleChange("project_location", e.target.value)}
                                            className={`w-full border-b py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent ${errors.project_location ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors.project_location && (
                                            <p className="text-red-500 text-sm mt-1">{errors.project_location}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex justify-between text-sm font-medium text-gray-700">
                                            <span>Notes</span>
                                            <span>ﻣﻼﺣﻈﺎت</span>
                                        </label>
                                        <textarea
                                            rows={4}
                                            name="notes"
                                            value={formData.notes}
                                            onChange={(e) => handleChange("notes", e.target.value)}
                                            className={`w-full border-b py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent resize-none ${errors.notes ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors.notes && (
                                            <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                                        )}
                                    </div>

                                    {/* Honeypot Field - Invisible to humans */}
                                    <div className="absolute opacity-0 -z-10 select-none pointer-events-none h-0 w-0 overflow-hidden">
                                        <label htmlFor="fax">Fax Number</label>
                                        <input
                                            type="text"
                                            id="fax"
                                            name="fax"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            onChange={(e) => handleChange("fax", e.target.value)}
                                        />
                                    </div>

                                    <div className="pt-4">
                                        {errors.submit && (
                                            <p className="text-red-500 text-sm mb-4 font-medium">{errors.submit}</p>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full md:w-auto px-8 py-3 bg-[#3a3b3a] text-white font-bold rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Request"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="hidden lg:flex lg:col-span-2 flex-col justify-center sticky top-32">
                    <h2 className="text-3xl font-bold text-[#3a3b3a] mb-6 leading-tight">
                        Share your project details with us and we'll guide you through the next steps with clarity and confidence.
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Whether you're building a home, developing land, designing interiors, or launching a business space, our team will review your request and provide direction, expectations, and a clear plan forward with no pressure and no obligations.
                    </p>
                </div>
            </div>
        </section>
    );
}