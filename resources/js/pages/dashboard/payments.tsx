import ClientLayout from '@/layouts/ClientLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    CreditCard, 
    FileSpreadsheet,
    ExternalLink,
    Calendar
} from 'lucide-react';

interface PaymentProject {
    id: number;
    name: string;
    slug: string;
    payment_link?: string | null;
    status: string;
    location?: string;
    start_date: string;
    created_at: string;
}

interface PaymentsProps {
    projects: PaymentProject[];
}

export default function Payments() {
    const pageProps = usePage().props;
    const { projects } = pageProps as unknown as PaymentsProps;

    return (
        <ClientLayout>
            <Head title="Payments" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='p-3 md:p-8 mt-5 md:mt-0'
            >
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-normal tracking-tight text-[#3a3b3a] mb-2">
                        Payment Center
                    </h1>
                    <p className="text-gray-600">
                        Access payment schedules and Excel sheets for your projects
                    </p>
                </div>

                {/* Projects with Payment Links */}
                {projects && projects.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects with Payment Information</h2>
                        
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-[#f2ae1d]/10 rounded-lg">
                                                <FileSpreadsheet className="h-5 w-5 text-[#f2ae1d]" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {project.name}
                                                </h3>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date(project.start_date).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            project.status === 'active' ? 'bg-green-100 text-green-800' :
                                                            project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                            project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {project.status}
                                                        </span>
                                                    </div>
                                                    {project.location && (
                                                        <span>{project.location}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <a
                                            href={project.payment_link!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-[#f2ae1d] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#e09e0d] transition-colors"
                                        >
                                            <FileSpreadsheet className="h-4 w-4" />
                                            Payment Sheet
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                        <Link
                                            href={`/dashboard/project/${project.slug}`}
                                            className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-black transition-colors"
                                        >
                                            View Project
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg border border-gray-200 p-12 text-center"
                    >
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCard className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Information Available</h3>
                        <p className="text-gray-600 mb-6">
                            Payment information will be added to your projects as they become available.
                        </p>
                        <Link
                            href="/dashboard/projects"
                            className="inline-flex items-center rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-black transition-colors"
                        >
                            View Your Projects
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </ClientLayout>
    );
}
