import { show } from "@/routes/blogs";
import { Blog } from "@/types";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";

function Card({blog} : {blog : Blog}) {
    const [showShareMenu, setShowShareMenu] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();
    const shareUrl = typeof window !== 'undefined' ? window.location.origin + show(blog.slug).url : '';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        setShowShareMenu(false);
    };

    const shareToWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + shareUrl)}`, '_blank');
        setShowShareMenu(false);
    };

    return (
        <div className="group relative w-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    src={blog.image ?? '/images/blognoimage.webp'}
                    alt={blog.slug}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Like Button - Absolute Positioned on Image */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(blog);
                    }}
                    className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95"
                    aria-label={isFavorite(blog.id) ? "Remove from favorites" : "Add to favorites"}
                >
                    <svg
                        className={`h-5 w-5 transition-colors duration-300 ${
                            isFavorite(blog.id) 
                                ? "fill-red-500 text-red-500" 
                                : "fill-transparent text-gray-600 hover:text-red-500"
                        }`}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>
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
                {/* Button Container */}
                <div className="flex gap-2">
                    {/* Read More Button */}
                    <Link
                        href={show(blog.slug)}
                        className="group/btn flex flex-1 items-center justify-center gap-2 rounded-md bg-[#f2ae1d] px-4 py-2.5 font-medium text-[#3a3b3a] transition-all duration-300 hover:bg-[#3a3b3a] hover:text-white"
                    >
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
                    {/* Share Button */}
                    <div className="relative">
                        <button
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            className="cursor-pointer h-full group/share flex items-center justify-center rounded-md bg-gray-100 px-3 py-2.5 text-gray-600 transition-all duration-300 hover:bg-[#3a3b3a] hover:text-white"
                            aria-label="Share blog"
                        >
                            <svg
                                className="h-5 w-5 transition-transform duration-300 group-hover/share:scale-110"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>

                        {/* Share Menu Dropdown */}
                        {showShareMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowShareMenu(false)}
                                />
                                <div className="absolute bottom-full right-0 z-20 mb-2 w-48 rounded-lg bg-white shadow-xl border border-gray-200">
                                    <div className="p-2">
                                        <button
                                            onClick={shareToWhatsApp}
                                            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50 hover:text-green-600"
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                            </svg>
                                            WhatsApp
                                        </button>
                                        <button
                                            onClick={handleCopyLink}
                                            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Copy Link
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
