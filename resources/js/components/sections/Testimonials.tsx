import { Testimonials } from "@/types";
import Card from "../Testimonials/Card";
import { useEffect, useRef } from "react";

function TestimonialsSection({ testimonials }: { testimonials: Testimonials }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = testimonials.data.length > 3;

  useEffect(() => {
    if (!shouldAutoScroll || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    // Duplicate items for seamless loop
    const items = scrollContainer.children;
    const itemsArray = Array.from(items);

    itemsArray.forEach(item => {
      const clone = item.cloneNode(true) as HTMLElement;
      scrollContainer.appendChild(clone);
    });

    const scroll = () => {
      scrollPosition += scrollSpeed;

      // Reset scroll when we've scrolled through the original items
      const maxScroll = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldAutoScroll]);

  if (testimonials.data.length <= 3) {
    return (
      <div className="mt-5 p-5 text-[#3a3b3a] md:mt-10">
        <h2 className="text-center text-3xl font-light md:text-5xl lg:text-[90px]">
          Trusted By Leading Brands
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:gap-6 px-0 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:px-20 max-w-7xl mx-auto">
          {testimonials.data.map((testimonial, index) => (
            <Card key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5  text-[#3a3b3a] md:mt-10 overflow-hidden">
      <h2 className="text-center text-3xl font-light md:text-5xl lg:text-[90px]">
        Trusted By Leading Brands
      </h2>
      <div className="mt-10 relative">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.data.map((testimonial, index) => (
            <Card key={index} testimonial={testimonial} />
          ))}
        </div>

        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#FAFAFA] to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
