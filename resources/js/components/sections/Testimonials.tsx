import { Testimonials } from "@/types";
import Card from "../Testimonials/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function TestimonialsSection({ testimonials, showTitle = true }: { testimonials: Testimonials; showTitle?: boolean }) {
  if (testimonials.data.length === 0) return null;

  const count = testimonials.data.length;
  const isSmallCount = count <= 2;

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-0 md:px-10">
        {/* Header */}
        {showTitle && (
          <div className="mb-12 md:mb-16 text-center px-5">
              <h2 className="text-5xl md:text-8xl font-extralight text-[#3a3b3a] mb-6">
              Trusted By Leading Brands
              </h2>
          </div>
        )}

        {/* Carousel */}
        <div className={isSmallCount ? "px-5 md:px-20" : "px-0 md:px-20"}>
            <Carousel
                opts={{
                    align: isSmallCount ? "center" : "start",
                    loop: count > 2,
                    breakpoints: {
                        '(max-width: 767px)': {
                            align: isSmallCount ? 'center' : 'center',
                            loop: count > 2
                        }
                    }
                }}
                className="w-full"
            >
                <CarouselContent className={isSmallCount ? "-ml-2 md:-ml-6" : "-ml-4 md:-ml-6"}>
                    {testimonials.data.map((testimonial, index) => (
                        <CarouselItem 
                            key={index} 
                            className={`${isSmallCount ? "pl-2 md:pl-6 basis-full" : "pl-4 md:pl-6 basis-[85%]"} md:basis-1/2 lg:basis-1/3`}
                        >
                            <div className="h-full select-none">
                                <Card testimonial={testimonial} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-16 w-14 h-14 border-gray-200 hover:bg-[#f2ae1d] hover:text-white hover:border-[#f2ae1d] transition-colors" />
                <CarouselNext className="hidden md:flex -right-16 w-14 h-14 border-gray-200 hover:bg-[#f2ae1d] hover:text-white hover:border-[#f2ae1d] transition-colors" />
            </Carousel>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;

