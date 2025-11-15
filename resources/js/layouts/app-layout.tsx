import AppNavbar from '@/components/Nav';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children }: AppLayoutProps) => (
    <div>
        <AppNavbar/>
        {children}
    </div>
);
