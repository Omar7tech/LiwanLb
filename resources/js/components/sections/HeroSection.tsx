export default function HeroSection() {
    return (
        <section className="w-full px-5 py-5 pb-[1000px]">
            <div className="mx-auto space-y-5">
                <div className="flex justify-between items-baseline-last gap-6">
                    <h1 className="text-[40px] leading-[1.1] font-bold text-[#3A3B3A] md:text-[52px]">
                        Architecture <br />
                        <span className="text-[#3A3B3A]">
                            That Understands You.
                        </span>
                    </h1>

                    <p className="max-w-48 text-xs font-semibold leading-relaxed text-[#3A3B3A]">
                        We listen first, design spaces that reflect your
                        identity, carry purpose, and deliver a lasting value.
                    </p>

                    <button className="mt-4 w-fit rounded-md bg-[#F2AE1D] px-5 py-2 text-[15px] font-medium text-white transition-all hover:opacity-95">
                        Meet The Architect
                    </button>
                </div>

                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl shadow-md">
                        <video
                            src="/videos/herovid.mp4" // replace with your video URL
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
