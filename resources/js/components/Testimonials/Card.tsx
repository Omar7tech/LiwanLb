import { Testimonial } from '@/types';
import RatingStars from '../ui/RatingStars';

function Card({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl bg-[#3a3b3a] p-5 text-[#d9d9d9] md:p-6 flex-shrink-0  w-full snap-center h-full min-h-[280px] md:min-h-[320px] flex flex-col justify-between">
      <div>
        <RatingStars value={testimonial?.rating} />
        <p className="mt-4 text-sm font-light md:text-base line-clamp-4 leading-relaxed">
          {testimonial?.testimonial}
        </p>
      </div>
      <div>
        <h3 className="text-lg font-extrabold md:text-xl text-white">
          {testimonial?.name}
        </h3>
        {testimonial?.work_name && (
          <p className="mt-1 text-xs md:text-sm text-[#F2AE1D] font-medium">
            {testimonial.work_name}
          </p>
        )}
      </div>
    </div>
  );
}

export default Card;
