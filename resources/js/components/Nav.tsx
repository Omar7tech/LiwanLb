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
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export function NavbarDemo() {
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
            name: 'Blogs',
            link: '/',
        },
    ];
    const navItems3 = [
        {
            name: 'Login',
            link: '/login',
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
                    <NavItems items={navItems3} className='font-bold text-[#f2ae1d]' />

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
                                className="relative text-neutral-600 text-3xl font-light"
                            >
                                <span className="block">{item.name}</span>
                            </Link>
                        ))}
                        {navItems2.map((item, idx) => (
                            <Link
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 text-3xl font-light"
                            >
                                <span className="block">{item.name}</span>
                            </Link>
                        ))}
                        {navItems3.map((item, idx) => (
                            <Link
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-[#f2ae1d] text-3xl"
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
