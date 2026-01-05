import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function BuiltFor() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);


    const cards = [
        {
            title: 'Home Owners ',
            description: 'We help homeowners build, renovate, and maintain their dream spaces.',
            image: '/images/homeowners.webp'
        },
        {
            title: 'Developers',
            description: 'Tools and services tailored for modern developers and tech teams.',
            image: '/images/developers.webp'
        },
        {
            title: 'Business Owners',
            description: 'Solutions that help business owners scale efficiently and securely.',
            image: '/images/businessowner.webp'
        }
    ];

    // --- Existing Carousel Logic (Mobile Swipe) ---
    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const endX = e.clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext();
            else handlePrevious();
        }
        setIsDragging(false);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext();
            else handlePrevious();
        }
        setIsDragging(false);
    };
    // ---------------------------------------------


    return (
        <div className="w-full items-center justify-between space-y-5 p-5 lg:space-x-16 lg:flex overflow-hidden relative">
            {/* LEFT TEXT (TITLE) */}
            <div className="flex pe-8 leading-[1.1] font-bold whitespace-nowrap text-[#3a3b3a] lg:flex-col lg:relative lg:z-10">
                {/* Hover effect remains: changes color to accent yellow */}

                <span className="text-2xl md:text-6xl lg:text-[clamp(4rem,8vw,10rem)] inline transition-all duration-300 hover:text-[#f2ae1d] cursor-default">We Build</span>
                <span className="text-2xl md:text-6xl lg:text-[clamp(4rem,8vw,10rem)] inline transition-all duration-300 hover:text-[#f2ae1d] cursor-default ml-2">For People</span>
                <span className="text-2xl md:text-6xl lg:text-[clamp(4rem,8vw,10rem)] inline transition-all duration-300 hover:text-[#f2ae1d] cursor-default ml-2">Like You</span>
            </div>

            {/* CAROUSEL WRAPPER - MOBILE (UNCHANGED) */}
            <div className="relative w-full lg:hidden">
                <div
                    ref={carouselRef}
                    className="flex gap-5 overflow-hidden rounded-2xl"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="shrink-0 w-full h-[300px] md:h-[500px] rounded-2xl md:rounded-[40px] overflow-hidden
                                       flex items-end justify-center cursor-grab active:cursor-grabbing
                                       transition-transform duration-300 ease-out"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), rgba(0,0,0,0)),
                                    url("${card.image}")
                                `,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 1.25}rem))`
                            }}
                        >
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-0"></div>
                            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8 text-white">
                                <h3 className="font-bold text-xl md:text-2xl mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm md:text-base font-medium leading-relaxed opacity-95">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* NAVIGATION ARROWS - MOBILE */}
                <button
                    onClick={handlePrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80
                               text-white p-2 rounded-full transition-all"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80
                               text-white p-2 rounded-full transition-all"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>

                {/* DOTS INDICATOR */}
                <div className="flex justify-center gap-2 mt-4">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-[#f2ae1d] w-8' : 'bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div
                className="hidden w-full gap-5 lg:flex lg:relative lg:z-10"
            >

                {/* --- CARD 1: Home Owners --- (UNCHANGED) */}
                <div
                    className="group relative flex-1 hover:flex-2 transition-[flex] duration-500 flex h-[300px] md:h-[500px]
                                 items-end justify-center overflow-hidden rounded-2xl md:rounded-[40px]
                                bg-cover bg-center text-white"
                    style={{
                        backgroundImage: `
                            linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), rgba(0,0,0,0)),
                            url("${cards[0].image}")
                        `
                    }}
                >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 z-0"></div>
                    <span className="relative z-10 font-bold text-center px-4 pb-10
                                     text-lg sm:text-xl md:text-2xl transition-all duration-500
                                     group-hover:translate-y-[-50px] group-hover:opacity-0">
                        {cards[0].title}
                    </span>
                    <p className="
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] text-center text-base md:text-xl font-medium
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 z-10
                    ">
                        {cards[0].description}
                    </p>
                </div>

                {/* --- CARD 2: Developers --- (UNCHANGED) */}
                <div
                    className="group relative flex-2 hover:flex-2 transition-[flex] duration-500 flex h-[300px] md:h-[500px]
                                 items-end justify-center overflow-hidden rounded-2xl md:rounded-[40px]
                                 bg-cover bg-center text-white"
                    style={{
                        backgroundImage: `
                            linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), rgba(0,0,0,0)),
                            url("${cards[1].image}")
                        `
                    }}
                >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 z-0"></div>
                    <span className="relative z-10 font-extrabold text-center px-4 pb-10
                                     text-xl sm:text-2xl md:text-4xl transition-all duration-500
                                     group-hover:translate-y-[-50px] group-hover:opacity-0">
                        {cards[1].title}
                    </span>
                    <p className="
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] text-center text-base md:text-xl font-medium
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 z-10
                    ">
                        {cards[1].description}
                    </p>
                </div>

                {/* --- CARD 3: Business Owners --- (UNCHANGED) */}
                <div
                    className="group relative flex-1 hover:flex-2 transition-[flex] duration-500 flex h-[300px] md:h-[500px]
                                 items-end justify-center overflow-hidden rounded-2xl md:rounded-[40px]
                                bg-cover bg-center text-white"
                    style={{
                        backgroundImage: `
                            linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), rgba(0,0,0,0)),
                            url("${cards[2].image}")
                        `
                    }}
                >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 z-0"></div>
                    <span className="relative z-10 font-bold text-center px-4 pb-10
                                     text-lg sm:text-xl md:text-2xl transition-all duration-500
                                     group-hover:translate-y-[-50px] group-hover:opacity-0">
                        {cards[2].title}
                    </span>
                    <p className="
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] text-center text-base md:text-xl font-medium
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 z-10
                    ">
                        {cards[2].description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BuiltFor;