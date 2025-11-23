import AppLayout from '@/layouts/app-layout';
import { Blog } from '@/types';
import { Head } from '@inertiajs/react';

function show({ blog }: { blog: Blog }) {
    console.log(blog.content)
    return (
        <>
            <Head title="sdf">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <AppLayout>
                <div className="p-5 text-[#3a3b3a]">
                    {blog.title}
                    {blog.content}
                </div>
            </AppLayout>
        </>
    );
}

export default show;
