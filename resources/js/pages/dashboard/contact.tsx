import ClientLayout from '@/layouts/ClientLayout';
import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Mail, 
    Phone, 
    MapPin, 
    MessageCircle, 
    Facebook, 
    Twitter, 
    Instagram, 
    Youtube,
    ExternalLink
} from 'lucide-react';
import { SharedData } from '@/types';

function DashboardContact() {
    const { props } = usePage<SharedData>();
    const socialSettings = props.socialSettings;

    const socialLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: socialSettings?.facebook_url || undefined,
            active: socialSettings?.facebook_active,
            color: 'bg-blue-600'
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: socialSettings?.twitter_url || undefined,
            active: socialSettings?.twitter_active,
            color: 'bg-sky-500'
        },
        {
            name: 'Instagram',
            icon: Instagram,
            url: socialSettings?.instagram_url || undefined,
            active: socialSettings?.instagram_active,
            color: 'bg-pink-600'
        },
        {
            name: 'YouTube',
            icon: Youtube,
            url: socialSettings?.youtube_url || undefined,
            active: socialSettings?.youtube_active,
            color: 'bg-red-600'
        }
    ];

    const contactInfo = [
        {
            name: 'Phone',
            icon: Phone,
            value: socialSettings?.phone_number,
            active: socialSettings?.phone_active,
            href: socialSettings?.phone_number ? `tel:${socialSettings.phone_number}` : undefined
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            value: socialSettings?.whatsapp_number,
            active: socialSettings?.whatsapp_active,
            href: socialSettings?.whatsapp_number ? `https://wa.me/${socialSettings.whatsapp_number.replace(/[^\d]/g, '')}` : undefined
        },
        {
            name: 'Email',
            icon: Mail,
            value: socialSettings?.emails?.[0]?.email,
            active: socialSettings?.email_active,
            href: socialSettings?.emails?.[0]?.email ? `mailto:${socialSettings.emails[0].email}` : undefined
        },
        {
            name: 'Address',
            icon: MapPin,
            value: socialSettings?.address,
            active: socialSettings?.address_active,
            href: socialSettings?.location_url || undefined
        }
    ];

    return (
        <ClientLayout>
            <Head title="Contact Us" />

            <div className="max-w-5xl mx-auto px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="text-center space-y-3">
                        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Contact Us</h1>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            We're here to help. Reach out through any channel below and we'll get back to you soon.
                        </p>
                    </div>

                    {/* Main Contact Grid */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-xl font-light text-gray-900 mb-6">Get in Touch</h2>
                            
                            <div className="space-y-4">
                                {contactInfo.filter(item => item.active && item.value).map((item, index) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        target={item.name === 'Address' ? '_blank' : '_self'}
                                        rel={item.name === 'Address' ? 'noopener noreferrer' : ''}
                                        className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        <div className="shrink-0 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                            <item.icon className="h-5 w-5 text-gray-700" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                                            <p className="text-gray-600 wrap-break-word text-sm leading-relaxed">{item.value}</p>
                                        </div>
                                        {item.name === 'Address' && (
                                            <div className="shrink-0">
                                                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                            </div>
                                        )}
                                    </motion.a>
                                ))}
                            </div>

                            {contactInfo.filter(item => item.active && item.value).length === 0 && (
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Phone className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 text-sm">Contact information will be available soon</p>
                                </div>
                            )}
                        </motion.div>

                        {/* Social Media */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-xl font-light text-gray-900 mb-6">Follow Us</h2>
                            
                            <div className="grid grid-cols-2 gap-3">
                                {socialLinks.filter(link => link.active && link.url).map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group flex items-center gap-3 p-3 rounded-lg border ${link.color.replace('bg-', 'border-')} hover:shadow-sm transition-all duration-200`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        <div className={`w-8 h-8 ${link.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                                            <link.icon className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="font-medium text-gray-900 text-sm group-hover:text-gray-700 transition-colors">{link.name}</span>
                                    </motion.a>
                                ))}
                            </div>

                            {socialLinks.filter(link => link.active && link.url).length === 0 && (
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <MessageCircle className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 text-sm">Social media links will be available soon</p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Support Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-linear-to-r from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200"
                    >
                        <div className="flex items-start gap-4">
                            <div className="shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <Mail className="h-5 w-5 text-gray-700" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Need Help With Your Projects?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    Have questions about your projects or need assistance? Our team is dedicated to ensuring everything runs smoothly.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        Quick response
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        Professional support
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </ClientLayout>
    );
}

export default DashboardContact;
