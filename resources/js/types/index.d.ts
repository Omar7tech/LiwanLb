import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    generalSettings: GeneralSettings;
    socialSettings: SocialSettings;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role ?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
}
export interface PaginationLink {
  url?: string;
  label: string;
  active: boolean;
  page?: number;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  total: number;
  from: number;
  to: number;
  links: PaginationLink[];
}

export interface PaginationProps<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface DesignDeliveryStandard {
    english_title: string;
    english_description: string;
    arabic_title: string;
    arabic_description: string;
    order: number;
    active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DesignDeliveryStandards {
    data: DesignDeliveryStandard[];
}



export interface Testimonial {
    name: string;
    testimonial: string;
    rating: number;
}

export interface Testimonials {
    data: Testimonial[];
}

export interface GeneralSettings {
    site_active: boolean;
}

export interface SocialSettings {
    facebook_url: string | null;
    twitter_url: string | null;
    instagram_url: string | null;
    youtube_url: string | null;
    whatsapp_number: string | null;
    phone_number: string | null;
    emails: Array<{ email: string }> | null;
    address: string | null;
    location_url: string | null;
    facebook_active: boolean;
    twitter_active: boolean;
    instagram_active: boolean;
    youtube_active: boolean;
    whatsapp_active: boolean;
    phone_active: boolean;
    email_active: boolean;
    address_active: boolean;
    location_active: boolean;
    whatsapp_widget_active: boolean;
}

export interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export interface FAQs {
    data: FAQ[];
}

export interface Residency {
    id: number;
    name: string;
    slug: string;
    image?: string;
}

export interface Residencies {
    data: Residency[];
}

