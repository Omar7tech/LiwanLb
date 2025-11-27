import { Testimonial } from '@/types';
import RatingStars from '../ui/RatingStars';

function Card({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl bg-[#3a3b3a] p-5 text-[#d9d9d9] md:p-6 flex-shrink-0 w-[75vw] md:w-[calc(33.333%-16px)] snap-center h-full flex flex-col justify-between">
      <div>
        <RatingStars value={testimonial?.rating} />
        <p className="mt-4 text-sm font-light md:text-base line-clamp-4 leading-relaxed">
          {testimonial?.testimonial}
        </p>
      </div>
      <h3 className="mt-6 text-lg font-extrabold md:text-xl text-white">
        {testimonial?.name}
      </h3>
    </div>
  );
}

export default Card;
