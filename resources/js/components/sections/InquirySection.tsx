export default function InquirySection() {
    return (
        <section className="max-w-7xl mx-auto px-5 mb-24">
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 items-start">
                {/* Left Side - Form */}
                <div className="lg:col-span-3">
                    <h2 className="text-3xl font-bold text-[#3a3b3a] mb-8">Start Your Project With Liwan</h2>
                    
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="flex justify-between text-sm font-medium text-gray-700">
                                    <span>Full Name</span>
                                    <span>اﻻﺳﻢ اﻟﻜﺎﻣﻞ</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full border-b border-gray-300 py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="flex justify-between text-sm font-medium text-gray-700">
                                    <span>Phone</span>
                                    <span>رﻗﻢ اﻟﻬﺎﺗﻒ</span>
                                </label>
                                <input
                                    type="tel"
                                    className="w-full border-b border-gray-300 py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="flex justify-between text-sm font-medium text-gray-700">
                                    <span>Email</span>
                                    <span>اﻟبرﻳﺪ اﻹﻟﻜتروﻧﻲ</span>
                                </label>
                                <input
                                    type="email"
                                    className="w-full border-b border-gray-300 py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent"
                                />
                            </div>

                            {/* Project Type */}
                            <div className="space-y-2">
                                <label className="flex justify-between text-sm font-medium text-gray-700">
                                    <span>Project Type</span>
                                    <span>ﻧﻮع اﻟﻤشروع</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full border-b border-gray-300 py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Project Location */}
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-gray-700">
                                <span>Project Location</span>
                                <span>ﻣﻮﻗﻊ اﻟﻤشروع</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border-b border-gray-300 py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent"
                            />
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-gray-700">
                                <span>Notes</span>
                                <span>ﻣﻼﺣﻈﺎت</span>
                            </label>
                            <textarea
                                rows={4}
                                className="w-full border-b border-gray-300 py-3 focus:border-[#F2AE1D] focus:outline-none transition-colors bg-transparent resize-none"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-3 bg-[#3a3b3a] text-white font-bold rounded-lg hover:bg-black transition-colors"
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Side - Text (Hidden on Mobile, Sticky) */}
                <div className="hidden lg:flex lg:col-span-2 flex-col justify-center sticky top-32">
                    <h2 className="text-3xl font-bold text-[#3a3b3a] mb-6 leading-tight">
                        Share your project details with us and we'll guide you through the next steps with clarity and confidence.
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Whether you're building a home, developing land, designing interiors, or launching a business space, our team will review your request and provide direction, expectations, and a clear plan forward with no pressure and no obligations.
                    </p>
                </div>
            </div>
        </section>
    );
}
