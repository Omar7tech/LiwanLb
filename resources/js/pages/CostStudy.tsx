import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import EngineeringFeeCalculator from "@/components/EngineeringFeeCalculator"

const CostStudy = () => {
  return (
    <>
            <Head title="Cost Study">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <AppLayout>
                <div className="px-3 py-8 md:px-8 lg:px-12 ">
                    <EngineeringFeeCalculator />
                </div>
            </AppLayout>
        </>
  )
}

export default CostStudy
