import Card from '@/components/blogs/Card';
import Header from '@/components/blogs/Header';
import AppLayout from '@/layouts/app-layout';
import { Blog, PaginationProps } from '@/types';
import { Head, InfiniteScroll } from '@inertiajs/react';

function blogs({ blogs }: { blogs: PaginationProps<Blog> }) {
    return (
        <>
            <Head title="blogs">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <AppLayout>
                <div className="p-5 text-[#3a3b3a]">
                    {blogs.data.length > 0 ? (
                        <>
                            <Header />
                            <InfiniteScroll
                                data="blogs"
                                preserveUrl
                                loading={() => (
                                    <div className="flex items-center justify-center py-12">
                                        <div className="flex flex-col items-center gap-4">
                                            {/* Spinner */}
                                            <div className="relative h-12 w-12">
                                                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                                                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#f2ae1d] border-r-[#f2ae1d] animate-spin"></div>
                                            </div>
                                            <p className="text-sm font-medium text-gray-600">
                                                Loading more blogs...
                                            </p>
                                        </div>
                                    </div>
                                )}
                            >
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                                    {blogs.data.map(
                                        (blog: Blog, index: number) => (
                                            <Card key={index} blog={blog} />
                                        ),
                                    )}
                                    
                                </div>
                            </InfiniteScroll>
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
