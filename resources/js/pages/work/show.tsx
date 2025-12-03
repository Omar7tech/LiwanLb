import FaqSection from "@/components/sections/FaqSection";
import ResidenciesSection from "@/components/sections/ResidenciesSection";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Work, Residencies, SharedData } from '@/types'
import WhatsAppButton from "@/components/WhatsAppButton";
import InquirySection from "@/components/sections/InquirySection";
import { useRef } from "react";


export default function Show({ work, residencies }: { work: Work; residencies: Residencies }) {
    const { auth } = usePage<SharedData>().props;
    const faqs = work.faqs;

    // Only show process section if there's actual data
    const hasProcessData = work.process_title || (work.process_steps && work.process_steps.length > 0);

    const processRef = useRef<HTMLElement>(null);

    const scrollToProcess = () => {
        processRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const buttonClass =
        "cursor-pointer rounded-lg bg-[#F2AE1D] px-4 py-3 md:px-3 md:py-2 text-lg md:text-xl font-bold text-white transition-all hover:opacity-95 hover:scale-105 hover:shadow-lg flex items-center gap-2 whitespace-nowrap text-center justify-center";

    return (
        <>
            <Head title={work.title || work.name} />
            <AppLayout>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold p-5 text-[#3a3b3a]">
                    {work.title || `Liwan For Every ${work.name}`}
                </h1>
                <FaqSection faqs={faqs} workImage={work.image} overlayText={work.visual_text} />

                {/* Action Buttons Section */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-6 w-full max-w-md md:max-w-none mx-auto">
                        {/* Calculate The Cost */}
                        <Link
                            href="/cost-study"
                            className={`${buttonClass} w-full md:w-auto`}
                        >
                            Calculate The Cost
                        </Link>

                        {/* Meet The Architect */}
                        <div className="w-full md:w-auto">
                            <WhatsAppButton fullWidth className="px-4 py-3 text-lg md:px-3 md:py-2 md:text-xl" />
                        </div>

                        {/* Check The Process - Only show if there's process data */}
                        {hasProcessData && (
                            <button
                                onClick={scrollToProcess}
                                className={`${buttonClass} w-full md:w-auto`}
                            >
                                Check The Process
                            </button>
                        )}
                    </div>
                </div>

                <ResidenciesSection residencies={residencies} />

                {hasProcessData && (
                    <>
                        <section ref={processRef} className="my-16">
                            <p className="text-[#3a3b3a] text-2xl md:text-4xl lg:text-7xl font-bold p-5 flex flex-col">
                                {work.process_title?.split("\n").map((line: string, index: number) => (
                                    <span key={index}>{line}</span>
                                ))}
                            </p>
                        </section>

                        <section className="mx-auto px-5 mb-32">
                            <div className="flex flex-col ">
                                {work.process_steps?.map((step: { title: string; description: string }, index: number) => (
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
                    </>
                )}

                <InquirySection preselectedWork={work.name} />
            </AppLayout>
        </>
    );
}
