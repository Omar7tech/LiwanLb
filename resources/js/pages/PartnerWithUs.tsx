import InquirySection from "@/components/sections/InquirySection"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"

function PartnerWithUs() {
    return (
        <>
            <Head title="Partner With Us" />
            <AppLayout>
                <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
                    <InquirySection />
                </div>
            </AppLayout>
        </>
    )
}

export default PartnerWithUs