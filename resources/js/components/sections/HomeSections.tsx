import ScrollVelocity from '../ScrollVelocity';
import HeroSection from './HeroSection';

function HomeSections() {
    return (
        <>
            <HeroSection />
            <ScrollVelocity
                texts={['إشراف . بناء . هندسة .']}
                velocity={50}
                className="custom-scroll-text text-[#3a3b3a] font-light py-5 font-stretch-extra-condensed"
            />
            <HeroSection />

        </>
    );
}

export default HomeSections;
