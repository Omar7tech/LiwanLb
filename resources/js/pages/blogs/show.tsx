import AppLayout from '@/layouts/app-layout';
import { Blog } from '@/types';
import { Head } from '@inertiajs/react';

// Custom utility to format the date for a clean UI
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// --- Brand Colors ---
const PRIMARY_COLOR = '#3a3b3a';
const ACCENT_COLOR = '#f2ae1d';

function show({ blog }: { blog: Blog }) {

    // Fallback if content is unexpectedly null (though it should be the HTML of the post)
    const postContent = blog.content || '<p>This post is currently empty. Check back soon!</p>';

    // Set a dynamic title for the <Head> component
    const pageTitle = blog.title || "Blog Post";

    return (
        <>
            <Head title={pageTitle} />
            <AppLayout>
                <div className="text-gray-800">

                    {/* --- 1. HEADER SECTION: Image and Title --- */}
                    <header
                        className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                        {/* Conditional Full-Width Image (if available) */}
                        {blog.image && (
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover opacity-30 transition-opacity duration-500"
                                />
                                {/* Dark overlay for text contrast */}
                                <div className="absolute inset-0 bg-black/50" />
                            </div>
                        )}

                        {/* Header Content Wrapper */}
                        <div className="relative z-10 max-w-4xl mx-auto px-6 text-white text-center">

                            {/* Metadata */}
                            {blog.created_at && (
                                <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: ACCENT_COLOR }}>
                                    Posted on {formatDate(blog.created_at)}
                                </p>
                            )}

                            {/* Main Title */}
                            {blog.title && (
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                                    {blog.title}
                                </h1>
                            )}

                            {/* Description/Excerpt */}
                            {blog.description && (
                                <p className="text-lg opacity-80 max-w-3xl mx-auto">
                                    {blog.description}
                                </p>
                            )}
                        </div>
                    </header>

                    {/* --- 2. MAIN CONTENT BODY --- */}
                    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">

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

export default show;