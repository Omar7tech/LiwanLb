import {
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    Navbar,
    NavbarLogo,
    NavBody,
    NavItems,
    NavDropdown,
} from '@/components/ui/resizable-navbar';
import { dashboard } from '@/routes/filament/admin/pages';

import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export function NavbarDemo() {
    const { auth, sharedWorks } = usePage<SharedData>().props;

    const navItems = [
        {
            name: 'Home',
            link: '/',
        },
    ];
    const navItems2 = [
        {
            name: 'Partner With Us',
            link: '/',
        },
        {
            name: 'Cost Study',
            link: '/cost-study',
        },
    ];
    const navItems3 = [
        {
            name: 'Blogs',
            link: '/blogs',
        },
    ];
    const navItems4 = [
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
                    <NavDropdown 
                        label="Work" 
                        items={sharedWorks?.data || []}
                        mainLink="/works"
                    />
                    <NavItems items={navItems2} />
                    <NavItems items={navItems3} />
                    {auth.user?.role === 'user' ? (
                        <NavItems
                            items={navItems4}
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
                            items={navItems4}
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
                        <Link
                            href="/works"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="relative text-3xl font-light text-neutral-600"
                        >
                            <span className="block">Work</span>
                        </Link>
                        {sharedWorks?.data?.map((work, idx) => (
                            <Link
                                key={`mobile-work-${idx}`}
                                href={`/work/${work.slug}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-2xl font-light text-neutral-500 pl-4"
                            >
                                <span className="block">{work.name}</span>
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
                                className="relative text-3xl font-light text-neutral-600"
                            >
                                <span className="block">{item.name}</span>
                            </Link>
                        ))}
                        {navItems4.map((item, idx) => (
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
