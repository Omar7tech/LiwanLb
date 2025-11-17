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
        src="/images/logo.png"
        alt="Logo"
        className="h-10 w-auto transition-all duration-300"
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
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Logo />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden gap-8 sm:flex" justify="center">
                {navLinks.map((link) => (
                    <NavbarItem key={link.url} isActive={isActive(link.url)}>
                        <Link
                            href={link.url}
                            className={`relative px-1 py-2 font-medium transition-colors duration-200 ${
                                isActive(link.url)
                                    ? 'text-warning'
                                    : 'text-foreground/70 hover:text-foreground'
                            } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-warning after:transition-all after:duration-200 ${
                                isActive(link.url)
                                    ? 'after:w-full'
                                    : 'after:w-0 hover:after:w-full'
                            }`}
                        >
                            {link.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end" className="hidden sm:flex">
                <NavbarItem>
                    <Button href="#" color="warning" variant="flat">
                        Register Your Menu
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {navLinks.map((link) => (
                    <NavbarMenuItem key={link.url}>
                        <Link
                            href={link.url}
                            className={`block w-full border-l-3 px-4 py-3 text-lg font-medium transition-all duration-200 ${
                                isActive(link.url)
                                    ? 'border-warning bg-warning/5 text-warning'
                                    : 'border-transparent text-foreground/70 hover:border-warning/50 hover:bg-foreground/5 hover:text-foreground'
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
                        Register Your Menu
                    </Button>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
