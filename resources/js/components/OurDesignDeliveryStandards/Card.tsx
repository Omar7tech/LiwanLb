import { DesignDeliveryStandard } from "@/types";
import { useEffect, useRef, useState } from "react";

function Card({designDeliveryStandard, index}: {designDeliveryStandard: DesignDeliveryStandard, index: number}) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div 
            ref={cardRef}
            className={`group w-full max-w-4xl rounded-2xl bg-[#3a3b3a] p-2 md:p-8 text-[#d9d9d9] flex flex-col relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#f2ae1d]/20 ${
                isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
            }`}
            style={{
                transitionDelay: `${index * 100}ms`
            }}
        >
            
            {/* Animated gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f2ae1d]/0 via-[#f2ae1d]/0 to-[#f2ae1d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#f2ae1d]/30 rounded-tr-2xl group-hover:border-[#f2ae1d] transition-colors duration-300"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#f2ae1d]/30 rounded-bl-2xl group-hover:border-[#f2ae1d] transition-colors duration-300"></div>
            
            {/* English Section */}
            <div className="relative z-10 mb-5 md:mb-15 space-y-2 transform group-hover:translate-x-1 transition-transform duration-300">
                <h1 className="font-bold md:font-extrabold  md:text-2xl text-[#afafaf] group-hover:text-[#f2ae1d] transition-colors duration-300">
                    {designDeliveryStandard.english_title}
                </h1>
                <p className="font-light text-xs md:text-sm group-hover:text-white transition-colors duration-300">
                    {designDeliveryStandard.english_description}
                </p>
            </div>
            {/* Arabic Section — pushed to bottom with mt-auto */}
            <div className="relative z-10 mb-4 space-y-2 mt-auto transform group-hover:-translate-x-1 transition-transform duration-300" dir="rtl">
                <h1 className="font-bold md:font-extrabold  md:text-2xl text-[#afafaf] group-hover:text-[#f2ae1d] transition-colors duration-300">
                    {designDeliveryStandard.arabic_title}
                </h1>
                <p className="font-light text-xs md:text-sm group-hover:text-white transition-colors duration-300">
                    {designDeliveryStandard.arabic_description}
                </p>
            </div>
        </div>
    );
}

export default Card;