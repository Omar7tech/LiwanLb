
import BuiltFor from './BuiltFor';
import HeroSection from './HeroSection';

function HomeSections() {

    return (
        <>
            <HeroSection />
            <div className="flex w-full justify-center px-5 py-10 text-center align-middle text-3xl md:text-5xl md:font-extralight lg:text-8xl">
                <p>هندسة . بناء . اشراف</p>
            </div>
            <BuiltFor />

        </>
    );
}

export default HomeSections;
