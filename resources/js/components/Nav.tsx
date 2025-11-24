import {
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    Navbar,
    NavbarLogo,
    NavBody,
    NavItems,
} from '@/components/ui/resizable-navbar';
import { dashboard } from '@/routes/filament/admin/pages';

import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export function NavbarDemo() {
    const { auth } = usePage<SharedData>().props;

    const navItems = [
        {
            name: 'Home',
            link: '/',
        },
        {
            name: 'About',
            link: '/about',
        },
    ];
    const navItems2 = [
        {
            name: 'Partner With Us',
            link: '/',
        },
        {
            name: 'Blogs',
            link: '/blogs',
        },
    ];
    const navItems3 = [
        {
            name: auth.user
                ? auth.user.role == 'user'
                    ? 'Your Account'
                    : 'Admin'
                : 'Login',
            link: auth.user ? '/dashboard' : '/login',
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="sticky top-0 z-50 w-full">
            <Navbar>
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <NavItems items={navItems2} />
                    {auth.user?.role === 'user' ? (
                        <NavItems
                            items={navItems3}
                            className="font-bold text-[#f2ae1d]"
                        />
                    ) : auth.user ? (
                        <a
                            className="font-bold text-[#f2ae1d]"
                            href={dashboard().url}
                        >
                            Admin
                        </a>
                    ) : (
                        <NavItems
                            items={navItems3}
                            className="font-bold text-[#f2ae1d]"
                        />
                    )}
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <Link
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-3xl font-light text-neutral-600"
                            >
                                <span className="block">{item.name}</span>
                            </Link>
                        ))}
                        {navItems2.map((item, idx) => (
                            <Link
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-3xl font-light text-neutral-600"
                            >
                                <span className="block">{item.name}</span>
                            </Link>
                        ))}
                        {navItems3.map((item, idx) => (
                            <Link
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-3xl text-[#f2ae1d]"
                            >
                                <span className="block">{item.name}</span>
                            </Link>
                        ))}
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}
