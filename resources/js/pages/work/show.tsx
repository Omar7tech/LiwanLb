import FaqSection from "@/components/sections/FaqSection";
import ResidenciesSection from "@/components/sections/ResidenciesSection";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Work, Residencies, SharedData } from '@/types'
import WhatsAppButton from "@/components/WhatsAppButton";
import InquirySection from "@/components/sections/InquirySection";


export default function Show({ work, residencies }: { work: Work; residencies: Residencies }) {
    const { auth } = usePage<SharedData>().props;
    const faqs = work.faqs;

    const buttonClass = "cursor-pointer w-fit rounded-lg bg-[#F2AE1D] px-3 py-2 text-xl font-bold text-white transition-all hover:opacity-95 hover:scale-105 hover:shadow-lg flex items-center gap-2 whitespace-nowrap text-center justify-center";

    return (
        <>
            <Head title={work.title || work.name} />
            <AppLayout>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold p-5 text-[#3a3b3a]">
                    {work.title || `Liwan For Every ${work.name}`}
                </h1>
                <FaqSection faqs={faqs} workImage={work.image} />

                {/* Action Buttons Section */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full">
                        {/* Calculate The Cost */}
                        <Link
                            href="/cost-study"
                            className={buttonClass}
                        >
                            Calculate The Cost
                        </Link>

                        {/* Meet The Architect */}
                        <div className="[&>div]:flex [&>div]:justify-center">
                            <WhatsAppButton />
                        </div>

                        {/* Check The Process */}
                        <Link
                            href={auth.user ? "/dashboard" : "/login"}
                            className={buttonClass}
                        >
                            Check The Process
                        </Link>
                    </div>
                </div>

                <ResidenciesSection residencies={residencies} />

                <section className="my-16">
                    <p className="text-[#3a3b3a] text-2xl md:text-4xl lg:text-7xl font-bold p-5 flex flex-col">
                        <span>
                            For <span className="text-gray-500">homeowners</span> building a new house or 
                        </span>
                        <span>transforming an existing one. </span>
                    </p>
                </section>

                <section className="mx-auto px-5 mb-32">
                    <div className="flex flex-col ">
                        {[
                            {
                                title: "Understanding Your Lifestyle",
                                description: "We begin by exploring your needs, family habits, and long-term plans to shape a home that reflects how you truly live."
                            },
                            {
                                title: "Concept & Space Planning",
                                description: "We develop functional layouts, circulation, lighting strategy, and an initial architectural concept aligned with your budget."
                            },
                            {
                                title: "Detailed Architectural Design",
                                description: "Full drawings, elevations, materials, and 3D visualizations to help you see your home clearly — before execution begins."
                            },
                            {
                                title: "Licensing & Documentation",
                                description: "We manage all approvals, with a clear roadmap covering zoning, regulations, and municipal requirements."
                            },
                            {
                                title: "Execution & Supervision",
                                description: "On-site visits, contractor coordination, quality control, and continuous communication until handover."
                            }
                        ].map((step, index) => (
                            <div key={index} className="flex flex-col gap-2 pb-10 last:pb-0">
                                <h3 className="text-sm md:text-2xl lg:text-3xl font-bold text-[#3a3b3a]">
                                    {step.title}
                                </h3>
                                <p className="text-sm md:text-2xl lg:text-2xl text-gray-500  font-light">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <InquirySection />
            </AppLayout>
        </>
    );
}