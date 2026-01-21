import AppLayout from "@/layouts/app-layout";
import { Work, Works } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";

function WorkIndex({ works }: { works: Works }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <>
            <Head title="Our Work Categories">
                <meta head-key="description" name="description" content="Explore our diverse range of architectural and design services. Browse through our work categories and discover how Liwan Architecture transforms spaces with purpose and innovation." />
                <meta head-key="keywords" name="keywords" content="architecture, design, work categories, architectural services, design projects, Liwan Architecture, innovation, spaces" />
                <meta head-key="og:title" property="og:title" content="Our Work Categories - Liwan Architecture" />
                <meta head-key="og:description" property="og:description" content="Explore our diverse range of architectural and design services. Browse through our work categories and discover how Liwan Architecture transforms spaces with purpose and innovation." />
                <meta head-key="og:image" property="og:image" content="/images/logo.png" />
                <meta head-key="og:url" property="og:url" content={window.location.origin + '/works'} />
                <meta head-key="og:type" property="og:type" content="website" />
                <meta head-key="og:site_name" property="og:site_name" content="Liwan Architecture" />
                <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
                <meta head-key="twitter:title" name="twitter:title" content="Our Work Categories - Liwan Architecture" />
                <meta head-key="twitter:description" name="twitter:description" content="Explore our diverse range of architectural and design services. Browse through our work categories and discover how Liwan Architecture transforms spaces with purpose and innovation." />
                <meta head-key="twitter:image" name="twitter:image" content="/images/logo.png" />
                <meta head-key="structured-data" name="structured-data" content="work-index">
                    <script type="application/ld+json">
                        {JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'CollectionPage',
                            'name': 'Our Work Categories - Liwan Architecture',
                            'description': 'Explore our diverse range of architectural and design services. Browse through our work categories and discover how Liwan Architecture transforms spaces with purpose and innovation.',
                            'url': window.location.origin + '/works',
                            'image': '/images/logo.png',
                            'mainEntity': {
                                '@type': 'Organization',
                                'name': 'Liwan Architecture'
                            }
                        })}
                    </script>
                </meta>
            </Head>
            <AppLayout>

                <div className="mx-auto px-5 py-12 md:py-16">
                    <motion.div
                        className="space-y-4 mb-12 md:mb-16"
                        initial="hidden"
                        animate="visible"
                        variants={titleVariants}
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-8xl font-extralight text-[#3a3b3a]">
                            Explore Our Work Categories
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-[#3a3b3a] ps-0 md:ps-2">
                            Browse through our diverse range of architectural and design services
                        </p>
                    </motion.div>


                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {works.data.map((work) => (
                            <motion.div key={work.id} variants={itemVariants}>
                                <WorkCard work={work} />
                            </motion.div>
                        ))}
                    </motion.div>
                    {works.data.length === 0 && (
                        <div className="text-center py-16 md:py-24">
                            <div className="text-gray-400 text-lg md:text-xl">
                                No work categories available at the moment.
                            </div>
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    );
}

export default WorkIndex;

function WorkCard({ work }: { work: Work }) {
    const defaultImage = "/images/blognoimage.webp";
    const [imageSrc, setImageSrc] = useState(work.image ?? defaultImage);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Link
            viewTransition
            href={`/work/${work.slug}`}
            className="relative group overflow-hidden rounded-2xl h-[250px] md:h-[350px] block transition-transform duration-500 hover:scale-[1.02]"
        >
            {/* Skeleton Loader */}
            {isLoading && (
                <div className="absolute inset-0 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#f2ae1d] rounded-full animate-spin" />
                    </div>
                </div>
            )}

            {/* Main Image */}
            <img
                src={imageSrc}
                alt={work.name}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setImageSrc(defaultImage);
                    setIsLoading(false);
                }}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-90 transition-opacity duration-300" />

            {/* Top Right Glassy Explore Button */}
            <div className="absolute top-4 right-4 z-20">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium transition-all duration-300 group-hover:bg-[#3a3b3a]/10 group-hover:border-[#3a3b3a]/10">
                    <span>Explore</span>
                    <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>

            {/* Content at Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-6 space-y-1">
                <h3 className="text-white text-2xl md:text-4xl font-normal leading-tight tracking-wide">
                    {work.name}
                </h3>
            </div>
        </Link>
    );
}
