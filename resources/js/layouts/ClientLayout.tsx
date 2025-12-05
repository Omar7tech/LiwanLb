import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Briefcase,
    ChevronRight,
    Home,
    LogOut,
    Menu,
    Settings,
    User,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const navItems = [
        { name: 'Projects', href: '/dashboard', icon: Briefcase },
        { name: 'Profile', href: '#', icon: User }, // Placeholder
        { name: 'Settings', href: '#', icon: Settings }, // Placeholder
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-[#fafafa] font-sans text-[#3a3b3a] cairo">
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:hidden">
                <Link href="/">
                    <img src="/images/logo.png" alt="Liwan Logo" className="h-8 w-auto" />
                </Link>
                <button onClick={toggleSidebar} className="p-2 text-[#3a3b3a]">
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
                {(isSidebarOpen || isDesktop) && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={`fixed inset-y-0 left-0 z-60 w-72 border-r border-neutral-200 bg-white px-6 py-8 shadow-lg lg:static lg:block lg:shadow-none ${
                            isSidebarOpen ? 'block' : 'hidden'
                        }`}
                    >
                        <div className="mb-12 flex items-center justify-between px-2">
                            <Link href="/">
                                <img src="/images/logo.png" alt="Liwan Logo" className="h-12 w-auto" />
                            </Link>
                            <button
                                onClick={toggleSidebar}
                                className="lg:hidden text-[#3a3b3a]"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex flex-1 flex-col space-y-2">
                            {navItems.map((item) => {
                                const isActive = url.startsWith(item.href) && item.href !== '#';
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-[#f2ae1d] text-white shadow-md'
                                                : 'text-[#3a3b3a] hover:bg-[#f2ae1d]/10 hover:text-[#f2ae1d]'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={20} className={isActive ? 'text-white' : 'text-[#f2ae1d]'} />
                                            <span>{item.name}</span>
                                        </div>
                                        {isActive && <ChevronRight size={16} />}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-auto pt-8 border-t border-neutral-100 space-y-2">
                            <Link
                                href="/"
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-[#3a3b3a] transition-all duration-200 hover:bg-neutral-100"
                            >
                                <Home size={20} className="text-[#3a3b3a]" />
                                <span>Return to Website</span>
                            </Link>
                            
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
                            >
                                <LogOut size={20} />
                                <span>Log Out</span>
                            </Link>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 bg-[#fafafa]">
                <div className="container mx-auto max-w-6xl px-4 py-8 lg:px-10 lg:py-12">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-55 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={toggleSidebar}
                />  
            )}
        </div>      
    );
}
