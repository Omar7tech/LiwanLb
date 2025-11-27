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
                <div className="mt-5 p-5 text-[#3a3b3a]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div className="max-w-3xl">
                            <h1 className="mb-2 text-4xl font-semibold text-[#3a3b3a]">
                                {showFavorites ? 'My Favorites' : 'Blogs'}
                            </h1>
                            <p className="text-base leading-relaxed text-[#3a3b3a]/80">
                                {showFavorites 
                                    ? 'Your curated collection of favorite articles.' 
                                    : 'Explore articles, insights, and stories across various topics from industry trends to expert perspectives.'}
                            </p>
                        </div>

                        <button
                            onClick={() => setShowFavorites(!showFavorites)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 font-medium ${
                                showFavorites
                                    ? 'bg-[#f2ae1d] border-[#f2ae1d] text-[#3a3b3a]'
                                    : 'bg-white border-gray-300 text-gray-600 hover:border-[#f2ae1d] hover:text-[#f2ae1d]'
                            }`}
                        >
                            <svg
                                className={`w-5 h-5 ${showFavorites ? 'fill-current' : 'fill-transparent stroke-current'}`}
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
                            {showFavorites ? 'Show All Blogs' : 'Show Favorites'}
                        </button>
                    </div>

                    {displayedBlogs.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                                {displayedBlogs.map((blog: Blog) => (
                                    <Card key={blog.id} blog={blog} />
                                ))}
                            </div>
                            {!showFavorites && <Pagination pagination={blogs} />}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <h3 className="mb-2 text-3xl font-semibold text-gray-900">
                                No Blogs Yet
                            </h3>
                            <p className="mb-6 max-w-md text-center text-gray-600">
                                There are no blog posts to display right now.
                                Check back soon for interesting articles and
                                stories.
                            </p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    );
}

export default blogs;
