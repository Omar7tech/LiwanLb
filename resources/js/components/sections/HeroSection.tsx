import { Link, usePage } from "@inertiajs/react";
import BlurText from "../BlurText";
import WhatsAppButton from "../WhatsAppButton";
import { type SharedData } from '@/types';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
export default function HeroSection() {
    const { sharedWorks } = usePage<SharedData>().props;
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVideoLoaded) {
                        const video = entry.target as HTMLVideoElement;
                        video.src = "/videos/HomePagevid.mp4";
                        video.load();
                        setIsVideoLoaded(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentVideoRef = videoRef.current;
        if (currentVideoRef) {
            observer.observe(currentVideoRef);
        }

        return () => {
            if (currentVideoRef) {
                observer.unobserve(currentVideoRef);
            }
        };
    }, [isVideoLoaded]);
    return (
        <section className="w-full px-5 pt-10">
            <div className="mx-auto space-y-10">
                <div className="or grid grid-cols-1 items-baseline-last gap-6 xl:grid-cols-2">
                    <div>
                        <BlurText
                            text="Architecture"
                            delay={50}
                            animateBy="letters"
                            direction="top"
                            className="text-[40px] leading-[1.1] font-bold text-[#3A3B3A] md:text-5xl xl:text-7xl"
                        />
                        <span className="text-[40px] leading-[1.1] font-bold text-[#3A3B3A] md:text-5xl xl:text-7xl md:whitespace-nowrap">
                            <BlurText
                                text="That Understands "
                                delay={50}
                                animateBy="words"
                                direction="top"
                                className="inline"
                            />
                            <br className="block md:hidden" />
                            <BlurText
                                text="You."
                                delay={50}
                                animateBy="letters"
                                direction="bottom"
                                className="inline"
                            />
                        </span>
                    </div>
                    
                    <div className="flex flex-col xl:ml-30 space-y-2 xl:space-y-5  mt-[-40px] md:mt-0">
                        <div className="flex justify-between">
                            <p className="mt-18 xl:mt-0 max-w-48 leading-tight font-light text-[#3A3B3A] animate-[fadeInLeft_1s_ease-out_0.6s_both]">
                                We listen first, design spaces that reflect your
                                identity, carry purpose, and deliver lasting
                                value.
                            </p>
                            <p className="max-w-48 leading-tight font-light text-[#3A3B3A] animate-[fadeInRight_1s_ease-out_0.8s_both]">
                                {sharedWorks.data.map((work) => (
                                    <Link
                                        className="block hover:text-[#f2ae1d] transition-colors"
                                        key={work.id}
                                        href={`/work/${work.slug}`}
                                    >
                                        {work.name}
                                    </Link>
                                ))}

                            </p>
                        </div>
                        <div className="flex justify-end md:justify-center animate-[fadeInUp_0.8s_ease-out_1s_both] ">
                            <WhatsAppButton />
                        </div>
                    </div>
                </div>
                
                <div className="w-full">
                    <div className="relative overflow-hidden rounded-2xl shadow-md animate-[fadeInScale_1.2s_ease-out_1.2s_both]">
                        <video
                            ref={videoRef}
                            className={`max-h-[calc(100vh-50px)] w-full object-cover transition-opacity duration-300 ${
                                isVideoLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="none"
                        />
                        
                        {/* Loading placeholder */}
                        {!isVideoLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#3a3b3a]"></div>
                            </div>
                        )}
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex w-full justify-center px-5 py-2 text-center align-middle text-3xl text-[#3a3b3a] md:text-5xl md:font-extralight xl:text-8xl"
                >
                    <p>هندسة . بناء . اشراف</p>
                </motion.div>
            </div>


        </section>
    );
}
