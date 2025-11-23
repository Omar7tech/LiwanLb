import { show } from "@/routes/blogs";
import { Blog } from "@/types";
import { Link } from "@inertiajs/react";

function Card({blog} : {blog : Blog}) {
    return (
        <div className="group relative w-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://images.unsplash.com/photo-1572048572872-2394404cf1f3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={blog.title}
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content Container */}
            <div className="flex h-56 flex-col px-6 py-5">
                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-[#3a3b3a] line-clamp-2">
                    {blog.title}
                </h3>

                {/* Description with fade effect */}
                <div className="relative mb-4 flex-grow overflow-hidden">
                    <p className="text-sm leading-relaxed text-gray-600 line-clamp-4">
                        {blog.description}
                    </p>
                    {/* Fade overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* Read More Button */}
                <Link href={show(blog.slug)} className="group/btn flex w-full items-center justify-center gap-2 rounded-md bg-[#f2ae1d] px-4 py-2.5 font-medium text-[#3a3b3a] transition-all duration-300 hover:bg-[#3a3b3a] hover:text-white">
                    <span>Read More</span>
                    <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default Card;
