import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    const { socialSettings } = usePage<SharedData>().props;

    if (!socialSettings.whatsapp_active || !socialSettings.whatsapp_number) {
        return null;
    }

    return (
        <div className="flex justify-center">
            <a
                href={`https://wa.me/${socialSettings.whatsapp_number.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-fit rounded-lg bg-[#F2AE1D] px-3 py-2 text-xl font-bold text-white transition-all hover:opacity-95 hover:scale-105 hover:shadow-lg flex items-center gap-2"
            >
                <FaWhatsapp size={24} />
                Meet The Architect
            </a>
        </div>
    );
}
