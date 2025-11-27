import { Testimonial } from '@/types';
import RatingStars from '../ui/RatingStars';

function Card({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl bg-[#3a3b3a] p-3 text-[#d9d9d9] md:p-5 flex-shrink-0 w-[280px] md:w-[350px] snap-center">
      <RatingStars value={testimonial?.rating} />
      <p className="mt-4 text-sm font-light md:text-base line-clamp-4">
        {testimonial?.testimonial}
      </p>
      <h3 className="mt-6 text-lg font-extrabold md:text-xl">
        {testimonial?.name}
      </h3>
    </div>
  );
}

export default Card;
