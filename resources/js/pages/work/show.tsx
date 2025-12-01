import FaqSection from "@/components/sections/FaqSection";
import ResidenciesSection from "@/components/sections/ResidenciesSection";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Work, Residencies, SharedData } from '@/types'
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Show({work, residencies} : {work : Work; residencies: Residencies}) {
    const { auth } = usePage<SharedData>().props;
    const faqs = work.faqs;

    const buttonClass = "cursor-pointer w-fit rounded-lg bg-[#F2AE1D] px-3 py-2 text-xl font-bold text-white transition-all hover:opacity-95 hover:scale-105 hover:shadow-lg flex items-center gap-2 whitespace-nowrap text-center justify-center";

    return (
        <>
            <Head title={work.name} />
            <AppLayout>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold p-5 md:p-8 text-[#3a3b3a]">
                    Liwan For Every {work.name}
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
            </AppLayout>
        </>
    );
}