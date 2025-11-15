import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@heroui/react';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';

// Logo
export const Logo = () => (
    <img
        src="/images/logo-simple-nobg.png"
        alt="Logo"
        className="h-8 w-auto transition-all duration-300"
    />
);



export default function AppNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { url } = usePage();

    const navLinks = [
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about' },
        { name: 'Contact Us', url: '/contact' },
    ];

    const isActive = (path: string) =>
        url === path || (path !== '/' && url.startsWith(path));

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred isBordered className="z-999">
            {/* Left side */}
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Logo />
                </NavbarBrand>
            </NavbarContent>

            {/* Center (desktop) */}
            <NavbarContent className="hidden gap-6 sm:flex" justify="center">
                {navLinks.map((link) => (
                    <NavbarItem key={link.url} isActive={isActive(link.url)}>
                        <Link
                            href={link.url}
                            className={` transition-colors ${
                                isActive(link.url)
                                    ? 'border-b-2 border-warning pb-1 text-warning'
                                    : ' hover:text-foreground'
                            }`}
                        >
                            {link.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Right side (desktop only) */}
            <NavbarContent justify="end" className="hidden sm:flex">


                <NavbarItem>
                    <Button  href="#" color="warning" variant="flat">
                        Register Your Menu
                    </Button>
                </NavbarItem>
            </NavbarContent>

            {/* Mobile menu */}
            <NavbarMenu>
                {navLinks.map((link) => (
                    <NavbarMenuItem key={link.url}>
                        <Link
                            href={link.url}
                            className={`block w-full text-lg font-medium ${
                                isActive(link.url)
                                    ? 'text-warning'
                                    : 'text-foreground/80 hover:text-foreground'
                            }`}
                        >
                            {link.name}
                        </Link>
                    </NavbarMenuItem>
                ))}


                <div className="my-3 border-t border-foreground/10"></div>
                <NavbarMenuItem>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground/70">
                            Theme
                        </span>

                    </div>
                </NavbarMenuItem>


                <NavbarMenuItem>
                    <Button
                        href="#"
                        color="warning"
                        variant="flat"
                        className="w-full"
                    >
                        Register You Menu
                    </Button>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
