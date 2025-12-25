import { motion } from "framer-motion";

function OnePartner() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full px-5 py-5 md:py-10 font-light md:font-extralight leading-[1.1] text-[#3a3b3a] text-2xl md:text-4xl lg:text-[95px]"
        >
            <h1>

                <span className="font-extrabold hover:text-[#f2ae1d] transition-colors duration-300">One Partner</span>, One Process, And Designs That Make Emotional And Financial Sense.
            </h1>
        </motion.div>
    );
}

export default OnePartner;
