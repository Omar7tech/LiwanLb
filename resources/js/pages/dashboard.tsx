import ClientLayout from '@/layouts/ClientLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BarChart3, Briefcase } from 'lucide-react';

export default function Dashboard() {
    const { auth, projects, projectStats } = usePage().props as any;

    return (
        <ClientLayout>
            <Head title="Dashboard" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold tracking-tight text-[#3a3b3a] mb-6">
                    Welcome back, {auth.user.name}
                </h1>

                {/* Project Stats */}
                <div className="mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Total Projects</p>
                                <p className="text-2xl font-semibold text-gray-900">{projectStats?.total ?? 0}</p>
                            </div>
                            <Briefcase className="text-gray-400" size={24} />
                        </div>
                    </div>
                </div>

                {/* See Projects Button */}
                {(projects?.data?.length ?? 0) > 0 && (
                    <div className="text-center">
                        <Link
                            href="/dashboard/projects"
                            className="inline-flex items-center rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-black transition-colors"
                        >
                            See my projects
                        </Link>
                    </div>
                )}
            </motion.div>
        </ClientLayout>
    );
}
