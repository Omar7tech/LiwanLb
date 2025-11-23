import Card from '@/components/blogs/Card';
import Header from '@/components/blogs/Header';
import Pagination from '@/components/Pagination';
import AppLayout from '@/layouts/app-layout';
import { Blog, PaginationProps } from '@/types';
import { Head } from '@inertiajs/react';

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
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                                {blogs.data.map((blog: Blog, index: number) => (
                                    <Card key={index} blog={blog} />
                                ))}
                            </div>
                            <Pagination pagination={blogs} />
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
