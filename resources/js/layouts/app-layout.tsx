import Footer from '@/components/Footer';
import { NavbarDemo } from '@/components/Nav';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children }: AppLayoutProps) => (
    <div className="bg-[#fafafa] max-w-screen-2xl mx-auto">
        <div>
            <NavbarDemo />
            {children}
            <Footer />
            <WhatsAppWidget />
        </div>
    </div>
);
