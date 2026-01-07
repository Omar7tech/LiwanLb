import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import EngineeringFeeCalculator from "@/components/EngineeringFeeCalculator"

const CostStudy = () => {
  return (
    <>
            <Head title="Cost Study">
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
