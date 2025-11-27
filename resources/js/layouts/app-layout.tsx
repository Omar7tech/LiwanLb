import Footer from '@/components/Footer';
import { NavbarDemo } from '@/components/Nav';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children }: AppLayoutProps) => (
    <div className="bg-[#fafafa]">
        <div>
            <NavbarDemo />
            {children}
            <Footer />
        </div>
    </div>
);
