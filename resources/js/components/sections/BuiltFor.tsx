function BuiltFor() {
    return (
        <div className="w-full items-center justify-between space-y-5 p-5 lg:flex">
            {/* LEFT TEXT */}
            <div className="flex flex-col pe-8 text-4xl leading-[1.1] font-bold whitespace-nowrap text-[#3a3b3a] md:text-4xl lg:text-8xl">
                <span className="block lg:hidden">Built For People</span>
                <span className="block lg:hidden">Like You</span>
                {/* Large screens */}
                <span className="hidden lg:block">Built For</span>
                <span className="hidden lg:block">People Like</span>
                <span className="hidden lg:block">You</span>
            </div>
            {/* RIGHT GRID */}
            <div className="grid w-full grid-cols-10 gap-3">
                {/* BLOCK 1 */}
                <div
                    className="col-span-3 md:col-span-5 flex h-[300px] md:h-[600px] items-end justify-center rounded-2xl md:rounded-[40px] bg-cover bg-center py-10 text-[10px] md:text-5xl font-bold text-white relative overflow-hidden cursor-pointer group/card1 transition-transform duration-500 hover:scale-[1.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), rgba(0,0,0,0)),
                            url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=60")
                        `
                    }}
                >
                    {/* Simple border on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover/card1:border-[#3a3b3a]/40 rounded-2xl md:rounded-[40px] transition-all duration-300"></div>

                    {/* Text */}
                    <span className="relative z-10 transition-transform duration-300 group-hover/card1:-translate-y-1">
                        Home Owners
                    </span>
                </div>

                {/* BLOCK 2 */}
                <div
                    className="col-span-4 md:col-span-3 flex h-[300px] md:h-[600px] items-end justify-center rounded-2xl md:rounded-[40px] bg-cover bg-center py-10 text-[22px] md:text-3xl font-bold text-white relative overflow-hidden cursor-pointer group/card2 transition-transform duration-500 hover:scale-[1.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), rgba(0,0,0,0)),
                            url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=60")
                        `
                    }}
                >
                    {/* Simple border on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover/card2:border-[#3a3b3a]/40 rounded-2xl md:rounded-[40px] transition-all duration-300"></div>

                    {/* Text */}
                    <span className="relative z-10 transition-transform duration-300 group-hover/card2:-translate-y-1">
                        Developers
                    </span>
                </div>

                {/* BLOCK 3 */}
                <div
                    className="text-[10px] md:text-sm col-span-3 md:col-span-2 flex h-[300px] md:h-[600px] items-end justify-center rounded-2xl md:rounded-[40px] bg-cover bg-center py-10 font-bold text-white relative overflow-hidden cursor-pointer group/card3 transition-transform duration-500 hover:scale-[1.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), rgba(0,0,0,0)),
                            url("https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&auto=format&fit=crop&q=60")
                        `
                    }}
                >
                    {/* Simple border on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover/card3:border-[#3a3b3a]/40 rounded-2xl md:rounded-[40px] transition-all duration-300"></div>

                    {/* Text */}
                    <span className="relative z-10 transition-transform duration-300 group-hover/card3:-translate-y-1 text-center">
                        Business Owners
                    </span>
                </div>
            </div>
        </div>
    );
}
export default BuiltFor;
