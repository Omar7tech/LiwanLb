import React from 'react';
import ClientLayout from '@/layouts/ClientLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Briefcase, 
    Activity,
    FileText,
    CreditCard,
    Star
} from 'lucide-react';
import Timeline from '@/components/Timeline';

// Simple chart components
interface SimpleStatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    showButton?: boolean;
    buttonHref?: string;
    buttonText?: string;
    hasNotification?: boolean;
    fullWidth?: boolean;
    isGreen?: boolean;
}

const SimpleStatsCard = ({ title, value, icon, showButton, buttonHref, buttonText, hasNotification, fullWidth, isGreen }: SimpleStatsCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-lg border p-3 md:p-4 relative ${
            hasNotification ? (isGreen ? 'border-green-500' : 'border-[#f2ae1d]') : 'border-gray-200'
        } ${fullWidth ? 'md:col-span-1 col-span-2' : ''}`}
    >
        {hasNotification && (
            <div className="absolute top-4 right-4">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                    isGreen ? 'bg-green-500' : 'bg-[#f2ae1d]'
                }`}></div>
            </div>
        )}
        <div className="flex items-center mb-3">
            <div className={`p-1.5 rounded-lg ${
                hasNotification ? (isGreen ? 'bg-green-500/10' : 'bg-[#f2ae1d]/10') : 'bg-gray-100'
            }`}>
                {icon}
            </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{value}</h3>
        <p className="text-xs text-gray-600 mb-3">{title}</p>
        {showButton && (
            <Link
                href={buttonHref}
                className={`inline-flex items-center rounded-md px-2 py-1.5 text-xs font-medium shadow-sm transition-colors w-full justify-center ${
                    hasNotification 
                        ? (isGreen ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-[#f2ae1d] text-white hover:bg-[#e09e0d]') 
                        : 'bg-gray-900 text-white hover:bg-black'
                }`}
            >
                <span className="truncate">{buttonText}</span>
            </Link>
        )}
    </motion.div>
);

interface ChartDataPoint {
    label: string;
    value: number;
}

interface CombinedBarChartProps {
    projectData: ChartDataPoint[];
    updateData: ChartDataPoint[];
}

const CombinedBarChart = ({ projectData, updateData }: CombinedBarChartProps) => {
    const projectMax = Math.max(...projectData.map((d: ChartDataPoint) => d.value), 1);
    const updateMax = Math.max(...updateData.map((d: ChartDataPoint) => d.value), 1);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-4"
        >
            <h3 className="text-base font-semibold text-gray-900 mb-3">Projects & Updates Overview</h3>
            
            {/* Projects Section */}
            {projectData.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Projects by Status</h4>
                    <div className="space-y-2">
                        {projectData.map((item: ChartDataPoint, index: number) => (
                            <div key={`project-${index}`} className="flex items-center gap-3">
                                <div className="w-12 text-xs text-gray-600">{item.label}</div>
                                <div className="flex-1 bg-gray-100 rounded h-4 relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.value / projectMax) * 100}%` }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        className="h-full bg-blue-500"
                                    />
                                    <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                                        {item.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Updates Section */}
            {updateData.length > 0 && (
                <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Updates by Month</h4>
                    <div className="space-y-2">
                        {updateData.map((item: ChartDataPoint, index: number) => (
                            <div key={`update-${index}`} className="flex items-center gap-3">
                                <div className="w-12 text-xs text-gray-600">{item.label}</div>
                                <div className="flex-1 bg-gray-100 rounded h-4 relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.value / updateMax) * 100}%` }}
                                        transition={{ duration: 0.8, delay: (projectData.length + index) * 0.1 }}
                                        className="h-full bg-green-500"
                                    />
                                    <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                                        {item.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Legend */}
            <div className="mt-3 flex gap-3 text-xs">
                {projectData.length > 0 && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span className="text-gray-600">Projects</span>
                    </div>
                )}
                {updateData.length > 0 && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span className="text-gray-600">Updates</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

interface DashboardProps {
    auth: {
        user: {
            name: string;
            email?: string;
        };
    };
    projectStats: {
        updatesByMonth: Record<string, number>;
        total: number;
        totalUpdates: number;
        totalRequirements: number;
        byStatus: {
            pending: number;
            active: number;
            completed: number;
            on_hold: number;
            planning: number;
        };
        byMonth: {
            month: string;
            projects: number;
            updates: number;
        }[];
    };
    projects?: {
        data: Array<{
            id: number;
            name: string;
            slug: string;
            timeline?: import('@/types').TimelineData | null;
            project_notes?: Array<{ content: string }> | null;
        }>;
    };
    hasReview: boolean;
}

export default function Dashboard() {
    const pageProps = usePage().props;
    const { auth, projectStats, projects, hasReview } = pageProps as unknown as DashboardProps;

    // Get real data from API
    const totalProjects = projectStats?.total ?? 0;
    const totalUpdates = projectStats?.totalUpdates ?? 0;
    const totalRequirements = projectStats?.totalRequirements ?? 0;

    // Calculate requirements from project data if not provided
    const calculatedRequirements = projects?.data?.reduce((total, project) => {
        return total + (project.project_notes?.length || 0);
    }, 0) || 0;
    
    const finalRequirements = totalRequirements || calculatedRequirements;

    // Projects by status for chart
    const projectStatusData = [
        { label: 'Active', value: projectStats?.byStatus?.active ?? 0 },
        { label: 'Completed', value: projectStats?.byStatus?.completed ?? 0 },
        { label: 'On Hold', value: projectStats?.byStatus?.on_hold ?? 0 },
        { label: 'Pending', value: projectStats?.byStatus?.pending ?? 0 },
    ].filter(item => item.value > 0);

    // Updates by month for chart - convert from object to array
    const monthlyUpdatesData = Object.entries(projectStats?.updatesByMonth || {})
        .map(([month, value]: [string, unknown]) => ({ 
            label: month, 
            value: typeof value === 'number' ? value : Number(value) || 0 
        }))
        .reverse(); // Show oldest to newest

    const hasProjects = totalProjects > 0;
    const hasData = projectStatusData.length > 0 || monthlyUpdatesData.some(d => d.value > 0);

    return (
        <ClientLayout>
            <Head title="Dashboard" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='p-2 md:p-4 mt-3 md:mt-0'
            >
                <h1 className="text-2xl font-normal tracking-tight text-[#3a3b3a] mb-4">
                    Welcome back, {auth.user.name}
                </h1>

                {/* Rate Us Banner - Only show if user doesn't have review */}
                {!hasReview && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-linear-to-r from-[#f2ae1d]/10 to-[#f2ae1d]/5 border border-[#f2ae1d]/20 rounded-lg p-2 mb-2"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-[#f2ae1d]/20 rounded-full flex items-center justify-center shrink-0">
                                    <Star size={12} className="text-[#f2ae1d]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-gray-900 text-xs truncate">Share Your Feedback</h3>
                                    <p className="text-xs text-gray-600 truncate">Help us improve your experience</p>
                                </div>
                            </div>
                            <div className="shrink-0">
                                <Link
                                    href="/dashboard/client-reviews"
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-[#f2ae1d] text-white text-xs font-medium rounded-lg hover:bg-[#d4941a] transition-colors"
                                >
                                    <Star size={12} />
                                    Rate Us
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Simple Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 mb-2">
                    <SimpleStatsCard
                        title="Total Projects"
                        value={totalProjects}
                        icon={<Briefcase className="h-6 w-6 text-gray-600" />}
                        showButton={hasProjects}
                        buttonHref="/dashboard/projects"
                        buttonText="Show All Projects"
                    />
                    <SimpleStatsCard
                        title="Total Updates"
                        value={totalUpdates}
                        icon={<Activity className="h-6 w-6 text-gray-600" />}
                    />
                    <SimpleStatsCard
                        title="Requirements"
                        value={finalRequirements}
                        icon={<FileText className="h-6 w-6 text-gray-600" />}
                        showButton={finalRequirements > 0}
                        buttonHref="/dashboard/requirements"
                        buttonText="View Requirements"
                        hasNotification={finalRequirements > 0}
                    />
                    <SimpleStatsCard
                        title="Payments"
                        value="Center"
                        icon={<CreditCard className="h-6 w-6 text-gray-600" />}
                        showButton={true}
                        buttonHref="/dashboard/payments"
                        buttonText="View Payments"
                        hasNotification={true}
                        isGreen={true}
                    />
                </div>

                {/* Project Timelines */}
                {projects?.data?.filter(project => project.timeline && project.timeline.length > 0).map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-lg border border-gray-200 p-4 mb-2"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Briefcase className="h-2.5 w-2.5 text-white" />
                                </div>
                                <h3 className="text-sm font-semibold text-gray-900">{project.name}</h3>
                            </div>
                            <Link
                                href={`/dashboard/project/${project.slug}`}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                View Details
                            </Link>
                        </div>
                        <Timeline items={project.timeline || []} />
                    </motion.div>
                ))}

                {/* Combined Chart */}
                {hasData && (
                    <CombinedBarChart
                        projectData={projectStatusData}
                        updateData={monthlyUpdatesData}
                    />
                )}

                {/* Empty State */}
                {!hasProjects && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg border border-gray-200 p-4 text-center"
                    >
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Briefcase className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-base font-medium text-gray-900 mb-2">No Projects Yet</h3>
                        <p className="text-sm text-gray-600">Your projects and statistics will appear here once you have projects.</p>
                    </motion.div>
                )}

                {/* See Projects Button */}
                {hasProjects && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mt-4"
                    >
                        <Link
                            href="/dashboard/projects"
                            className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-black transition-colors"
                        >
                            View All Projects
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </ClientLayout>
    );
}
