import Card from '@/components/blogs/Card';
import Pagination from '@/components/Pagination';
import AppLayout from '@/layouts/app-layout';
import { Blog, PaginationProps } from '@/types';
import { Head } from '@inertiajs/react';
import { useFavorites } from '@/hooks/useFavorites';

function blogs({ blogs }: { blogs: PaginationProps<Blog> }) {
    const { favorites, showFavorites, setShowFavorites } = useFavorites();

    const displayedBlogs = showFavorites ? favorites : blogs.data;

    return (
        <>
            <Head title="blogs"></Head>
            <AppLayout>
                <div className="px-6 py-8 md:px-8 lg:px-12 text-[#3a3b3a]">
                    {/* Header Section */}
                    <div className="mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6">
                        <div className="flex-1">
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#3a3b3a] mb-3">
                                {showFavorites 
                                    ? 'Favorites' 
                                    : (blogs.meta.current_page > 1 ? `Articles – Page ${blogs.meta.current_page}` : 'Articles')}
                            </h1>
                            {(showFavorites || blogs.meta.current_page === 1) && (
                                <p className="text-base md:text-lg text-[#3a3b3a]/65 font-light leading-relaxed">
                                    {showFavorites 
                                        ? 'Your curated picks' 
                                        : 'Insights and stories from industry leaders'}
                                </p>
                            )}
                        </div>

                        <button
                            onClick={() => setShowFavorites(!showFavorites)}
                            className={`flex items-center gap-2.5 px-6 py-2.5 text-sm font-medium transition-all duration-300 border-b-2 w-fit ${
                                showFavorites
                                    ? 'text-[#f2ae1d] border-[#f2ae1d]'
                                    : 'text-[#3a3b3a] border-[#3a3b3a]/20 hover:border-[#f2ae1d] hover:text-[#f2ae1d]'
                            }`}
                        >
                            <svg
                                className={`w-4 h-4 transition-all ${showFavorites ? 'fill-current' : 'fill-transparent stroke-current'}`}
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
                            {showFavorites ? 'All Articles' : 'My Favorites'}
                        </button>
                    </div>

                    {displayedBlogs.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                                {displayedBlogs.map((blog: Blog) => (
                                    <Card key={blog.id} blog={blog} />
                                ))}
                            </div>
                            {!showFavorites && <Pagination pagination={blogs} />}
                        </>
                    ) : (
                        <div className="py-24">
                            <h3 className="text-3xl md:text-4xl font-semibold text-[#3a3b3a] mb-3">
                                {showFavorites ? 'No favorites yet' : 'No articles'}
                            </h3>
                            <p className="text-base text-[#3a3b3a]/60 font-light max-w-lg">
                                {showFavorites 
                                    ? 'Start adding articles to your favorites collection by clicking the heart icon.'
                                    : 'Check back soon for new insights and stories.'}
                            </p>
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    );
}

export default blogs;