import BlurText from "../BlurText";

export default function HeroSection() {
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
                    {/* RIGHT TEXT */}
                    <div className="flex flex-col lg:ml-30">
                        <div className="flex justify-between">
                            <p className="mt-18 lg:mt-0 max-w-48 leading-tight font-light text-[#3A3B3A] animate-[fadeInLeft_1s_ease-out_0.6s_both]">
                                We listen first, design spaces that reflect your
                                identity, carry purpose, and deliver lasting
                                value.
                            </p>
                            <p className="max-w-48 leading-tight font-light text-[#3A3B3A] animate-[fadeInRight_1s_ease-out_0.8s_both]">
                                Home <br />
                                Estate <br />
                                Interior <br />
                                Business
                            </p>
                        </div>
                        <div className="flex justify-end md:justify-center">
                            <button className="cursor-pointer mt-6 w-fit rounded-lg bg-[#F2AE1D] px-3 py-2 text-xl font-bold text-white transition-all hover:opacity-95 hover:scale-105 hover:shadow-lg animate-[fadeInUp_0.8s_ease-out_1s_both]">
                                Meet The Architect
                            </button>
                        </div>
                    </div>
                </div>
                {/* VIDEO SECTION */}
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl shadow-md animate-[fadeInScale_1.2s_ease-out_1.2s_both]">
                        <video
                            src="/videos/herovid.mp4"
                            className="max-h-[calc(100vh-260px)] w-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                </div>
            </div>


        </section>
    );
}
