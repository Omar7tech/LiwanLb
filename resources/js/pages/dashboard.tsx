import ClientLayout from '@/layouts/ClientLayout';
import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const { auth } = usePage().props as any;

    return (
        <ClientLayout>
            <Head title="Dashboard" />
            
            <div className="space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold tracking-tight text-[#3a3b3a]">
                        Welcome back, {auth.user.name}
                    </h1>
                    <p className="mt-2 text-[#3a3b3a]/70">
                        Select a project to view its details and progress updates.
                    </p>
                </motion.div>

                {/* Projects Grid Placeholder */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { name: 'Villa Al-Riyadh', status: 'Construction', date: 'Started Jan 2024', location: 'Riyadh, KSA' },
                        { name: 'Modern Apartment', status: 'Designing', date: 'Started Mar 2024', location: 'Dubai, UAE' },
                        { name: 'Beach House', status: 'Pending', date: 'Started Apr 2024', location: 'Jeddah, KSA' },
                    ].map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-[#f2ae1d]/30 cursor-pointer"
                        >
                            <div className="mb-4 h-48 w-full rounded-xl bg-neutral-100 relative overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                                    <img src="/images/logo-simple-nobg.png" alt="Liwan" className="h-20 w-auto opacity-50 grayscale" />
                                </div>
                            </div>
                            
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-bold text-[#3a3b3a] group-hover:text-[#f2ae1d] transition-colors">
                                    {project.name}
                                </h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    project.status === 'Construction' ? 'bg-green-100 text-green-700' :
                                    project.status === 'Designing' ? 'bg-blue-100 text-blue-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {project.status}
                                </span>
                            </div>
                            
                            <div className="space-y-1 text-sm text-[#3a3b3a]/60">
                                <p className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#f2ae1d]" />
                                    {project.location}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                                    {project.date}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </ClientLayout>
    );
}
