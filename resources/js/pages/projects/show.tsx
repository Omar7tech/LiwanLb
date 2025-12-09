import ClientLayout from '@/layouts/ClientLayout';
import { Project } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ImageWithLoader } from '@/components/ui/ImageWithLoader';
import { ImageModal } from '@/components/ui/ImageModal';
import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Send, Trash2 } from 'lucide-react';

function ProjectShow() {
	const { project: initialProject, auth } = usePage<{ project: Project; auth: { user: { id: number; name?: string; email?: string } } }>().props;
	const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
	const [collapsedUpdates, setCollapsedUpdates] = useState<Set<number>>(new Set(
		initialProject.project_updates?.data.slice(1).map(update => update.id) || []
	));
	const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
	const [isSubmitting, setIsSubmitting] = useState<{ [key: number]: boolean }>({});
	const [project, setProject] = useState(initialProject);

	const handleCommentSubmit = async (updateId: number) => {
		const content = commentInputs[updateId]?.trim();
		if (!content) return;

		setIsSubmitting(prev => ({ ...prev, [updateId]: true }));

		// Add comment locally for immediate UI update
		const newComment = {
			id: Date.now(), // Temporary ID
			content: content,
			created_at: new Date().toISOString(),
			user: {
				id: auth.user.id,
				name: auth.user.name || 'User',
				email: auth.user.email || '',
			},
		};

		// Update local state immediately
		setProject(prev => ({
			...prev,
			project_updates: prev.project_updates ? {
				...prev.project_updates,
				data: prev.project_updates.data.map(update => {
					if (update.id === updateId) {
						return {
							...update,
							comments: [...(update.comments || []), newComment]
						};
					}
					return update;
				})
			} : prev.project_updates
		}));

		// Clear input
		setCommentInputs(prev => ({ ...prev, [updateId]: '' }));

		// Submit to server in background
		router.post(
			`/dashboard/project-updates/${updateId}/comments`,
			{ content },
			{
				preserveState: true,
				preserveScroll: true,
				onSuccess: (page: any) => {
					// Update with real data from server
					if (page.props.project) {
						setProject(page.props.project);
					}
				},
				onError: (errors) => {
					console.error('Validation errors:', errors);
					alert('Failed to submit comment. Please check your input.');
					// Revert local changes on error
					setProject(initialProject);
				},
				onFinish: () => {
					setIsSubmitting(prev => ({ ...prev, [updateId]: false }));
				},
			}
		);
	};

	const handleCommentDelete = async (commentId: number) => {
		if (!confirm('Are you sure you want to delete this comment?')) return;

		// Remove comment locally for immediate UI update
		setProject(prev => ({
			...prev,
			project_updates: prev.project_updates ? {
				...prev.project_updates,
				data: prev.project_updates.data.map(update => ({
					...update,
					comments: update.comments?.filter(comment => comment.id !== commentId) || []
				}))
			} : prev.project_updates
		}));

		// Delete from server in background
		router.delete(
			`/dashboard/comments/${commentId}`,
			{
				preserveState: true,
				preserveScroll: true,
				onSuccess: (page: any) => {
					// Update with real data from server
					if (page.props.project) {
						setProject(page.props.project);
					}
				},
				onError: (errors) => {
					console.error('Delete errors:', errors);
					alert('Failed to delete comment.');
					// Revert local changes on error
					setProject(initialProject);
				},
			}
		);
	};

	return (
		<ClientLayout>
			<Head title={project.name} />
			<div className="space-y-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-3xl font-bold tracking-tight text-[#3a3b3a]">
						{project.name}
					</h1>
					<p className="mt-2 text-[#3a3b3a]/70">
						Status: {project.status} • Location: {project.location}
					</p>
				</motion.div>

				<div className="space-y-8">
					{project.image && (
						<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
							<ImageWithLoader
								src={project.image}
								alt={project.name}
								className="w-full h-72 object-cover cursor-pointer"
								onClick={() => project.image && setModalImage({ src: project.image, alt: project.name })}
							/>
						</div>
					)}

					{project.description && (
						<div className="rounded-2xl border border-neutral-200 bg-white p-6">
							<h2 className="text-lg font-semibold mb-2">Description</h2>
							<p className="text-sm text-[#3a3b3a]/80 whitespace-pre-line">{project.description}</p>
						</div>
					)}

					{project.project_updates && project.project_updates.data.length > 0 && (
						<div className="space-y-4">
							<h2 className="text-lg font-semibold mb-4">Updates</h2>
								{project.project_updates.data.map((update) => {
									const isCollapsed = collapsedUpdates.has(update.id);
									const toggleCollapse = () => {
										setCollapsedUpdates(prev => {
											const newSet = new Set(prev);
											if (newSet.has(update.id)) {
												newSet.delete(update.id);
											} else {
												newSet.add(update.id);
											}
											return newSet;
										});
									};

									return (
										<motion.div
											key={update.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3 }}
											className={`group rounded-xl border transition-all duration-300 ${
												isCollapsed 
													? 'border-neutral-200 bg-white hover:border-[#f2ae1d]/30 hover:shadow-sm' 
													: 'border-[#f2ae1d]/50 bg-white shadow-md'
											}`}
										>
											{/* Header with toggle */}
											<div 
												className="flex items-center justify-between p-3 sm:p-4 cursor-pointer select-none"
												onClick={toggleCollapse}
											>
												<div className="flex items-center space-x-3 flex-1">
													{/* Status indicator */}
													<div className={`w-2 h-2 rounded-full transition-all duration-300 ${
														isCollapsed ? 'bg-[#f2ae1d]/50' : 'bg-[#f2ae1d] scale-125'
													}`} />
													
													<div className="flex-1 min-w-0">
														<div className="flex items-center space-x-2 mb-1">
															<span className="text-xs font-medium text-[#f2ae1d] bg-[#f2ae1d]/10 px-2 py-1 rounded-full">
																{new Date(update.date).toLocaleDateString('en-US', { 
																	month: 'short', 
																	day: 'numeric', 
																	year: 'numeric' 
																})}
															</span>
															{update.media && update.media.length > 0 && (
																<span className="text-xs text-[#3a3b3a]/50 flex items-center">
																	<svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
																	</svg>
																	{update.media.length}
																</span>
															)}
														</div>
														{update.name && (
															<h3 className="font-semibold text-[#3a3b3a] truncate group-hover:text-[#f2ae1d] transition-colors">
																{update.name}
															</h3>
														)}
														{!update.name && (
															<p className="text-sm text-[#3a3b3a]/60 italic">Project update</p>
														)}
													</div>
												</div>
												
												{/* Toggle button */}
												<motion.div
													className={`ml-3 p-2 rounded-lg transition-all duration-300 ${
														isCollapsed 
															? 'bg-neutral-100 group-hover:bg-[#f2ae1d]/10' 
															: 'bg-[#f2ae1d]/10'
													}`}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													<motion.div
														animate={{ rotate: isCollapsed ? 0 : 180 }}
														transition={{ duration: 0.3 }}
													>
														<ChevronDown className="h-4 w-4 text-[#3a3b3a] group-hover:text-[#f2ae1d]" />
													</motion.div>
												</motion.div>
											</div>

											{/* Collapsible content */}
											{!isCollapsed && (
												<motion.div
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: 'auto' }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.3, ease: 'easeInOut' }}
													className="overflow-hidden border-t border-[#f2ae1d]/20"
												>
													<div className="p-3 sm:p-4 pt-2 sm:pt-3">
														{update.description && (
															<div className="mb-4">
																<p className="text-sm text-[#3a3b3a]/80 leading-relaxed whitespace-pre-line">
																	{update.description}
																</p>
															</div>
														)}
														{update.media && update.media.length > 0 && (
															<div className="space-y-3">
																<p className="text-xs font-medium text-[#3a3b3a]/60 uppercase tracking-wide">Media Gallery</p>
																<div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
																	{update.media.map((media) => (
																		<motion.div
																			key={media.id}
																			whileHover={{ scale: 1.02 }}
																			transition={{ duration: 0.2 }}
																			className="relative overflow-hidden rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
																		>
																			<ImageWithLoader
																				src={media.original_url}
																				alt={`Update image ${media.id}`}
																				className="w-full aspect-[4/3] object-cover cursor-pointer"
																				onClick={() => setModalImage({ src: media.original_url, alt: `Update image ${media.id}` })}
																			/>
																		</motion.div>
																	))}
																</div>
															</div>
														)}
														{/* Comments Section */}
														<div className="space-y-3 mt-4 pt-4 border-t border-neutral-200">
															<div className="flex items-center space-x-2 mb-3">
																<MessageCircle className="h-4 w-4 text-[#f2ae1d]" />
																<p className="text-xs font-medium text-[#3a3b3a]/60 uppercase tracking-wide">
																	Comments ({update.comments?.length || 0})
																</p>
															</div>

															{/* Comments List */}
															<div className="space-y-3 mb-4">
																{update.comments && update.comments.length > 0 ? (
																	update.comments.map((comment) => (
																		<motion.div
																			key={comment.id}
																			initial={{ opacity: 0, y: 10 }}
																			animate={{ opacity: 1, y: 0 }}
																			className="bg-neutral-50 rounded-lg p-3 border border-neutral-200"
																		>
																			<div className="flex items-start justify-between">
																				<div className="flex-1">
																					<div className="flex items-center space-x-2 mb-2">
																						<div className="w-6 h-6 bg-[#f2ae1d]/20 rounded-full flex items-center justify-center">
																							<span className="text-xs font-medium text-[#f2ae1d]">
																								{comment.user.name.charAt(0).toUpperCase()}
																							</span>
																						</div>
																						<div className="flex-1 min-w-0">
																							<p className="text-xs font-medium text-[#3a3b3a] truncate">
																								{comment.user.name}
																							</p>
																							<p className="text-xs text-[#3a3b3a]/50">
																								{new Date(comment.created_at).toLocaleDateString()}
																							</p>
																						</div>
																					</div>
																					<p className="text-sm text-[#3a3b3a]/80 whitespace-pre-line">
																						{comment.content}
																					</p>
																				</div>
																				{/* Delete button for own comments */}
																				{comment.user.id === auth.user.id && (
																					<button
																						onClick={() => handleCommentDelete(comment.id)}
																						className="ml-2 p-1 text-neutral-400 hover:text-red-500 transition-colors"
																						title="Delete comment"
																					>
																						<Trash2 className="h-3 w-3" />
																					</button>
																				)}
																			</div>
																		</motion.div>
																	))
																) : (
																	<p className="text-sm text-[#3a3b3a]/50 italic text-center py-2">
																		No comments yet. Give us your feedback in a comment!
																	</p>
																)}
															</div>

															{/* Comment Input */}
															<div className="flex space-x-2">
																<input
																	type="text"
																	value={commentInputs[update.id] || ''}
																	onChange={(e) => setCommentInputs(prev => ({ ...prev, [update.id]: e.target.value }))}
																	onKeyPress={(e) => {
																		if (e.key === 'Enter' && !e.shiftKey) {
																			e.preventDefault();
																			handleCommentSubmit(update.id);
																		}
																	}}
																	placeholder="Add a comment..."
																	className="flex-1 px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2ae1d]/50 focus:border-[#f2ae1d]"
																	disabled={isSubmitting[update.id]}
																/>
																<button
																	onClick={() => handleCommentSubmit(update.id)}
																	disabled={!commentInputs[update.id]?.trim() || isSubmitting[update.id]}
																	className="p-2 bg-[#f2ae1d] text-white rounded-lg hover:bg-[#f2ae1d]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
																>
																	{isSubmitting[update.id] ? (
																		<motion.div
																			animate={{ rotate: 360 }}
																			transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
																			className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
																		/>
																	) : (
																		<Send className="h-4 w-4" />
																	)}
																</button>
															</div>
														</div>

														{!update.name && !update.description && (
															<div className="text-center py-4">
																<p className="text-sm text-[#3a3b3a]/60 italic">Update details available</p>
															</div>
														)}
													</div>
												</motion.div>
											)}
										</motion.div>
									);
								})}
						</div>
					)}
				</div>

				<div className="space-y-4">
				</div>
			</div>
		
		<ImageModal
			isOpen={!!modalImage}
			imageSrc={modalImage?.src || ''}
			imageAlt={modalImage?.alt || ''}
			onClose={() => setModalImage(null)}
		/>
	</ClientLayout>
	);
}

export default ProjectShow;
