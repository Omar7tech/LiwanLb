import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

function blogs() {
    return (
        <>
            <Head title="blogs">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <AppLayout>This is Blogs</AppLayout>
        </>
    );
}

export default blogs;
