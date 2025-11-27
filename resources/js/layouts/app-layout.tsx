import Footer from '@/components/Footer';
import { NavbarDemo } from '@/components/Nav';
import WhatsAppWidget from '@/components/WhatsAppWidget';
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
            <WhatsAppWidget />
        </div>
    </div>
);
