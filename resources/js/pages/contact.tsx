import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

function contact() {
    return (
        <>
            <Head title="Contact Us">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <AppLayout>Contact Us</AppLayout>
        </>
    );
}

export default contact;
