import Footer from '@/components/Footer';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Briefcase,
    ChevronRight,
    Home,
    LogOut,
    Menu,
    User,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface ClientLayoutProps {
    children: React.ReactNode;
}

interface NavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const { url, props } = usePage<SharedData>();
    const userName = props.auth?.user?.name ?? '';

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const navItems: NavItem[] = [
        { name: 'Dashboard', href: '/dashboard', icon: <Home size={18} /> },
        { name: 'Projects', href: '/dashboard/projects', icon: <Briefcase size={18} /> },
        { name: 'Profile', href: '/dashboard/profile', icon: <User size={18} /> },
    ];

    const isActive = (href: string) => {
        return href === '/dashboard' ? url === '/dashboard' : url.startsWith(href);
    };

    return (
        <div className="flex h-screen bg-white text-gray-900">
            {/* Sidebar */}
            {(isSidebarOpen || isDesktop) && (
                <>
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:flex w-64 flex-col border-r border-gray-200 bg-gray-50">
                        {/* Logo */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                            <Link href="/">
                                <img src="/images/logo.png" alt="Liwan Logo" className="h-8 w-auto" />
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        isActive(item.href)
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                    {isActive(item.href) && <ChevronRight size={16} className="ml-auto" />}
                                </Link>
                            ))}
                        </nav>

                        {/* Bottom Actions */}
                        <div className="border-t border-gray-200 p-3 space-y-1">
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <LogOut size={18} />
                                <span>Log Out</span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Sidebar */}
                    <div className="lg:hidden fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 bg-gray-50 flex flex-col">
                        {/* Logo */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                            <Link href="/">
                                <img src="/images/logo.png" alt="Liwan Logo" className="h-8 w-auto" />
                            </Link>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        isActive(item.href)
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                    {isActive(item.href) && <ChevronRight size={16} className="ml-auto" />}
                                </Link>
                            ))}
                        </nav>

                        {/* Bottom Actions */}
                        <div className="border-t border-gray-200 p-3 space-y-1">
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <LogOut size={18} />
                                <span>Log Out</span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Overlay */}
                    {isSidebarOpen && !isDesktop && (
                        <div
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 z-30 bg-black/20"
                        />
                    )}
                </>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
                    <motion.button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                    <div className="flex-1" />
                    <div className="text-sm text-gray-600">
                        Welcome back{userName ? `, ${userName}` : ''}
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 md:p-8"
                    >
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
