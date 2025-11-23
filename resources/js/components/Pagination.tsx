import { Link } from '@inertiajs/react';
import { PaginationProps, PaginationLink } from '@/types';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationComponentProps<T = Record<string, unknown>> {
    pagination: PaginationProps<T>;
}

export default function Pagination<T = Record<string, unknown>>({ pagination }: PaginationComponentProps<T>) {
    const links: PaginationLink[] = pagination.meta.links;
    const currentPage = pagination.meta.current_page;
    const lastPage = pagination.meta.last_page;
    const total = pagination.meta.total;
    const from = pagination.meta.from;
    const to = pagination.meta.to;

    // Find first and last page URLs
    const firstPageUrl = links[1]?.url;
    const lastPageUrl = links[links.length - 2]?.url;
    const prevUrl = links[0]?.url;
    const nextUrl = links[links.length - 1]?.url;

    // Only show pagination if there's more than one page
    if (lastPage <= 1) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-4 mt-8">
            {/* Results info */}
            <div className="text-sm text-gray-600">
                Showing <span className="font-medium text-gray-900">{from}</span> to{' '}
                <span className="font-medium text-gray-900">{to}</span> of{' '}
                <span className="font-medium text-gray-900">{total}</span> results
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                {/* First page button - hidden on mobile */}
                {currentPage > 2 && firstPageUrl && (
                    <Link
                        href={firstPageUrl}
                        className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                        aria-label="First page"
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </Link>
                )}


                {prevUrl ? (
                    <Link
                        href={prevUrl}
                        className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                ) : (
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed">
                        <ChevronLeft className="w-4 h-4" />
                    </span>
                )}

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {links.slice(1, -1).map((link: PaginationLink, index: number) => {
                        const actualIndex = index + 1;
                        const isEllipsis = link.label === '...';
                        const isBoundaryLink = actualIndex === 1 || actualIndex === links.length - 2;

                        // Show current page, adjacent pages, and boundary pages
                        const shouldShowOnMobile =
                            link.active ||
                            (link.page && Math.abs(link.page - currentPage) <= 1);

                        const visibilityClass = !shouldShowOnMobile && !isBoundaryLink
                            ? 'hidden sm:flex'
                            : 'flex';

                        if (isEllipsis) {
                            return (
                                <span
                                    key={actualIndex}
                                    className={`${visibilityClass} items-center justify-center w-9 h-9 text-gray-500`}
                                >
                                    •••
                                </span>
                            );
                        }

                        if (!link.url) {
                            return null;
                        }

                        return (
                            <Link
                                key={actualIndex}
                                href={link.url}
                                className={`
                                    ${visibilityClass} items-center justify-center w-9 h-9 rounded-lg border font-medium text-sm
                                    transition-all duration-200
                                    ${link.active
                                        ? 'bg-[#f2ae1d] border-[#f2ae1d] text-white shadow-sm'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                    }
                                `}
                                aria-label={`Page ${link.label}`}
                                aria-current={link.active ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Next button */}
                {nextUrl ? (
                    <Link
                        href={nextUrl}
                        className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                ) : (
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed">
                        <ChevronRight className="w-4 h-4" />
                    </span>
                )}

                {/* Last page button - hidden on mobile */}
                {currentPage < lastPage - 1 && lastPageUrl && (
                    <Link
                        href={lastPageUrl}
                        className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                        aria-label="Last page"
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </Link>
                )}
            </div>
        </div>
    );
}
