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
            <Head title="Our Work Categories" />
            <AppLayout>

                <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
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
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
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
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 aspect-square bg-white active:scale-95 block"
        >
            {isLoading && (
                <div className="absolute inset-0 z-10 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#f2ae1d] rounded-full animate-spin"></div>
                    </div>
                </div>
            )}
            <img
                src={imageSrc}
                alt={work.name}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setImageSrc(defaultImage);
                    setIsLoading(false);
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isLoading ? "opacity-0" : "opacity-100"}`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <h2 className="text-xl md:text-2xl lg:text-4xl font-light text-white mb-1 md:mb-2 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                    {work.name}
                </h2>

                {work.title && (
                    <p className="text-sm md:text-lg text-gray-200 md:text-[#F2AE1D] font-normal md:font-medium mb-3 md:mb-2 
                        opacity-100 md:opacity-0 md:group-hover:opacity-100 
                        transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 
                        transition-all duration-500 delay-75 line-clamp-2">
                        {work.title}
                    </p>
                )}

                <div className="flex items-center gap-2 text-[#F2AE1D] font-semibold text-sm md:text-base opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-500">
                    <span>Explore</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-500 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#F2AE1D] to-[#f5c451] transform scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </Link>
    );
}
