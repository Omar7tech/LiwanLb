import { motion, useScroll, useTransform } from 'framer-motion';
import { CornerRightUp, Shield, TrendingUp, Zap } from 'lucide-react';
import { useRef, useState } from 'react';

// --- User-Defined Color Palette ---
const ACCENT = '#F2AE1D'; // Gold/Yellow
const PRIMARY_DARK = '#3A3B3A'; // Dark Text/Primary
const BACKGROUND = '#FAFAFA'; // Soft Background

// Data for the benefit modules (Concise Content)
const MODULES = [
    {
        icon: Shield,
        title: 'Absolute Certainty',
        description: 'Zero overruns. Guaranteed fixed timelines.',
        delay: 0.1,
    },
    {
        icon: TrendingUp,
        title: 'Investment Maximized',
        description: 'Advanced value engineering for peak market value.',
        delay: 0.2,
    },
    {
        icon: Zap,
        title: 'Digital Transparency',
        description: 'Real-time client portal and instant team access.',
        delay: 0.3,
    },
];

// Animation variants for staggered entrance
// FIX 1: Added 'as const' to satisfy TypeScript's strictness with Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.4,
        },
    },
} as const;

// FIX 2: Added 'as const' to the ease array to resolve 'Type 'number[]' is not assignable to type 'Easing | Easing[] | undefined'.'
const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: [0.25, 1, 0.5, 1] as const, // <-- THE CRITICAL FIX
        },
    },
} as const; // Added 'as const' here too

const CreativeParallaxSection = () => {
    // FIX 3: Explicitly typed useState for better type checking
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const sectionRef = useRef(null);

    // --- Framer Motion Scroll Setup ---
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // 1. LEFT COLUMN: Scale and Skew Parallax (Pushed into background)
    const leftParallaxY = useTransform(
        scrollYProgress,
        [0, 1],
        ['-120px', '120px'],
    ); // Stronger vertical pull
    const leftScale = useTransform(scrollYProgress, [0, 1], [1.02, 0.98]); // Subtle scale change
    const leftSkew = useTransform(
        scrollYProgress,
        [0, 1],
        ['skewX(1deg)', 'skewX(-1deg)'],
    ); // Subtle cinematic skew

    // 2. RIGHT COLUMN: Strong Vertical Offset (Floats over foreground)
    const rightParallaxY = useTransform(
        scrollYProgress,
        [0, 1],
        ['150px', '-150px'],
    ); // Very strong opposing vertical pull

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-10"
            style={{ background: BACKGROUND }}
        >
            {/* Background Texture Layer */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://images.unsplash.com/flagged/photo-1585745540837-ec55409a515d?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] opacity-5"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    // FIX 4: Added 'as const' to the inline transition ease property
                    transition={{
                        duration: 0.9,
                        ease: [0.4, 0, 0.2, 1] as const,
                    }}
                    className="mb-24 max-w-4xl"
                >
                    <p
                        style={{ color: ACCENT }}
                        className="mb-4 text-sm font-light tracking-[0.25em] uppercase"
                    >
                        The Quintessence of Development
                    </p>
                    <h3
                        style={{ color: PRIMARY_DARK }}
                        className="text-5xl leading-none font-extralight tracking-tighter sm:text-7xl lg:text-8xl"
                    >
                        Delivering{' '}
                        <span className="font-bold">Absolute Certainty</span> in
                        Luxury Projects.
                    </h3>
                </motion.div>

                {/* --- CONTENT GRID: Main Statement + Modules --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16"
                >
                    {/* COLUMN 1: MAIN STATEMENT (The Dark Anchor Block - Creative Parallax) */}
                    <motion.div
                        // FIX 5: Combined both style props into one. Motion values go first, then static styles.
                        style={{
                            y: leftParallaxY,
                            scale: leftScale,
                            transform: leftSkew,
                            backgroundColor: PRIMARY_DARK,
                        }}
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-3xl p-12 shadow-2xl shadow-black/10 lg:col-span-7 lg:p-16"
                    >
                        {/* Gold Accent Corner */}
                        <div
                            style={{ background: ACCENT }}
                            className="absolute top-0 right-0 h-10 w-10 rounded-bl-xl"
                        ></div>

                        <div className="mb-6">
                            <CornerRightUp
                                className="h-8 w-8"
                                style={{ color: ACCENT }}
                            />
                        </div>

                        <h4
                            style={{ color: ACCENT }}
                            className="mb-6 text-3xl leading-snug font-semibold lg:text-4xl"
                        >
                            The Architects of Certainty
                        </h4>
                        <p className="text-opacity-80 max-w-prose text-lg leading-relaxed font-light text-white lg:text-xl">
                            Our bespoke process is an engineering blueprint for
                            **risk-free luxury development**. We guarantee every
                            milestone and control every cost, freeing you to
                            focus solely on realizing your vision, without
                            compromise.
                        </p>
                        <div className="mt-10 lg:mt-12">
                            <span
                                style={{ color: ACCENT }}
                                className="flex items-center gap-3 text-lg font-medium underline underline-offset-4"
                            >
                                Learn More About Our Commitment
                            </span>
                        </div>
                    </motion.div>

                    {/* COLUMN 2: WHAT YOU GET PANELS (Clean, Segmented List - Strong Vertical Offset) */}
                    <motion.div
                        style={{ y: rightParallaxY }} // Apply strong vertical offset Parallax
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="relative space-y-6 lg:col-span-5 lg:space-y-8"
                    >
                        {MODULES.map((module, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`relative flex items-start gap-6 rounded-xl bg-white p-6 shadow-lg shadow-black/5 transition-all duration-300`}
                                style={{
                                    transform:
                                        hoveredIndex === index
                                            ? 'translateY(-3px)'
                                            : 'translateY(0)',
                                    borderLeft:
                                        hoveredIndex === index
                                            ? `4px solid ${ACCENT}`
                                            : '4px solid transparent',
                                    border: '1px solid #eee',
                                }}
                            >
                                {/* --- Icon Container --- */}
                                <div
                                    style={{ backgroundColor: ACCENT }}
                                    className="mt-1 shrink-0 rounded-md p-3 shadow-md"
                                >
                                    <module.icon
                                        className="h-5 w-5"
                                        style={{ color: PRIMARY_DARK }}
                                    />
                                </div>

                                {/* Content */}
                                <div>
                                    <h4
                                        style={{ color: PRIMARY_DARK }}
                                        className="mb-1 text-xl leading-tight font-bold"
                                    >
                                        {module.title}
                                    </h4>
                                    <p
                                        style={{ color: PRIMARY_DARK }}
                                        className="text-opacity-70 text-base font-light"
                                    >
                                        {module.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Bottom CTA (Removed as requested) */}
                <div className="mt-32 sm:mt-40">
                    {/* Empty space where the button used to be */}
                </div>
            </div>
        </section>
    );
};

export default CreativeParallaxSection;
