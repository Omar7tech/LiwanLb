import ClientLayout from '@/layouts/ClientLayout';
import { Projects } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FileText, CreditCard, Clock } from 'lucide-react';

function ProjectImage({ src, alt }: { src: string; alt: string }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className="relative h-full w-full">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-[#f2ae1d]"></div>
                </div>
            )}
            {hasError ? (
                <div className="flex h-full items-center justify-center text-neutral-300 text-xs">
                    Failed to load
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={`h-full w-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                />
            )}
        </div>
    );
}

function ProjectsIndex() {
    const { projects } = usePage<{ projects: Projects }>().props;

    return (
        <ClientLayout>
            <Head title="Projects" />
            <div className="space-y-5 p-3 md:p-8 mt-5">
                <h1 className="text-3xl font-normal  tracking-tight text-[#1f2933]">
                    Your Projects
                </h1>
                <p className="text-normal text-[#6b7280]">
                    Select a project to view its details and progress updates.
                </p>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.data.map((project) => (
                        <Link
                            viewTransition
                            key={project.id}
                            href={`/dashboard/project/${project.slug}`}
                            className="group block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 ease-out hover:border-[#f2ae1d]/40 hover:shadow-md hover:shadow-[#f2ae1d]/5"
                        >
                            <div className="mb-4 h-40 w-full overflow-hidden rounded-lg bg-neutral-100">
                                {project.image ? (
                                    <div className="relative h-full w-full overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-200">
                                        <ProjectImage src={project.image} alt={project.name} />
                                    </div>
                                ) : (
                                    <div className="flex h-full items-center justify-center text-neutral-300 text-xs">
                                        No image
                                    </div>
                                )}
                            </div>

                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-semibold text-[#111827] transition-colors duration-300 group-hover:text-[#f2ae1d]">
                                        {project.name}
                                    </h3>
                                </div>
                                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700 transition-all duration-300 group-hover:bg-[#f2ae1d]/10 group-hover:text-[#f2ae1d]">
                                    {project.status}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                {project.project_notes && project.project_notes.length > 0 && (
                                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f2ae1d]/10 border border-[#f2ae1d]/20">
                                        <FileText className="h-3 w-3 text-[#f2ae1d]" />
                                        <span className="text-xs font-medium text-[#f2ae1d]">
                                            {project.project_notes.length}
                                        </span>
                                    </div>
                                )}
                                {project.payment_link && (
                                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 border border-green-200">
                                        <CreditCard className="h-3 w-3 text-green-600" />
                                        <span className="text-xs font-medium text-green-700">
                                            Payment
                                        </span>
                                    </div>
                                )}
                                {project.timeline && project.timeline.length > 0 && (
                                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 border border-blue-200">
                                        <Clock className="h-3 w-3 text-blue-600" />
                                        <span className="text-xs font-medium text-blue-700">
                                            Timeline
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-1 space-y-1 text-xs text-neutral-500">
                                <p>
                                    <span className="font-medium text-neutral-700">Location:</span> {project.location}
                                </p>
                                <p>
                                    <span className="font-medium text-neutral-700">Start date:</span> {new Date(project.start_date).toLocaleDateString()}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </ClientLayout>
    );
}

export default ProjectsIndex;