import { show } from "@/routes/residency";
import { Residency } from "@/types"
import { Link } from "@inertiajs/react"
import { useState } from "react"

function Card({ residency, onImageClick }: { residency: Residency; onImageClick?: (image: string) => void }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (residency.image && !hasError && onImageClick) {
            onImageClick(residency.image);
        }
    };

    return (
        <Link
            viewTransition
            href={show(residency)}
            className="relative group overflow-hidden rounded-2xl h-[250px] md:h-[350px] block transition-transform duration-500 hover:scale-[1.02]"
        >
            {/* Skeleton Loader */}
            {isLoading && (
                <div className="absolute inset-0 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#f2ae1d] rounded-full animate-spin" />
                    </div>
                </div>
            )}

            {/* Main Image */}
            <img
                src={residency.image || '/images/residenceNoImg.webp'}
                alt={residency.name}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setHasError(true);
                    setIsLoading(false);
                }}
                onClick={handleImageClick}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'} cursor-pointer`}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-90 transition-opacity duration-300" />

            {/* Top Right Glassy Explore Button */}
            <div className="absolute top-4 right-4 z-20">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium transition-all duration-300 group-hover:bg-[#3a3b3a]/10 group-hover:border-[#3a3b3a]/10">
                    <span>Explore</span>
                    <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>

            {/* Content at Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-6 space-y-1">
                <h3 className="text-white text-xl md:text-2xl font-bold leading-tight tracking-wide">
                    {residency.name}
                </h3>
            </div>
        </Link>
    )
}

export default Card
