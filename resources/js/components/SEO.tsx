import { Head } from '@inertiajs/react';

interface SeoProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
}

export default function Seo({
    title,
    description,
    keywords = 'architecture, design, Lebanon, Mount Lebanon, residential, commercial, interior design',
    image = '/images/logo.png',
    url = typeof window !== 'undefined' ? window.location.href : '',
    type = 'website',
}: SeoProps) {
    const siteName = 'Liwan Architecture';
    
    return (
        <Head>
            <title>{`${title} | ${siteName}`}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={`${title} | ${siteName}`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${title} | ${siteName}`} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />
        </Head>
    );
}
