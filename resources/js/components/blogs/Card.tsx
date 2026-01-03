import { useState } from "react";
import { Link } from "@inertiajs/react";
import { useFavorites } from "@/hooks/useFavorites";

// Helper function for blog route
const show = (slug: string) => `/blog/${slug}`;

function Card({ blog = { 
  id: 1,
  slug: "automotive",
  title: "Automotive",
  content: "",
  description: "Superchat for car dealerships, workshops and rental companies.",
  image: "https://images.unsplash.com/photo-1493195671595-30a332807d62?w=500&h=400&fit=crop",
  created_at: "",
  updated_at: ""
} }) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${blog.slug}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
    setShowShareMenu(false);
  };

  const shareToWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${blog.slug}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + shareUrl)}`, '_blank');
    setShowShareMenu(false);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(blog);
  };

  return (
    <Link
      href={show(blog.slug)}
      className="relative w-full h-96 rounded-2xl overflow-hidden group cursor-pointer block"
    >
      {/* Image Background */}
      <img
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          isLoading ? 'blur-sm' : ''
        }`}
        loading="lazy"
        src={blog.image ?? '/images/blognoimage.webp'}
        alt={blog.slug}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />

      {/* Dark Gradient Overlay - stronger at bottom */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/70" />

      {/* Favorite & Share Buttons - Top Right */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md bg-white/20 border border-white/40 transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95"
          aria-label={isFavorite(blog.id) ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            className={`h-5 w-5 transition-all duration-300 ${
              isFavorite(blog.id) 
                ? "fill-red-500 text-red-500 drop-shadow-lg" 
                : "fill-transparent text-white hover:fill-white/40"
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

        {/* Share Button */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowShareMenu(!showShareMenu);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md bg-white/20 border border-white/40 text-white transition-all duration-300 hover:bg-white/30 hover:scale-110"
            aria-label="Share blog"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

          {/* Share Menu Dropdown */}
          {showShareMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowShareMenu(false)}
              />
              <div className="absolute top-full right-0 z-20 mt-2 w-48 rounded-lg bg-white shadow-2xl border border-gray-200 overflow-hidden">
                <div className="p-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      shareToWhatsApp(e);
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-green-50 hover:text-green-600"
                  >
                    <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopyLink(e);
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content - Bottom Left with Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
        {/* Top Section - Empty for spacing */}
        <div />

        {/* Bottom Section - Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-3xl font-bold leading-tight max-w-xs">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/90 max-w-xs leading-relaxed line-clamp-2">
            {blog.description}
          </p>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-white/90 hover:text-white transition-colors pt-2 group/link">
            <span className="text-sm font-medium">Read more</span>
            <svg
              className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;    