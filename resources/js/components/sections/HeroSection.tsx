import { Link, usePage } from "@inertiajs/react";
import BlurText from "../BlurText";
import WhatsAppButton from "../WhatsAppButton";
import { type SharedData } from '@/types';
import { Home } from "lucide-react";
import { motion } from 'framer-motion';
export default function HeroSection() {
    const { sharedWorks } = usePage<SharedData>().props;
    return (
        <section className="w-full px-5 pt-10">
            <div className="mx-auto space-y-10">
                <div className="or grid grid-cols-1 items-baseline-last gap-6 lg:grid-cols-2">
                    <div>
                        <BlurText
                            text="Architecture"
                            delay={50}
                            animateBy="letters"
                            direction="top"
                            className="text-[40px] leading-[1.1] font-bold text-[#3A3B3A] md:text-5xl lg:text-7xl"
                        />
                        <span className="text-[40px] leading-[1.1] font-bold text-[#3A3B3A] md:text-5xl lg:text-7xl md:whitespace-nowrap">
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
                                direction="top"
                                className="inline"
                            />
                        </span>
                    </div>
                    
                    <div className="flex flex-col lg:ml-30">
                        <div className="flex justify-between">
                            <p className="mt-18 lg:mt-0 max-w-48 leading-tight font-light text-[#3A3B3A] animate-[fadeInLeft_1s_ease-out_0.6s_both]">
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
                        <div className="flex justify-end md:justify-center animate-[fadeInUp_0.8s_ease-out_1s_both]">
                            <WhatsAppButton />
                        </div>
                    </div>
                </div>
                
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl shadow-md animate-[fadeInScale_1.2s_ease-out_1.2s_both]">
                        {/* <video
                            src="/videos/video.webm"
                            className="max-h-[calc(100vh-150px)] w-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        /> */}

                        <img className="max-h-[calc(100vh-150px)] w-full object-cover" src="/images/heroimage.jpg" alt="" />
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex w-full justify-center px-5 py-10 text-center align-middle text-3xl text-[#3a3b3a] md:text-5xl md:font-extralight lg:text-8xl"
                >
                    <p>هندسة . بناء . اشراف</p>
                </motion.div>
            </div>


        </section>
    );
}
