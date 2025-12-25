import Footer from '@/components/Footer';
import { NavbarDemo } from '@/components/Nav';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children }: AppLayoutProps) => (
    <>
        <Head>
            <meta head-key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
            <meta head-key="charset" charSet="utf-8" />
            <meta head-key="robots" name="robots" content="index, follow" />
            <meta head-key="author" name="author" content="Liwan Architecture" />
            <meta head-key="theme-color" name="theme-color" content="#3a3b3a" />
            <meta head-key="og:locale" property="og:locale" content="en_US" />
            <meta head-key="og:type" property="og:type" content="website" />
            <meta head-key="og:site_name" property="og:site_name" content="Liwan Architecture" />
            <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta head-key="twitter:site" name="twitter:site" content="@liwan_architecture" />
        </Head>
        <div className="bg-[#fafafa] max-w-screen-2xl mx-auto">
            <div>
                <NavbarDemo />
                {children}
                <Footer />
                <WhatsAppWidget />
                
            </div>
        </div>
    </>
);