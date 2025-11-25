// Assuming you've installed react-icons
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

// Custom class for the prominent body text size based on the image's appearance
const TEXT_SIZE_CLASS = 'text-2xl  font-light'; // Using text-lg (~18px) for prominent text

const Footer = () => {
    const currentYear = 2025; // Matching the image copyright year

    return (
        <footer className="bg-[#3a3b3a] px-5 py-12 text-gray-300 mt-10 font-sans">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 grid grid-cols-1 gap-y-8 pb-8 md:grid-cols-3 md:gap-x-20">
                    <div>
                        <h3 className="mb-4 text-2xl font-extrabold  text-white">
                            Liwan Architecture
                        </h3>

                        <p className={TEXT_SIZE_CLASS}>
                            Design · Build · Supervision
                        </p>
                        <p className={`${TEXT_SIZE_CLASS} mb-6`}>
                            Architecture that understands you.
                        </p>

                        {/* Social Icons - Tight spacing */}
                        <div className="mt-4 flex space-x-3">
                            <a
                                href="#"
                                aria-label="WhatsApp"
                                className="text-white transition hover:text-gray-400"
                            >
                                <FaWhatsapp size={20} />
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-white transition hover:text-gray-400"
                            >
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="text-white transition hover:text-gray-400"
                            >
                                <FaLinkedinIn size={20} />
                            </a>
                        </div>
                    </div>

                    {/* === 2. Column: Build === */}
                    <div>
                        <h3 className="mb-4 text-2xl font-extrabold  text-white">
                            Build
                        </h3>

                        {/* List of build items */}
                        <ul className={`${TEXT_SIZE_CLASS} space-y-2 leading-[0.9]`}>
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Liwan For Every Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Liwan Estate
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Liwan Interiors
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Liwan Business Space
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* === 3. Column: Contact === */}
                    <div>
                        <h3 className="mb-4 text-2xl font-extrabold  text-white">
                            Contact
                        </h3>

                        {/* Contact details */}
                        <p className={TEXT_SIZE_CLASS}>Aley-Mount Lebanon</p>
                        <p className={TEXT_SIZE_CLASS}>
                            <a
                                href="mailto:info@liwanlb.com"
                                className="transition hover:text-white"
                            >
                                info@liwanlb.com
                            </a>
                        </p>
                        <p className={TEXT_SIZE_CLASS}>
                            <a
                                href="tel:+96170124279"
                                className="transition hover:text-white"
                            >
                                +96170124279
                            </a>
                        </p>
                    </div>
                </div>

                <div className="pt-4 text-center text-xl font-light">
                    <p>
                        © {currentYear} Liwan Architecture. All Rights
                        Reserved.
                    </p>
                    <p className="mt-1">Crafted by YamenCreates.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
