import { store } from "@/actions/App/Http/Controllers/InquiryController";
import { router, usePage } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { SharedData } from '@/types';



interface InquiryFormData {
    full_name: string;
    phone: string;
    email: string;
    project_type: string;
    project_location: string;
    notes: string;
    type: 'client' | 'partner';
    building_type: string;
    project_category: string;
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

interface InquirySectionProps {
    preselectedWork?: string;
    type?: 'client' | 'partner';
}

export default function InquirySection({ preselectedWork, type = 'client' }: InquirySectionProps) {
    const { errors: serverErrors, socialSettings, sharedWorks } = usePage<{
        errors: FormErrors;
    } & SharedData>().props;

    const createInitialFormData = (): InquiryFormData => ({
        full_name: "",
        phone: "+961",
        email: "",
        project_type: type === 'client' ? (preselectedWork || sharedWorks?.data?.[0]?.name || "") : "",
        project_location: "",
        notes: "",
        type,
        building_type: "",
        project_category: "",
        timestamp: Math.floor(Date.now() / 1000).toString(),
    });

    const [formData, setFormData] = useState<InquiryFormData>(createInitialFormData);

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

        // Email validation (optional)
        if (formData.email && formData.email.trim()) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Please provide a valid email address.";
            } else if (formData.email.length > 255) {
                newErrors.email = "Email address cannot exceed 255 characters.";
            }
        }

        // Project Type validation (only for client inquiries)
        if (formData.type === 'client') {
            if (!formData.project_type.trim()) {
                newErrors.project_type = "Project type is required.";
            } else if (formData.project_type.length > 255) {
                newErrors.project_type = "Project type cannot exceed 255 characters.";
            }
        }

        // Optional fields validation
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
        const inquiryType = formData.type === 'partner' ? 'Partnership' : 'Project';
        let message = `*New ${inquiryType} Inquiry*\n\n`;
        
        message += `*Name:* ${formData.full_name}\n`;
        message += `*Phone:* ${formData.phone}\n`;
        
        if (formData.email) {
            message += `*Email:* ${formData.email}\n`;
        }

        if (formData.type === 'client') {
            if (formData.project_type) {
                message += `*Project Type:* ${formData.project_type}\n`;
            }
            if (formData.project_location) {
                message += `*Project Location:* ${formData.project_location}\n`;
            }
            
            // Add client options if they exist
            if (formData.building_type && formData.building_type !== '' || formData.project_category && formData.project_category !== '') {
                let clientOptions = '';
                
                if (formData.building_type && formData.building_type !== '') {
                    const buildingText = formData.building_type === 'existing_building' ? 'Existing Building' : 'Empty Land';
                    clientOptions += `Building Type: ${buildingText}`;
                }
                
                if (formData.project_category && formData.project_category !== '') {
                    const categoryTexts: Record<string, string> = {
                        'residential': 'Residential Apartments',
                        'commercial': 'Commercial Shops', 
                        'offices': 'Offices',
                        'private_project': 'Private Project',
                        'investment_project': 'Investment Project',
                        'sale': 'Sale',
                        'rent': 'Rent',
                        'investment': 'Investment'
                    };
                    const categoryText = categoryTexts[formData.project_category] || formData.project_category;
                    
                    if (clientOptions) clientOptions += ', ';
                    clientOptions += `Project Category: ${categoryText}`;
                }
                
                if (clientOptions) {
                    message += `*Client Options:* ${clientOptions}\n`;
                }
            }
        } else {
            message += `*Inquiry Type:* Partnership\n`;
        }

        if (formData.notes) {
            message += `\n*Additional Notes:*\n${formData.notes}\n`;
        }

        message += `\n*Submitted at:* ${new Date().toLocaleString()}`;

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

        if (!validateForm()) {
            return;
        }

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

        // Prepare submission data with building/project info appended to notes for client inquiries
        const submissionData = { ...formData };
        
        if (formData.type === 'client' && (formData.building_type && formData.building_type !== '' || formData.project_category && formData.project_category !== '')) {
            let additionalInfo = '';
            
            if (formData.building_type && formData.building_type !== '') {
                const buildingText = formData.building_type === 'existing_building' ? 'Existing Building' : 'Empty Land';
                additionalInfo += `Building Type: ${buildingText}`;
            }
            
            if (formData.project_category && formData.project_category !== '') {
                const categoryTexts: Record<string, string> = {
                    'residential': 'Residential Apartments',
                    'commercial': 'Commercial Shops', 
                    'offices': 'Offices',
                    'private_project': 'Private Project',
                    'investment_project': 'Investment Project',
                    'sale': 'Sale',
                    'rent': 'Rent',
                    'investment': 'Investment'
                };
                const categoryText = categoryTexts[formData.project_category] || formData.project_category;
                
                if (additionalInfo) additionalInfo += ', ';
                additionalInfo += `Project Category: ${categoryText}`;
            }
            
            // Append to notes only if there's additional info
            if (additionalInfo) {
                submissionData.notes = formData.notes 
                    ? `${formData.notes}. Client Options: ${additionalInfo}`
                    : `Client Options: ${additionalInfo}`;
            }
        }

        // Submit to backend
        router.post(store(), submissionData, {
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
                setFormData(createInitialFormData());
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
                                <h2 className="text-3xl font-bold text-[#3a3b3a] mb-8">
                                    {type === 'client' ? 'Start Your Project With Liwan' : 'Partner With Us'}
                                </h2>
                                

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
                                                <div className="flex gap-2">
                                                    <select
                                                        value={formData.phone?.split(' ')[0] || '+961'}
                                                        onChange={(e) => {
                                                            const countryCode = e.target.value;
                                                            const currentNumber = formData.phone?.split(' ').slice(1).join(' ') || '';
                                                            handleChange("phone", `${countryCode} ${currentNumber}`);
                                                        }}
                                                        className={`border-b py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent ${
                                                            errors.phone ? "border-red-500" : "border-gray-300"
                                                        }`}
                                                    >
                                                        <option value="+961">+961</option>
                                                        <option value="+966">+966</option>
                                                        <option value="+971">+971</option>
                                                        <option value="+974">+974</option>
                                                        <option value="+965">+965</option>
                                                        <option value="+968">+968</option>
                                                        <option value="+973">+973</option>
                                                        <option value="+20">+20</option>
                                                        <option value="+90">+90</option>
                                                    </select>
                                                    <input
                                                        type="tel"
                                                        value={formData.phone?.split(' ').slice(1).join(' ') || ''}
                                                        onChange={(e) => {
                                                            const countryCode = formData.phone?.split(' ')[0] || '+961';
                                                            handleChange("phone", `${countryCode} ${e.target.value}`);
                                                        }}
                                                        placeholder="Enter phone number"
                                                        className={`flex-1 border-b py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent ${
                                                            errors.phone ? "border-red-500" : "border-gray-300"
                                                        }`}
                                                    />
                                                </div>
                                            </div>
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                            )}
                                        </div>
                                    </div>

                                    {type === 'client' && (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="flex justify-between text-sm font-medium text-gray-700">
                                                        <span>Email (Optional)</span>
                                                        <span>اﻟبرﻳﺪ اﻹﻟﻜتروﻧﻲ (اختياري)</span>
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
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex justify-between text-sm font-medium text-gray-700">
                                                    <span>Project Type</span>
                                                    <span>ﻧﻮع اﻟﻤشروع</span>
                                                </label>
                                                <div className="grid grid-cols-2 gap-1 py-2">
                                                    {sharedWorks?.data?.map((work) => (
                                                        <button
                                                            key={work.id}
                                                            type="button"
                                                            onClick={() => handleChange("project_type", work.name)}
                                                            className={`px-2 py-2 text-sm font-medium border-2 rounded-xl transition-all duration-200 flex flex-col items-center justify-center cursor-pointer min-h-[75px] ${
                                                                formData.project_type === work.name
                                                                    ? 'border-[#F2AE1D] bg-[#F2AE1D] text-white shadow-sm'
                                                                    : 'border-gray-300 text-gray-600 hover:border-[#F2AE1D] hover:text-[#F2AE1D] bg-transparent'
                                                            }`}
                                                        >
                                                            <span className="text-base font-semibold block">{work.name}</span>
                                                            {work.arabic_name && (
                                                                <span className="text-xs opacity-80 mt-1 block">{work.arabic_name}</span>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                                {errors.project_type && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.project_type}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {type === 'client' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <label className="flex justify-between text-sm font-medium text-gray-700">
                                                    <span>Building Type (Optional)</span>
                                                    <span>ﻧﻮع اﻟﻤبﻨﻰ (اختياري)</span>
                                                </label>
                                                <div className="space-y-2">
                                                    <label className={`relative flex items-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#F2AE1D] hover:shadow-md ${
                                                        formData.building_type === 'existing_building' 
                                                            ? 'border-[#F2AE1D] bg-[#F2AE1D] shadow-lg' 
                                                            : 'border-gray-300'
                                                    }`}>
                                                        <input
                                                            type="radio"
                                                            name="building_type"
                                                            value="existing_building"
                                                            checked={formData.building_type === 'existing_building'}
                                                            onChange={(e) => {
                                                                handleChange("building_type", e.target.value);
                                                                handleChange("project_category", "");
                                                            }}
                                                            className="sr-only"
                                                        />
                                                        <div className="flex items-center justify-between w-full">
                                                            <span className={`text-sm sm:text-base font-medium ${
                                                                formData.building_type === 'existing_building' 
                                                                    ? 'text-white' 
                                                                    : 'text-gray-700'
                                                            }`}>
                                                                <span className="block">مبنى موجود</span>
                                                                <span className="block text-xs sm:text-sm opacity-80">Existing Building</span>
                                                            </span>
                                                            <div className="relative">
                                                                <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                                                                    formData.building_type === 'existing_building' 
                                                                        ? 'border-white bg-[#F2AE1D]' 
                                                                        : 'border-gray-300'
                                                                }`}>
                                                                    <div className={`absolute inset-0 rounded-full bg-white transition-transform duration-200 ${
                                                                        formData.building_type === 'existing_building' 
                                                                            ? 'scale-50' 
                                                                            : 'scale-0'
                                                                    }`}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                    <label className={`relative flex items-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#F2AE1D] hover:shadow-md ${
                                                        formData.building_type === 'empty_land' 
                                                            ? 'border-[#F2AE1D] bg-[#F2AE1D] shadow-lg' 
                                                            : 'border-gray-300'
                                                    }`}>
                                                        <input
                                                            type="radio"
                                                            name="building_type"
                                                            value="empty_land"
                                                            checked={formData.building_type === 'empty_land'}
                                                            onChange={(e) => {
                                                                handleChange("building_type", e.target.value);
                                                                handleChange("project_category", "");
                                                            }}
                                                            className="sr-only"
                                                        />
                                                        <div className="flex items-center justify-between w-full">
                                                            <span className={`text-sm sm:text-base font-medium ${
                                                                formData.building_type === 'empty_land' 
                                                                    ? 'text-white' 
                                                                    : 'text-gray-700'
                                                            }`}>
                                                                <span className="block">أرض خالية</span>
                                                                <span className="block text-xs sm:text-sm opacity-80">Empty Land</span>
                                                            </span>
                                                            <div className="relative">
                                                                <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                                                                    formData.building_type === 'empty_land' 
                                                                        ? 'border-white bg-[#F2AE1D]' 
                                                                        : 'border-gray-300'
                                                                }`}>
                                                                    <div className={`absolute inset-0 rounded-full bg-white transition-transform duration-200 ${
                                                                        formData.building_type === 'empty_land' 
                                                                            ? 'scale-50' 
                                                                            : 'scale-0'
                                                                    }`}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                    <label className={`relative flex items-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-md ${
                                                        formData.building_type === '' 
                                                            ? 'border-gray-400 bg-[#3a3b3a] shadow-lg' 
                                                            : 'border-gray-300'
                                                    }`}>
                                                        <input
                                                            type="radio"
                                                            name="building_type"
                                                            value=""
                                                            checked={formData.building_type === ""}
                                                            onChange={() => {
                                                                handleChange("building_type", "");
                                                                handleChange("project_category", "");
                                                            }}
                                                            className="sr-only"
                                                        />
                                                        <div className="flex items-center justify-between w-full">
                                                            <span className={`text-sm sm:text-base font-medium ${
                                                                formData.building_type === '' 
                                                                    ? 'text-white' 
                                                                    : 'text-gray-500'
                                                            }`}>
                                                                Skip | تخطي
                                                            </span>
                                                            <div className="relative">
                                                                <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                                                                    formData.building_type === '' 
                                                                        ? 'border-white bg-gray-400' 
                                                                        : 'border-gray-300'
                                                                }`}>
                                                                    <div className={`absolute inset-0 rounded-full bg-white transition-transform duration-200 ${
                                                                        formData.building_type === '' 
                                                                            ? 'scale-50' 
                                                                            : 'scale-0'
                                                                    }`}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                {errors.building_type && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.building_type}</p>
                                                )}
                                            </div>

                                            <div className="space-y-4">
                                                <label className="flex justify-between text-sm font-medium text-gray-700">
                                                    <span>Project Category (Optional)</span>
                                                    <span>ﻓﺌﺔ اﻟﻤشروع (اختياري)</span>
                                                </label>
                                                <div className={`space-y-2 ${!formData.building_type ? "opacity-50" : ""}`}>
                                                    {formData.building_type === 'existing_building' && (
                                                        <>
                                                            <label className={`relative flex items-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#F2AE1D] hover:shadow-md ${
                                                                formData.project_category === 'residential' 
                                                                    ? 'border-[#F2AE1D] bg-[#F2AE1D] shadow-lg' 
                                                                    : 'border-gray-300'
                                                            }`}>
                                                                <input
                                                                    type="radio"
                                                                    name="project_category"
                                                                    value="residential"
                                                                    checked={formData.project_category === 'residential'}
                                                                    onChange={(e) => handleChange("project_category", e.target.value)}
                                                                    disabled={!formData.building_type}
                                                                    className="sr-only"
                                                                />
                                                                <div className="flex items-center justify-between w-full">
                                                                    <span className={`text-sm sm:text-base font-medium ${
                                                                        formData.project_category === 'residential' 
                                                                            ? 'text-white' 
                                                                            : 'text-gray-700'
                                                                    }`}>
                                                                        <span className="block">شقق سكنية</span>
                                                                        <span className="block text-xs sm:text-sm opacity-80">Residential Apartments</span>
                                                                    </span>
                                                                    <div className="relative">
                                                                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                                                                            formData.project_category === 'residential' 
                                                                                ? 'border-white bg-[#F2AE1D]' 
                                                                                : 'border-gray-300'
                                                                        }`}>
                                                                            <div className={`absolute inset-0 rounded-full bg-white transition-transform duration-200 ${
                                                                                formData.project_category === 'residential' 
                                                                                    ? 'scale-50' 
                                                                                    : 'scale-0'
                                                                            }`}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            <label className={`relative flex items-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#F2AE1D] hover:shadow-md ${
                                                                formData.project_category === 'commercial' 
                                                                    ? 'border-[#F2AE1D] bg-[#F2AE1D] shadow-lg' 
                                                                    : 'border-gray-300'
                                                            }`}>
                                                                <input
                                                                    type="radio"
                                                                    name="project_category"
                                                                    value="commercial"
                                                                    checked={formData.project_category === 'commercial'}
                                                                    onChange={(e) => handleChange("project_category", e.target.value)}
                                                                    disabled={!formData.building_type}
                                                                    className="sr-only"
                                                                />
                                                                <div className="flex items-center justify-between w-full">
                                                                    <span className={`text-sm sm:text-base font-medium ${
                                                                        formData.project_category === 'commercial' 
                                                                            ? 'text-white' 
                                                                            : 'text-gray-700'
                                                                    }`}>
                                                                        <span className="block">محلات تجارية</span>
                                                                        <span className="block text-xs sm:text-sm opacity-80">Commercial Shops</span>
                                                                    </span>
                                                                    <div className="relative">
                                                                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                                                                            formData.project_category === 'commercial' 
                                                                                ? 'border-white bg-[#F2AE1D]' 
                                                                                : 'border-gray-300'
                                                                        }`}>
                                                                            <div className={`absolute inset-0 rounded-full bg-white transition-transform duration-200 ${
                                                                                formData.project_category === 'commercial' 
                                                                                    ? 'scale-50' 
                                                                                    : 'scale-0'
                                                                            }`}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            <label className={`relative flex items-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#F2AE1D] hover:shadow-md ${
                                                                formData.project_category === 'offices' 
                                                                    ? 'border-[#F2AE1D] bg-[#F2AE1D] shadow-lg' 
                                                                    : 'border-gray-300'
                                                            }`}>
                                                                <input
                                                                    type="radio"
                                                                    name="project_category"
                                                                    value="offices"
                                                                    checked={formData.project_category === 'offices'}
                                                                    onChange={(e) => handleChange("project_category", e.target.value)}
                                                                    disabled={!formData.building_type}
                                                                    className="sr-only"
                                                                />
                                                                <div className="flex items-center justify-between w-full">
                                                                    <span className={`text-sm sm:text-base font-medium ${
                                                                        formData.project_category === 'offices' 
                                                                            ? 'text-white' 
                                                                            : 'text-gray-700'
                                                                    }`}>
                                                                        <span className="block">مكاتب</span>
                                                                        <span className="block text-xs sm:text-sm opacity-80">Offices</span>
                                                                    </span>
                                                                    <div className="relative">
                                                                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                                                                            formData.project_category === 'offices' 
                                                                                ? 'border-white bg-[#F2AE1D]' 
                                                                                : 'border-gray-300'
                                                                        }`}>
                                                                            <div className={`absolute inset-0 rounded-full bg-white transition-transform duration-200 ${
                                                                                formData.project_category === 'offices' 
                                                                                    ? 'scale-50' 
                                                                                    : 'scale-0'
                                                                            }`}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        </>
                                                    )}
                                                    {formData.building_type === 'empty_land' && (
                                                        <>
                                                            <label className={`relative flex items-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#F2AE1D] hover:shadow-md ${
                                                                formData.project_category === 'private_project' 
                                                                    ? 'border-[#F2AE1D] bg-[#F2AE1D] shadow-lg' 
                                                                    : 'border-gray-300'
                                                            }`}>
                                                                <input
                                                                    type="radio"
                                                                    name="project_category"
                                                                    value="private_project"
                                                                    checked={formData.project_category === 'private_project'}
                                                                    onChange={(e) => handleChange("project_category", e.target.value)}
                                                                    disabled={!formData.building_type}
                                                                    className="sr-only"
                                                                />
                                                                <div className="flex items-center justify-between w-full">
                                                                    <span className={`text-sm sm:text-base font-medium ${
                                                                        formData.project_category === 'private_project' 
                                                                            ? 'text-white' 
                                                                            : 'text-gray-700'
                                                                    }`}>
                                                                        <span className="block">مشروع خاص</span>
                                                                        <span className="block text-xs sm:text-sm opacity-80">Private Project</span>
                                                                    </span>
                                                                    <div className="relative">
                                                                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                                                                            formData.project_category === 'private_project' 
                                                                                ? 'border-white bg-[#F2AE1D]' 
                                                                                : 'border-gray-300'
                                                                        }`}>
                                                                            <div className={`absolute inset-0 rounded-full bg-white transition-transform duration-200 ${
                                                                                formData.project_category === 'private_project' 
                                                                                    ? 'scale-50' 
                                                                                    : 'scale-0'
                                                                            }`}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            <label className={`relative flex items-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#F2AE1D] hover:shadow-md ${
                                                                formData.project_category === 'sale' 
                                                                    ? 'border-[#F2AE1D] bg-[#F2AE1D] shadow-lg' 
                                                                    : 'border-gray-300'
                                                            }`}>
                                                                <input
                                                                    type="radio"
                                                                    name="project_category"
                                                                    value="sale"
                                                                    checked={formData.project_category === 'sale'}
                                                                    onChange={(e) => handleChange("project_category", e.target.value)}
                                                                    disabled={!formData.building_type}
                                                                    className="sr-only"
                                                                />
                                                                <div className="flex items-center justify-between w-full">
                                                                    <span className={`text-sm sm:text-base font-medium ${
                                                                        formData.project_category === 'sale' 
                                                                            ? 'text-white' 
                                                                            : 'text-gray-700'
                                                                    }`}>
                                                                        <span className="block">بيع</span>
                                                                        <span className="block text-xs sm:text-sm opacity-80">Sale</span>
                                                                    </span>
                                                                    <div className="relative">
                                                                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                                                                            formData.project_category === 'sale' 
                                                                                ? 'border-white bg-[#F2AE1D]' 
                                                                                : 'border-gray-300'
                                                                        }`}>
                                                                            <div className={`absolute inset-0 rounded-full bg-white transition-transform duration-200 ${
                                                                                formData.project_category === 'sale' 
                                                                                    ? 'scale-50' 
                                                                                    : 'scale-0'
                                                                            }`}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            <label className={`relative flex items-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#F2AE1D] hover:shadow-md ${
                                                                formData.project_category === 'rent' 
                                                                    ? 'border-[#F2AE1D] bg-[#F2AE1D] shadow-lg' 
                                                                    : 'border-gray-300'
                                                            }`}>
                                                                <input
                                                                    type="radio"
                                                                    name="project_category"
                                                                    value="rent"
                                                                    checked={formData.project_category === 'rent'}
                                                                    onChange={(e) => handleChange("project_category", e.target.value)}
                                                                    disabled={!formData.building_type}
                                                                    className="sr-only"
                                                                />
                                                                <div className="flex items-center justify-between w-full">
                                                                    <span className={`text-sm sm:text-base font-medium ${
                                                                        formData.project_category === 'rent' 
                                                                            ? 'text-white' 
                                                                            : 'text-gray-700'
                                                                    }`}>
                                                                        <span className="block">إيجار</span>
                                                                        <span className="block text-xs sm:text-sm opacity-80">Rent</span>
                                                                    </span>
                                                                    <div className="relative">
                                                                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                                                                            formData.project_category === 'rent' 
                                                                                ? 'border-white bg-[#F2AE1D]' 
                                                                                : 'border-gray-300'
                                                                        }`}>
                                                                            <div className={`absolute inset-0 rounded-full bg-white transition-transform duration-200 ${
                                                                                formData.project_category === 'rent' 
                                                                                    ? 'scale-50' 
                                                                                    : 'scale-0'
                                                                            }`}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            <label className={`relative flex items-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#F2AE1D] hover:shadow-md ${
                                                                formData.project_category === 'investment' 
                                                                    ? 'border-[#F2AE1D] bg-[#F2AE1D] shadow-lg' 
                                                                    : 'border-gray-300'
                                                            }`}>
                                                                <input
                                                                    type="radio"
                                                                    name="project_category"
                                                                    value="investment"
                                                                    checked={formData.project_category === 'investment'}
                                                                    onChange={(e) => handleChange("project_category", e.target.value)}
                                                                    disabled={!formData.building_type}
                                                                    className="sr-only"
                                                                />
                                                                <div className="flex items-center justify-between w-full">
                                                                    <span className={`text-sm sm:text-base font-medium ${
                                                                        formData.project_category === 'investment' 
                                                                            ? 'text-white' 
                                                                            : 'text-gray-700'
                                                                    }`}>
                                                                        <span className="block">إستثمار</span>
                                                                        <span className="block text-xs sm:text-sm opacity-80">Investment</span>
                                                                    </span>
                                                                    <div className="relative">
                                                                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                                                                            formData.project_category === 'investment' 
                                                                                ? 'border-white bg-[#F2AE1D]' 
                                                                                : 'border-gray-300'
                                                                        }`}>
                                                                            <div className={`absolute inset-0 rounded-full bg-white transition-transform duration-200 ${
                                                                                formData.project_category === 'investment' 
                                                                                    ? 'scale-50' 
                                                                                    : 'scale-0'
                                                                            }`}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        </>
                                                    )}
                                                    {(formData.building_type || !formData.building_type) && (
                                                        <label className={`relative flex items-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-md ${
                                                            formData.project_category === '' 
                                                                ? 'border-gray-400 bg-[#3a3b3a] shadow-lg' 
                                                                : 'border-gray-300'
                                                        }`}>
                                                            <input
                                                                type="radio"
                                                                name="project_category"
                                                                value=""
                                                                checked={formData.project_category === ""}
                                                                onChange={() => handleChange("project_category", "")}
                                                                disabled={!formData.building_type}
                                                                className="sr-only"
                                                            />
                                                            <div className="flex items-center justify-between w-full">
                                                                <span className={`text-sm sm:text-base font-medium ${
                                                                    formData.project_category === '' 
                                                                        ? 'text-white' 
                                                                        : 'text-gray-500'
                                                                }`}>
                                                                    Skip | تخطي
                                                                </span>
                                                                <div className="relative">
                                                                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                                                                        formData.project_category === '' 
                                                                            ? 'border-white bg-gray-400' 
                                                                            : 'border-gray-300'
                                                                    }`}>
                                                                        <div className={`absolute inset-0 rounded-full bg-white transition-transform duration-200 ${
                                                                            formData.project_category === '' 
                                                                                ? 'scale-50' 
                                                                                : 'scale-0'
                                                                        }`}></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    )}
                                                    {!formData.building_type && (
                                                        <p className="text-gray-500 text-sm">Please select building type first or skip | الرجاء اختيار نوع المبنى أولاً أو التخطي</p>
                                                    )}
                                                </div>
                                                {errors.project_category && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.project_category}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

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
                                            className="w-full md:w-auto px-8 py-3 bg-[#F2AE1D] text-white font-bold rounded-lg hover:bg-[#3a3b3a] hover:text-[#F2AE1D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="hidden lg:flex lg:col-span-2 flex-col justify-center sticky top-32">
                    {type === 'client' ? (
                        <>
                            <h2 className="text-3xl font-bold text-[#3a3b3a] mb-6 leading-tight">
                                Share your project details with us and we'll guide you through the next steps with clarity and confidence.
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                Whether you're building a home, developing land, designing interiors, or launching a business space, our team will review your request and provide direction, expectations, and a clear plan forward with no pressure and no obligations.
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-[#3a3b3a] mb-6 leading-tight">
                                Partner with Liwan for Mutual Growth
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed mb-4">
                                Whether you're a supplier, contractor, or service provider, our team will review your partnership request and explore potential collaboration opportunities.
                            </p>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                We'll get back to you with more information about how we can work together to achieve mutual success.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
