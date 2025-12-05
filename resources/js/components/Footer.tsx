import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';


// Custom class for the prominent body text size based on the image's appearance
const TEXT_SIZE_CLASS = 'text-2xl  font-light'; // Using text-lg (~18px) for prominent text

const Footer = () => {
    const { socialSettings } = usePage<SharedData>().props;
    const currentYear = 2025;

    return (
        <footer className="bg-[#3a3b3a] px-5 py-12 font-sans text-gray-300">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 grid grid-cols-1 gap-y-8 pb-8 md:grid-cols-3 md:gap-x-20">
                    <div>
                        <h3 className="mb-4 text-2xl font-extrabold text-white">
                            Liwan Architecture
                        </h3>

                        <p className={TEXT_SIZE_CLASS}>
                            Design · Build · Supervision
                        </p>
                        <p className={`${TEXT_SIZE_CLASS} mb-6`}>
                            Architecture that understands you.
                        </p>

                        {/* Social Icons - Dynamic from settings */}
                        <div className="mt-4 flex space-x-3">
                            {socialSettings.whatsapp_active && socialSettings.whatsapp_number && (
                                <a
                                    href={`https://wa.me/${socialSettings.whatsapp_number.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    className="text-white transition hover:text-gray-400"
                                >
                                    <FaWhatsapp size={20} />
                                </a>
                            )}
                            {socialSettings.instagram_active && socialSettings.instagram_url && (
                                <a
                                    href={socialSettings.instagram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="text-white transition hover:text-gray-400"
                                >
                                    <FaInstagram size={20} />
                                </a>
                            )}
                            {socialSettings.facebook_active && socialSettings.facebook_url && (
                                <a
                                    href={socialSettings.facebook_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="text-white transition hover:text-gray-400"
                                >
                                    <FaFacebook size={20} />
                                </a>
                            )}
                            {socialSettings.twitter_active && socialSettings.twitter_url && (
                                <a
                                    href={socialSettings.twitter_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter"
                                    className="text-white transition hover:text-gray-400"
                                >
                                    <FaTwitter size={20} />
                                </a>
                            )}
                            {socialSettings.youtube_active && socialSettings.youtube_url && (
                                <a
                                    href={socialSettings.youtube_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="YouTube"
                                    className="text-white transition hover:text-gray-400"
                                >
                                    <FaYoutube size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* === 2. Column: Build === */}
                    <div>
                        <h3 className="mb-4 text-2xl font-extrabold text-white">
                            Build
                        </h3>

                        {/* List of build items */}
                        <ul
                            className={`${TEXT_SIZE_CLASS} space-y-2 leading-[0.9]`}
                        >
                            {usePage<SharedData>().props.sharedWorks?.data?.map((work) => (
                                <li key={work.id}>
                                    <a
                                        href={`/work/${work.slug}`}
                                        className="transition hover:text-white"
                                    >
                                        {work.title || work.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* === 3. Column: Contact - Dynamic from settings === */}
                    <div>
                        <h3 className="mb-4 text-2xl font-extrabold text-white">
                            Contact
                        </h3>

                        {/* Contact details - Dynamic */}
                        {socialSettings.address_active && socialSettings.address && (
                            <p className={TEXT_SIZE_CLASS}>
                                {socialSettings.location_active && socialSettings.location_url ? (
                                    <a
                                        href={socialSettings.location_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition hover:text-white"
                                    >
                                        {socialSettings.address}
                                    </a>
                                ) : (
                                    socialSettings.address
                                )}
                            </p>
                        )}
                        
                        {socialSettings.email_active && socialSettings.emails && socialSettings.emails.length > 0 && (
                            <>
                                {socialSettings.emails.map((emailObj, index) => (
                                    <p key={index} className={TEXT_SIZE_CLASS}>
                                        <a
                                            href={`mailto:${emailObj.email}`}
                                            className="transition hover:text-white"
                                        >
                                            {emailObj.email}
                                        </a>
                                    </p>
                                ))}
                            </>
                        )}
                        
                        {socialSettings.phone_active && socialSettings.phone_number && (
                            <p className={TEXT_SIZE_CLASS}>
                                <a
                                    href={`tel:${socialSettings.phone_number}`}
                                    className="transition hover:text-white"
                                >
                                    {socialSettings.phone_number}
                                </a>
                            </p>
                        )}
                    </div>
                </div>

                <div className="pt-4 text-center text-xl font-light">
                    <p>
                        © {currentYear} Liwan Architecture. All Rights
                        Reserved.
                    </p>
                    <p className="mt-1 text-sm flex items-center-safe justify-center gap-2">
                        Crafted by{' '}
                        <span className="h-3 w-auto">
                            <a href="https://www.instagram.com/yamencreates/">
                                <img
                                    src="/images/yamenlogo.svg"
                                    alt="Yamen Logo"
                                    className="h-full w-auto object-contain"
                                />
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
