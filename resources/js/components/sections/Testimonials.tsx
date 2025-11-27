import { Testimonials } from "@/types";
import Card from "../Testimonials/Card";
import { useEffect, useRef, useState } from "react";

function TestimonialsSection({ testimonials }: { testimonials: Testimonials }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  // Calculate max index based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Desktop: 3 items per view
        setMaxIndex(Math.max(0, Math.ceil(testimonials.data.length / 3) - 1));
      } else {
        // Mobile: 1 item per view (but we show peeking so index is per item)
        setMaxIndex(Math.max(0, testimonials.data.length - 1));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [testimonials.data.length]);

  // Handle scroll events to update active index
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    
    // On mobile, width might be slightly different due to peeking, but this approx works
    const newIndex = Math.round(scrollLeft / (window.innerWidth >= 768 ? width : window.innerWidth * 0.75));
    setActiveIndex(newIndex);
  };

  const scrollNext = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const width = container.clientWidth;
    // On mobile scroll by card width (75vw + gap), on desktop by container width
    const scrollAmount = window.innerWidth >= 768 ? width : (window.innerWidth * 0.75 + 16); 
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const width = container.clientWidth;
    const scrollAmount = window.innerWidth >= 768 ? width : (window.innerWidth * 0.75 + 16);
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const width = container.clientWidth;
    // Calculate position based on index
    const position = window.innerWidth >= 768 
        ? index * width 
        : index * (window.innerWidth * 0.75 + 16); // Card width + gap
        
    container.scrollTo({ left: position, behavior: 'smooth' });
  };

  if (testimonials.data.length === 0) return null;

  return (
    <div className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-0 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto px-5">
            <h2 className="text-3xl md:text-5xl font-bold text-[#3a3b3a] mb-6">
            Trusted By Leading Brands
            </h2>
            
        </div>

        {/* Carousel Container */}
        <div className="relative group">
            {/* Prev Button (Desktop Only) */}
            <button 
                onClick={scrollPrev}
                disabled={activeIndex === 0}
                className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#3a3b3a] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#f2ae1d] hover:text-white transition-all duration-300 hidden md:flex"
                aria-label="Previous testimonial"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Scroll Area */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-12 px-[12.5vw] md:px-1 no-scrollbar items-stretch"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {testimonials.data.map((testimonial, index) => (
                    <Card key={index} testimonial={testimonial} />
                ))}
                
                {/* Spacer for mobile to allow last item to be fully visible if needed */}
                <div className="w-1 md:hidden flex-shrink-0"></div>
            </div>

            {/* Next Button (Desktop Only) */}
            <button 
                onClick={scrollNext}
                disabled={activeIndex === maxIndex}
                className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#3a3b3a] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#f2ae1d] hover:text-white transition-all duration-300 hidden md:flex"
                aria-label="Next testimonial"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-4 px-5">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                        activeIndex === index 
                            ? 'w-8 bg-[#f2ae1d]' 
                            : 'w-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
