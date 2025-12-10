import ClientLayout from '@/layouts/ClientLayout';
import { Projects } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

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
            <div className="space-y-8 p-6 md:p-8">
                <h1 className="text-3xl font-bold tracking-tight text-[#1f2933]">
                    Your Projects
                </h1>
                <p className="mt-2 text-sm text-[#6b7280]">
                    Select a project to view its details and progress updates.
                </p>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.data.map((project) => (
                        <Link
                            viewTransition
                            key={project.id}
                            href={`/dashboard/project/${project.slug}`}
                            className="group block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-[#f2ae1d]/40 hover:shadow-md"
                        >
                            <div className="mb-4 h-40 w-full overflow-hidden rounded-lg bg-neutral-100">
                                {project.image ? (
                                    <ProjectImage src={project.image} alt={project.name} />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-neutral-300 text-xs">
                                        No image
                                    </div>
                                )}
                            </div>

                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-base font-semibold text-[#111827] group-hover:text-[#f2ae1d]">
                                    {project.name}
                                </h3>
                                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
                                    {project.status}
                                </span>
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