import { SharedData } from '@/types';
import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronRight,
    ChevronLeft,
    ExternalLink,
    Home,
    Briefcase,
    Phone,
    User,
    LogOut,
    Menu,
    X,
    Maximize2,
    Minimize2,
    Paperclip,
    DollarSign,
    Wallet,
    Clock,
} from 'lucide-react';

interface ClientLayoutProps {
    children: React.ReactNode;
}

interface NavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
    isDisabled?: boolean;
    badge?: string;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [logoutModal, setLogoutModal] = useState({ isOpen: false });
    const { url, props } = usePage<SharedData>();
    const userName = props.auth?.user?.name ?? '';

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleLogout = () => {
        setLogoutModal({ isOpen: true });
    };

    const confirmLogout = () => {
        setLogoutModal({ isOpen: false });
        router.post('/logout');
    };

    const cancelLogout = () => {
        setLogoutModal({ isOpen: false });
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const navItems: NavItem[] = [
        { name: 'Dashboard', href: '/dashboard', icon: <Home size={18} /> },
        { name: 'Projects', href: '/dashboard/projects', icon: <Briefcase size={18} /> },
        { name: 'Requirements', href: '/dashboard/requirements', icon: <Paperclip size={18} /> },
        { name: 'Payments', href: '/dashboard/payments', icon: <DollarSign size={18} /> },
        { name: 'Profile', href: '/dashboard/profile', icon: <User size={18} /> },
        { name: 'Contact', href: '/dashboard/contact', icon: <Phone size={18} /> },
        { name: 'Wallet', href: '/dashboard/wallet', icon: <Wallet size={18} />, isDisabled: true, badge: 'Coming Soon' },
    ];

    const isActive = (href: string) => {
        return href === '/dashboard' ? url === '/dashboard' : url.startsWith(href);
    };

    return (
        <div className="flex h-screen bg-white text-gray-900">
            {(isSidebarOpen || isDesktop) && (
                <>
                    <div className={`hidden lg:flex flex-col border-r border-gray-200 bg-gray-50 transition-all duration-300 ${isDesktopSidebarCollapsed ? 'w-20' : 'w-64'
                        }`}>
                        <div className={`flex items-center justify-center px-6 py-5 border-b border-gray-200 ${isDesktopSidebarCollapsed ? 'px-1' : 'px-6'
                            }`}>
                            <div className="relative w-10 h-10 overflow-hidden">
                                <Link href="/">
                                    <img
                                        src="/images/logo.png"
                                        alt="Liwan Logo"
                                        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                                        style={{ opacity: isDesktopSidebarCollapsed ? 0.8 : 1 }}
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className={`flex-1 overflow-y-auto py-6 space-y-1 ${isDesktopSidebarCollapsed ? 'px-2' : 'px-3'
                            }`}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`w-full flex items-center rounded-lg text-sm font-medium transition-colors duration-200 ${isDesktopSidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3'
                                        } ${isActive(item.href)
                                            ? 'bg-gray-900 text-white'
                                            : item.isDisabled
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    title={isDesktopSidebarCollapsed ? item.name : ''}
                                >
                                    {item.icon}
                                    {!isDesktopSidebarCollapsed && (
                                        <>
                                            <span className="flex-1">{item.name}</span>
                                            {item.badge && (
                                                <span className="ml-auto flex items-center gap-1">
                                                    <Clock size={12} className="text-gray-400" />
                                                    <span className="text-xs text-gray-400 font-medium">{item.badge}</span>
                                                </span>
                                            )}
                                            {!item.badge && isActive(item.href) && <ChevronRight size={16} className="ml-auto" />}
                                        </>
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Bottom Actions */}
                        <div className={`border-t border-gray-200 space-y-1 ${isDesktopSidebarCollapsed ? 'p-2' : 'p-3'
                            }`}>
                            <Link
                                href="/"
                                className={`w-full flex items-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors ${isDesktopSidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3'
                                    }`}
                                title={isDesktopSidebarCollapsed ? 'Go to Website' : ''}
                            >
                                <ExternalLink size={18} />
                                {!isDesktopSidebarCollapsed && <span>Go to Website</span>}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className={`w-full flex items-center rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors ${isDesktopSidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3'
                                    }`}
                                title={isDesktopSidebarCollapsed ? 'Log Out' : ''}
                            >
                                <LogOut size={18} />
                                {!isDesktopSidebarCollapsed && <span>Log Out</span>}
                            </button>
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
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive(item.href)
                                        ? 'bg-gray-900 text-white'
                                        : item.isDisabled
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    {item.icon}
                                    <span className="flex-1">{item.name}</span>
                                    {item.badge && (
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} className="text-gray-400" />
                                            <span className="text-xs text-gray-400 font-medium">{item.badge}</span>
                                        </span>
                                    )}
                                    {!item.badge && isActive(item.href) && <ChevronRight size={16} className="ml-auto" />}
                                </Link>
                            ))}
                        </nav>

                        {/* Bottom Actions */}
                        <div className="border-t border-gray-200 p-3 space-y-1">
                            <Link
                                href="/"
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <ExternalLink size={18} />
                                <span>Go to Website</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={18} />
                                <span>Log Out</span>
                            </button>
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
                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.button>
                        <motion.button
                            onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
                            className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            whileTap={{ scale: 0.95 }}
                            title={isDesktopSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {isDesktopSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </motion.button>
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={toggleFullscreen}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            whileTap={{ scale: 0.95 }}
                            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                        >
                            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </motion.button>
                        <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <User size={18} />
                            <span className="hidden sm:inline">{userName || 'Profile'}</span>
                        </Link>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}

                    >
                        <div className=" mx-auto">
                            {children}
                        </div>
                    </motion.div>
                </main>
            </div>

            {/* Logout Confirmation Modal */}
            {logoutModal.isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={cancelLogout}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="bg-white rounded-lg p-6 max-w-sm w-full mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <LogOut className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Log Out</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to log out? You will need to sign in again to access your account.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={cancelLogout}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
