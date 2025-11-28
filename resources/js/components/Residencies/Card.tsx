import { Residency } from "@/types"
import { useState } from "react"

function Card({ residency, onImageClick }: { residency: Residency; onImageClick?: (image: string) => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    if (residency.image && !hasError && onImageClick) {
      onImageClick(residency.image);
    }
  };

  return (
    <div 
        onClick={handleClick}
        className="relative group overflow-hidden rounded-2xl h-[250px] md:h-[350px] cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
    >
        {/* Skeleton Loader with Shimmer Effect - Only for Image */}
        {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                
                {/* Spinning Loader Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-[#f2ae1d] rounded-full animate-spin"></div>
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
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* Gradient Overlay - Black fade from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Title at Bottom - Always Visible */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h3 className="text-white text-xl md:text-4xl font-bold leading-tight">
                {residency.name}
            </h3>
        </div>
    </div>
  )
}

export default Card