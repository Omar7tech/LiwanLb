import ClientLayout from "@/layouts/ClientLayout";
import { Projects } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { motion } from 'framer-motion';
import { FileText, FolderOpen } from 'lucide-react';

function ProjectNotes() {
    const { projects } = usePage<{ projects: Projects }>().props;
    return (
        <ClientLayout>
            <Head title="Project Notes" />
            
            <div className="w-full px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="space-y-3">
                        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Project Notes</h1>
                        <p className="text-gray-600 max-w-3xl">
                            View all your project requirements and notes in one place.
                        </p>
                    </div>

                    {/* Notes Grid */}
                    {projects.data.length > 0 ? (
                        <div className="space-y-6">
                            {projects.data.map((project) => (
                                project.project_notes && project.project_notes.length > 0 && (
                                    <div key={project.id}>
                                        {/* Project Name */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                                <FolderOpen className="h-4 w-4 text-gray-700" />
                                            </div>
                                            <h2 className="text-lg font-medium text-gray-900">{project.name}</h2>
                                            <span className="text-sm text-gray-500">
                                                ({project.project_notes.length} {project.project_notes.length === 1 ? 'note' : 'notes'})
                                            </span>
                                        </div>
                                        
                                        {/* Notes */}
                                        <div className="space-y-3">
                                            {project.project_notes.map((note, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                                    className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="shrink-0 w-6 h-6 bg-gray-50 rounded flex items-center justify-center mt-1">
                                                            <FileText className="h-3 w-3 text-gray-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div 
                                                                className="text-gray-700 text-sm prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_p]:mb-2 [&_strong]:font-medium [&_em]:italic"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: note.content
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                            
                            {/* Check if any notes exist */}
                            {projects.data.every(project => !project.project_notes || project.project_notes.length === 0) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Notes Yet</h3>
                                    <p className="text-gray-600 max-w-md mx-auto">
                                        Notes will appear here once they're added by the project team.
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        /* Empty State */
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-lg border border-gray-200 p-12 text-center"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FolderOpen className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>
                            <p className="text-gray-600 max-w-md mx-auto mb-6">
                                You don't have any projects yet. Once projects are created and assigned to you, their notes will appear here.
                            </p>
                            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <span>Check back later</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <span>Contact your admin</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </ClientLayout>
    )
}

export default ProjectNotes