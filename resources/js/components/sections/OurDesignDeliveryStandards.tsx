import {  DesignDeliveryStandard, DesignDeliveryStandards } from '@/types';
import Card from '../OurDesignDeliveryStandards/Card';

function OurDesignDeliveryStandards({
    designDeliveryStandards,
}: {
    designDeliveryStandards: DesignDeliveryStandards;
}) {

    return (
        <div className="mt-5 p-5 text-[#3a3b3a] md:mt-10">
            <h1 className="text-center text-3xl font-light md:text-5xl lg:text-[90px]">
                Our Design & Delivery Standards
            </h1>
            <div className="mt-10 grid grid-cols-2 gap-2 md:gap-6 px-0 md:grid-cols-3 md:px-10 lg:grid-cols-4 lg:px-30">

                {designDeliveryStandards.data.map(
                    (
                        designDeliveryStandard: DesignDeliveryStandard,
                        index: number,
                    ) => (
                        <Card
                            key={index}
                            designDeliveryStandard={designDeliveryStandard}
                            index={index}
                        />
                    ),
                )}
            </div>
        </div>
    );
}

export default OurDesignDeliveryStandards;
