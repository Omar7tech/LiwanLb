import AppLayout from '@/layouts/app-layout';
import { Blog } from '@/types';
import { Head } from '@inertiajs/react';
import { useFavorites } from '@/hooks/useFavorites';
import { motion, Variants } from 'framer-motion';
import { Share2, Heart } from 'lucide-react';

// Custom utility to format the date for a clean UI
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    }
};

function Show({ blog }: { blog: Blog }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const postContent = blog.content || '<p>This post is currently empty. Check back soon!</p>';
    const pageTitle = blog.title || "Blog Post";
    const description = blog.description || (blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : 'Read our latest blog post for insights and updates.');
    const imageUrl = blog.image || '/images/blogshowplaceholder.webp';
    const siteUrl = window.location.origin + '/blog/' + blog.slug;

    return (
        <>
            <Head>
                <title>{`${pageTitle} - Blog`}</title>
                <meta head-key="description" name="description" content={description} />
                <meta head-key="og:title" property="og:title" content={pageTitle} />
                <meta head-key="og:description" property="og:description" content={description} />
                <meta head-key="og:image" property="og:image" content={imageUrl} />
                <meta head-key="og:url" property="og:url" content={siteUrl} />
                <meta head-key="og:type" property="og:type" content="article" />
                <meta head-key="og:site_name" property="og:site_name" content="Blog" />
                <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
                <meta head-key="twitter:title" name="twitter:title" content={pageTitle} />
                <meta head-key="twitter:description" name="twitter:description" content={description} />
                <meta head-key="twitter:image" name="twitter:image" content={imageUrl} />
                <meta head-key="structured-data" name="structured-data" content="blog">
                    <script type="application/ld+json">
                        {JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'BlogPosting',
                            'headline': pageTitle,
                            'description': description,
                            'image': imageUrl,
                            'author': {
                                '@type': 'Organization',
                                'name': 'Blog'
                            },
                            'url': siteUrl
                        })}
                    </script>
                </meta>
            </Head>
            <AppLayout>
                <div className="min-h-screen bg-linear-to-b from-white to-gray-50">

                    {/* Hero Section */}
                    <motion.header
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative overflow-hidden"
                    >
                        {/* Background Image with Overlay */}
                        <div className="relative h-96 md:h-[500px] lg:h-[600px]">
                            <div className="absolute inset-0">
                                <img
                                    src={blog.image ?? '/images/blogshowplaceholder.webp'}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                            </div>
                            
                            {/* Floating Decorative Elements */}
                            <div className="absolute top-10 right-10 w-20 h-20 bg-[#f2ae1d]/20 rounded-full blur-xl animate-pulse" />
                            <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#3a3b3a]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                            
                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex items-end">
                                <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-6 sm:pb-12 w-full">
                                    <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
                                        {/* Date Badge */}
                                        {blog.created_at && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                                <span className="text-xs sm:text-sm font-medium text-white">
                                                    {formatDate(blog.created_at)}
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Title */}
                                        {blog.title && (
                                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                                {blog.title}
                                            </h1>
                                        )}
                                        
                                        {/* Description */}
                                        {blog.description && (
                                            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl">
                                                {blog.description}
                                            </p>
                                        )}
                                        
                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => toggleFavorite(blog)}
                                                className="flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white rounded-full font-medium border border-white/20 hover:bg-white/20 transition-colors duration-200 shadow-lg"
                                            >
                                                <Heart
                                                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                                                        isFavorite(blog.id)
                                                            ? "fill-red-500 text-red-500"
                                                            : "text-white"
                                                    }`}
                                                />
                                                <span className="text-sm sm:text-base">{isFavorite(blog.id) ? "Saved" : "Save"}</span>
                                            </motion.button>
                                            
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => navigator.share?.({ title: blog.title, url: siteUrl })}
                                                className="flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white rounded-full font-medium border border-white/20 hover:bg-white/20 transition-colors duration-200"
                                            >
                                                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="text-sm sm:text-base">Share</span>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.header>

                    {/* --- 2. MAIN CONTENT BODY --- */}
                    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 overflow-auto">

                        {/* Conditional Content Rendering */}
                        {postContent && (
                            <div className="markdown-content text-lg">
                                {/* DANGER: Only render HTML if you trust the source (WYSIWYG editor output) */}
                                <div dangerouslySetInnerHTML={{ __html: postContent }} />
                            </div>
                        )}

                        {/* Fallback for Empty Content */}
                        {!blog.content && (
                             <div className="py-10 text-center text-gray-500 italic">
                                <p>Content for this blog post is not yet available.</p>
                             </div>
                        )}
                    </main>

                    {/* --- 3. Optional Footer/Author/CTA Area --- */}
                    <div className="max-w-4xl mx-auto px-6 pb-12">
                        {/* You would place a Share Bar, Author Bio, or related posts here */}
                    </div>

                </div>
            </AppLayout>
        </>
    );
}

export default Show;
