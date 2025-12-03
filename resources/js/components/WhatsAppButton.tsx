import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
    className?: string;
    fullWidth?: boolean;
}

export default function WhatsAppButton({ className = "", fullWidth = false }: WhatsAppButtonProps = {}) {
    const { socialSettings } = usePage<SharedData>().props;

    if (!socialSettings.whatsapp_active || !socialSettings.whatsapp_number) {
        return null;
    }

    const wrapperClass = `flex justify-center ${fullWidth ? "w-full" : ""}`.trim();
    const baseButtonClass =
        "cursor-pointer rounded-lg bg-[#F2AE1D] px-3 py-2 text-xl font-bold text-white transition-all hover:opacity-95 hover:scale-105 hover:shadow-lg flex items-center gap-2";
    const widthClass = fullWidth ? "w-full justify-center" : "w-fit";
    const finalClassName = [baseButtonClass, widthClass, className].filter(Boolean).join(" ");

    const phone = socialSettings.whatsapp_number.replace(/[^0-9]/g, "");
    const message = encodeURIComponent("Meet the Architect - I want to learn more");
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

    return (
        <div className={wrapperClass}>
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={finalClassName}
            >
                <FaWhatsapp size={24} />
                Meet The Architect
            </a>
        </div>
    );
}
