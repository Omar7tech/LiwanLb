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
                    className="col-span-3 md:col-span-5 flex h-[300px] md:h-[600px] items-end justify-center rounded-2xl md:rounded-4xl bg-cover bg-center py-10 text-[10px]  md:text-5xl font-bold text-white"
                    style={{
                        backgroundImage: `
                            linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0)),
                            url("https://images.unsplash.com/photo-1613685301586-4f2b15f0ccd4?w=900&auto=format&fit=crop&q=60")
                        `,
                    }}
                >
                    Home Owners
                </div>

                {/* BLOCK 2 */}
                <div
                    className="col-span-4 md:col-span-3 flex h-[300px] md:h-[600px] items-end justify-center rounded-2xl md:rounded-4xl bg-cover bg-center py-10 text-[22px] md:text-3xl font-bold text-white"
                    style={{
                        backgroundImage: `
                            linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0)),
                            url("https://images.unsplash.com/photo-1613685301586-4f2b15f0ccd4?w=900&auto=format&fit=crop&q=60")
                        `,
                    }}
                >
                    Developers
                </div>

                {/* BLOCK 3 */}
                <div
                    className="text-[10px] md:text-sm col-span-3 md:col-span-2 flex h-[300px] md:h-[600px] items-end justify-center rounded-2xl md:rounded-4xl bg-cover bg-center py-10 font-bold text-white"
                    style={{
                        backgroundImage: `
                            linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0)),
                            url("https://images.unsplash.com/photo-1613685301586-4f2b15f0ccd4?w=900&auto=format&fit=crop&q=60")
                        `,
                    }}
                >
                    Business Owners
                </div>
            </div>
        </div>
    );
}

export default BuiltFor;
