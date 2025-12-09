import ClientLayout from '@/layouts/ClientLayout';
import { Projects } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

function ProjectsIndex() {
    const { projects } = usePage<{ projects: Projects }>().props;

    return (
        <ClientLayout>
            <Head title="Projects" />
            <div className="space-y-8">
                <h1 className="text-3xl font-bold tracking-tight text-[#1f2933]">
                    Your Projects
                </h1>
                <p className="mt-2 text-sm text-[#6b7280]">
                    Select a project to view its details and progress updates.
                </p>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.data.map((project) => (
                        <Link
                            key={project.id}
                            href={`/dashboard/project/${project.slug}`}
                            className="group block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-[#f2ae1d]/40 hover:shadow-md"
                        >
                            <div className="mb-4 h-40 w-full overflow-hidden rounded-lg bg-neutral-100">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="h-full w-full object-cover"
                                    />
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
                                    <span className="font-medium text-neutral-700">Start date:</span> {project.start_date}
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