import Card from '@/components/blogs/Card';
import Pagination from '@/components/Pagination';
import AppLayout from '@/layouts/app-layout';
import { Blog, PaginationProps } from '@/types';
import { Head } from '@inertiajs/react';

function blogs({ blogs }: { blogs: PaginationProps<Blog> }) {
    return (
        <>
            <Head title="blogs"></Head>
            <AppLayout>
                <div className="mt-5 p-5 text-[#3a3b3a]">
                    {blogs.data.length > 0 ? (
                        <>
                            {(blogs.meta?.current_page ?? 1) === 1 && (
                                <div className="mb-16 border-l-4 border-[#f2ae1d] pl-8">
                                    <div className="mb-6">
                                        <div className="mb-2 flex items-baseline gap-4">
                                            <h1 className="text-6xl font-bold tracking-tight text-[#3a3b3a] md:text-7xl">
                                                Blogs
                                            </h1>
                                            <span className="text-sm font-semibold tracking-wider text-[#f2ae1d] uppercase">
                                                Insights & Stories
                                            </span>
                                        </div>
                                        <div className="h-px w-full max-w-2xl bg-gradient-to-r from-[#f2ae1d] via-[#f2ae1d]/50 to-transparent"></div>
                                    </div>

                                    <div className="max-w-4xl space-y-4">
                                        <p className="text-xl leading-relaxed font-light text-[#3a3b3a]">
                                            Welcome to our blog section! Here,
                                            you'll find a collection of
                                            articles, stories, and insights on a
                                            variety of topics.
                                        </p>

                                        <p className="text-lg leading-relaxed text-[#3a3b3a]/70">
                                            Whether you're looking for the
                                            latest industry trends, helpful
                                            tips, or thought-provoking
                                            discussions, our blogs are designed
                                            to inform and inspire. Dive in and
                                            explore the wealth of knowledge
                                            shared by our expert writers.
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
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
