import AppLayout from "@/layouts/app-layout";
import { Works } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";

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
                        className="text-center space-y-4 max-w-3xl mx-auto mb-12 md:mb-16"
                        initial="hidden"
                        animate="visible"
                        variants={titleVariants}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a3b3a]">
                            Explore Our Work Categories
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600">
                            Browse through our diverse range of architectural and design services
                        </p>
                    </motion.div>

                   
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {works.data.map((work, index) => (
                            <motion.div key={work.id} variants={itemVariants}>
                                <Link
                                    href={`/work/${work.slug}`}
                                    className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 aspect-square bg-white active:scale-95 block"
                                >
                                    
                                    <img
                                        src={work.image ?? "/images/blognoimage.webp"}
                                        alt={work.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />   
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>  
                                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                                            {work.name}
                                        </h2>
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
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F2AE1D] to-[#f5c451] transform scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                </Link>
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