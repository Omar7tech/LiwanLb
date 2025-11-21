import { NavbarDemo } from '@/components/Nav';
/* import { SmoothCursor } from '@/components/ui/smooth-cursor';
 */import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children }: AppLayoutProps) => (
    <div className="bg-[#fafafa]">
        <div>
            <NavbarDemo />
{/*             <SmoothCursor />
 */}            {children}
        </div>
    </div>
);
