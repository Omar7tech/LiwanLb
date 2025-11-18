import AppNavbar from '@/components/Nav';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children }: AppLayoutProps) => (
    <div className="cairo antialiased">
        <AppNavbar />
        <div className="bg-[#FAFAFA]">{children}</div>
    </div>
);
