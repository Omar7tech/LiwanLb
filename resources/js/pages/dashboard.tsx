import ClientLayout from '@/layouts/ClientLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Briefcase, 
    Activity
} from 'lucide-react';

// Simple chart components
interface SimpleStatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    showButton?: boolean;
    buttonHref?: string;
    buttonText?: string;
}

const SimpleStatsCard = ({ title, value, icon, showButton, buttonHref, buttonText }: SimpleStatsCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
    >
        <div className="flex items-center mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
                {icon}
            </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-600 mb-4">{title}</p>
        {showButton && (
            <Link
                href={buttonHref}
                className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black transition-colors w-full justify-center"
            >
                {buttonText}
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
            className="bg-white rounded-lg border border-gray-200 p-6"
        >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects & Updates Overview</h3>
            
            {/* Projects Section */}
            {projectData.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Projects by Status</h4>
                    <div className="space-y-2">
                        {projectData.map((item: ChartDataPoint, index: number) => (
                            <div key={`project-${index}`} className="flex items-center gap-3">
                                <div className="w-16 text-sm text-gray-600">{item.label}</div>
                                <div className="flex-1 bg-gray-100 rounded h-6 relative overflow-hidden">
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
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Updates by Month</h4>
                    <div className="space-y-2">
                        {updateData.map((item: ChartDataPoint, index: number) => (
                            <div key={`update-${index}`} className="flex items-center gap-3">
                                <div className="w-16 text-sm text-gray-600">{item.label}</div>
                                <div className="flex-1 bg-gray-100 rounded h-6 relative overflow-hidden">
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
            <div className="mt-4 flex gap-4 text-sm">
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
}

export default function Dashboard() {
    const pageProps = usePage().props;
    const { auth, projectStats } = pageProps as unknown as DashboardProps;

    // Get real data from API
    const totalProjects = projectStats?.total ?? 0;
    const totalUpdates = projectStats?.totalUpdates ?? 0;

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
                className='p-6 md:p-8'
            >
                <h1 className="text-3xl font-bold tracking-tight text-[#3a3b3a] mb-6">
                    Welcome back, {auth.user.name}
                </h1>

                {/* Simple Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                </div>

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
                        className="bg-white rounded-lg border border-gray-200 p-8 text-center"
                    >
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Yet</h3>
                        <p className="text-gray-600">Your projects and statistics will appear here once you have projects.</p>
                    </motion.div>
                )}

                {/* See Projects Button */}
                {hasProjects && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mt-8"
                    >
                        <Link
                            href="/dashboard/projects"
                            className="inline-flex items-center rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-black transition-colors"
                        >
                            View All Projects
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </ClientLayout>
    );
}
