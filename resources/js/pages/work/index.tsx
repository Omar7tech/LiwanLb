import FaqSection from "@/components/sections/FaqSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AppLayout from "@/layouts/app-layout";
import { FAQ, FAQs } from "@/types";
import { Head } from "@inertiajs/react";

function WorkIndex({ faqs }: { faqs: FAQs }) {
    return (
        <>
            <Head title="Work">

            </Head>
            <AppLayout>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold p-5">
                    Liwan For Every Home
                </h1>
                <FaqSection faqs={faqs} />
            </AppLayout>
        </>
    );
}

export default WorkIndex;