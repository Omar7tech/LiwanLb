import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"

const about = () => {
  return (
    <>
            <Head title="About Us">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <AppLayout>About Us</AppLayout>
        </>
  )
}

export default about
