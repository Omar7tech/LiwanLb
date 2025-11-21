import ScrollVelocity from '../ScrollVelocity';
import BuiltFor from './BuiltFor';
import HeroSection from './HeroSection';

function HomeSections() {
    return (
        <>
            <HeroSection />
            <ScrollVelocity
                texts={['إشراف .  هندسة . بناء .']}
                velocity={20}
                className="custom-scroll-text py-4 font-light text-[#3a3b3a]  font-cairo"
            />
            <div className='px-5 py-5 mt-15'>
                <p className="text-2xl md:text-4xl lg:text-8xl leading-[1.1] font-extralight text-[#3a3b3a]">
                    <span className="font-bold">One Partner</span>, One Process,
                    And Designs That Make Emotional And Financial Sense.
                </p>
            </div>
            <BuiltFor/>
        </>
    );
}

export default HomeSections;
