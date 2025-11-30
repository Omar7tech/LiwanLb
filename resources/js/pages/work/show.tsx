import FaqSection from "@/components/sections/FaqSection";
import ResidenciesSection from "@/components/sections/ResidenciesSection";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import {Work} from '@/types'

export default function Show({work} : {work : Work}) {

    console.log(work)
    const faqs = work.faqs;
    return (
        <>
            <Head title={work.name}>

            </Head>
            <AppLayout>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold p-5 md:p-8 text-[#3a3b3a]">
                    Liwan For Every {work.name}
                </h1>
                <FaqSection faqs={faqs} />
                
                {/* <div className="flex gap-2 md:gap-5 justify-center items-center px-2 md:px-5 py-10 flex-nowrap">
                    <Link
                        className="cursor-pointer w-fit rounded-lg bg-[#F2AE1D] px-2 md:px-4 py-2 md:py-3 text-xs md:text-xl font-bold text-white transition-all hover:opacity-95 hover:scale-105 hover:shadow-lg flex items-center gap-1 md:gap-2 whitespace-nowrap"
                        href="/cost-study"
                    >
                        Calculate The Cost
                    </Link>
                    <Link
                        className="cursor-pointer w-fit rounded-lg bg-[#F2AE1D] px-2 md:px-4 py-2 md:py-3 text-xs md:text-xl font-bold text-white transition-all hover:opacity-95 hover:scale-105 hover:shadow-lg flex items-center gap-1 md:gap-2 whitespace-nowrap"
                        href=""
                    >
                        Meet The Architect
                    </Link>
                    <Link
                        className="cursor-pointer w-fit rounded-lg bg-[#F2AE1D] px-2 md:px-4 py-2 md:py-3 text-xs md:text-xl font-bold text-white transition-all hover:opacity-95 hover:scale-105 hover:shadow-lg flex items-center gap-1 md:gap-2 whitespace-nowrap"
                        href=""
                    >
                        Check The Process
                    </Link>
                </div>

                <ResidenciesSection residencies={residencies} /> */}
            </AppLayout>
        </>
    );
}