import ClientLayout from '@/layouts/ClientLayout';
import { Project } from '@/types';
import { Head, usePage, router, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ImageWithLoader } from '@/components/ui/ImageWithLoader';
import { ImageModal } from '@/components/ui/ImageModal';
import Timeline from '@/components/Timeline';
import { useState } from 'react';
import { ChevronDown, MessageCircle, Send, Trash2, Calendar, MapPin, FileText, CreditCard } from 'lucide-react';

function ProjectShow() {
	const { project: initialProject } = usePage<{ project: Project; auth: { user: { id: number; name?: string; email?: string } } }>().props;
	const [modalImage, setModalImage] = useState<{ images: Array<{ src: string; alt: string }>; currentIndex: number } | null>(null);
	const [collapsedUpdates, setCollapsedUpdates] = useState<Set<number>>(new Set(
		initialProject.project_updates?.data.slice(1).map(update => update.id) || []
	));
	const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
	const [isSubmitting, setIsSubmitting] = useState<Record<number, boolean>>({});
	const [editingComment, setEditingComment] = useState<number | null>(null);
	const [editContent, setEditContent] = useState<string>('');
	const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; commentId: number | null }>({ isOpen: false, commentId: null });
	const [project, setProject] = useState(initialProject);

	// Smart percentage calculator that considers all nested items
	const calculateSmartPercentage = (timelineItems: import('@/types').TimelineItem[]): number => {
		if (!timelineItems || timelineItems.length === 0) return 0;

		let totalItems = 0;
		let completedItems = 0;

		timelineItems.forEach(item => {
			// Count parent item
			totalItems++;
			if (item.is_active) {
				completedItems++;
			}

			// Count children items
			if (item.children && item.children.length > 0) {
				item.children.forEach(child => {
					totalItems++;
					if (child.is_active) {
						completedItems++;
					}
				});
			}
		});

		return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
	};

	const timelinePercentage = calculateSmartPercentage(project.timeline || []);

	const handleCommentSubmit = async (updateId: number) => {
		const content = commentInputs[updateId]?.trim();
		if (!content) return;

		setIsSubmitting(prev => ({ ...prev, [updateId]: true }));

		// Generate comment data outside of render
		const generateComment = (content: string) => ({
			id: Date.now(),
			content: content,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		});

		const newComment = generateComment(content);

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

		setCommentInputs(prev => ({ ...prev, [updateId]: '' }));

		router.post(
			`/dashboard/project-updates/${updateId}/comments`,
			{ content },
			{
				showProgress: false,
				preserveState: true,
				preserveScroll: true,
				onSuccess: (page) => {
					// Update with real data from server
					if (page.props.project) {
						setProject(page.props.project as Project);
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
		setDeleteModal({ isOpen: true, commentId });
	};

	const confirmDelete = async () => {
		const commentId = deleteModal.commentId;
		if (!commentId) return;

		// Close modal
		setDeleteModal({ isOpen: false, commentId: null });

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
				showProgress: false,
				preserveState: true,
				preserveScroll: true,
				onSuccess: (page) => {
					// Update with real data from server
					if (page.props.project) {
						setProject(page.props.project as Project);
					}
				},
				onError: (errors) => {
					console.error('Delete errors:', errors);
					alert('Failed to delete comment.');
					setProject(initialProject);
				},
			}
		);
	};

	const cancelDelete = () => {
		setDeleteModal({ isOpen: false, commentId: null });
	};

	const handleCommentEdit = (commentId: number, content: string) => {
		setEditingComment(commentId);
		setEditContent(content);
	};

	const handleCommentUpdate = async (commentId: number) => {
		const content = editContent.trim();
		if (!content) return;

		setProject(prev => ({
			...prev,
			project_updates: prev.project_updates ? {
				...prev.project_updates,
				data: prev.project_updates.data.map(update => ({
					...update,
					comments: update.comments?.map(comment =>
						comment.id === commentId
							? { ...comment, content, updated_at: new Date().toISOString() }
							: comment
					) || []
				}))
			} : prev.project_updates
		}));

		// Clear edit state
		setEditingComment(null);
		setEditContent('');

		// Update on server in background
		router.put(
			`/dashboard/comments/${commentId}`,
			{ content },
			{
				showProgress: false,
				preserveState: true,
				preserveScroll: true,
				onSuccess: (page) => {
					// Update with real data from server
					if (page.props.project) {
						setProject(page.props.project as Project);
					}
				},
				onError: (errors) => {
					console.error('Update errors:', errors);
					alert('Failed to update comment.');
					// Revert local changes on error
					setProject(initialProject);
				},
			}
		);
	};

	const handleCancelEdit = () => {
		setEditingComment(null);
		setEditContent('');
	};

	return (
		<ClientLayout>
			<Head title={project.name} />

			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<div className="bg-white border-b border-gray-200">
					<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="space-y-6"
						>
							{/* Breadcrumb */}
							<nav className="flex items-center space-x-2 text-sm text-gray-500">
								<Link href="/dashboard/projects" className="hover:text-gray-700 transition-colors">Projects</Link>
								<span>/</span>
								<span className="text-gray-900 font-medium">{project.name}</span>
							</nav>

							{/* Project Title and Meta */}
							<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
								<div className="flex-1">
									<h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
										{project.name}
									</h1>

									<div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
										<div className="flex items-center gap-2">
											<Calendar className="h-4 w-4" />
											<span>
												{new Date(project.start_date).toLocaleDateString('en-US', {
													month: 'long',
													day: 'numeric',
													year: 'numeric'
												})}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<MapPin className="h-4 w-4" />
											<span>{project.location}</span>
										</div>
										<div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
											{project.status}
										</div>
									</div>

									{project.payment_link && (
										<div className="mt-4">
											<a
												href={project.payment_link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#f2ae1d] hover:bg-[#e09e0d] transition-colors"
											>
												<CreditCard className="h-4 w-4" />
												View Payment Sheet
											</a>
										</div>
									)}
								</div>

								{project.image && (
									<motion.div
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.2 }}
										className="lg:w-96 h-48 lg:h-64 rounded-xl overflow-hidden border border-gray-200"
									>
										<ImageWithLoader
											src={project.image}
											alt={project.name}
											className="w-full h-full object-cover cursor-pointer"
											onClick={() => project.image && setModalImage({
												images: [{ src: project.image, alt: project.name }],
												currentIndex: 0
											})}
										/>
									</motion.div>
								)}
							</div>
						</motion.div>
					</div>
				</div>

				{/* Main Content */}
				<div className="mx-auto px-4 py-4">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
						{/* Main Content Area */}
						<div className="lg:col-span-4 space-y-2">
							{/* Description */}
							{project.description && (
								<motion.section
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3, duration: 0.5 }}
									className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
								>
									<div className="flex items-center gap-3 mb-4">
										<div className="w-1 h-6 bg-neutral-900 rounded-full"></div>
										<h2 className="text-base font-semibold text-neutral-900 tracking-tight">
											Overview
										</h2>
									</div>
									<p className="text-sm text-neutral-600 leading-relaxed">
										{project.description}
									</p>
								</motion.section>
							)}

							{/* Timeline Section */}
							{project.timeline && project.timeline.length > 0 && (
								<motion.section
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.35 }}
									className="bg-white rounded-xl border border-gray-200 p-4"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<h2 className="text-lg font-semibold text-gray-900">Project Timeline</h2>
											<div className="group relative">
												<div className="w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-help transition-colors">
													<span className="text-xs text-gray-600 font-medium">i</span>
												</div>
												<div className="absolute left-0 top-full mt-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
													<p className="mb-2 font-semibold">How to use timeline:</p>
													<ul className="space-y-1">
														<li>• Drag left/right to scroll</li>
														<li>• Click completed items for details</li>
														<li>• Use arrow buttons to navigate</li>
													</ul>
													<div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 rotate-45"></div>
												</div>
											</div>
										</div>
									</div>
									<div className="flex items-center justify-between mb-4">
										<p className="text-sm text-gray-600">
											{project.timeline?.filter(item => item.is_active).length || 0} of {project.timeline?.length || 0} completed
										</p>
									</div>
									<Timeline items={project.timeline} />
								</motion.section>
							)}


							{/* Project Requirements Section */}
							{project.project_notes && project.project_notes.length > 0 && (
								<motion.section
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.35 }}
									className="bg-white rounded-lg border border-gray-200 p-4 relative"
								>
									{/* Header Bar */}
									<div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
										<div className="flex items-center gap-2">
											<div className="w-5 h-5 bg-[#f2ae1d] rounded-full flex items-center justify-center">
												<FileText className="h-2.5 w-2.5 text-white" />
											</div>
											<div>
												<span className="text-sm font-semibold text-gray-900">Requirements</span>
												<span className="ml-2 px-2 py-0.5 bg-[#f2ae1d]/10 text-xs font-medium text-[#f2ae1d] rounded-full">
													{project.project_notes.length}
												</span>
											</div>
										</div>
										<Link
											href="/dashboard/requirements"
											className="text-xs text-[#f2ae1d] hover:text-[#e09e0d] transition-colors"
										>
											View All →
										</Link>
									</div>

									{/* Requirements Grid */}
									<div className="grid grid-cols-1 gap-2">
										{project.project_notes.map((note, index) => (
											<motion.div
												key={index}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.2, delay: index * 0.02 }}
												className="group"
											>
												<div className="flex items-start gap-2 p-3 bg-gray-50 rounded border border-gray-200 hover:border-[#f2ae1d]/20 hover:shadow-sm transition-all duration-200">
													<div className="shrink-0 w-4 h-4 bg-white rounded border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-500">
														{index + 1}
													</div>
													<div className="flex-1 min-w-0">
														<div
															className="text-gray-700 text-xs leading-relaxed prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-3 [&_ol]:list-decimal [&_ol]:pl-3 [&_li]:mb-0.5 [&_h1]:text-xs [&_h2]:text-xs [&_h3]:text-xs [&_p]:mb-1 [&_strong]:font-medium [&_em]:italic"
															dangerouslySetInnerHTML={{
																__html: note.content
															}}
														/>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								</motion.section>
							)}

							{/* Updates */}
							{project.project_updates && project.project_updates.data.length > 0 && (
								<motion.section
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									className="space-y-6"
								>
									<div className="flex items-center justify-between">
										<h2 className="text-xl font-semibold text-gray-900">Updates</h2>
										<span className="text-sm text-gray-500">
											{project.project_updates.data.length} update{project.project_updates.data.length !== 1 ? 's' : ''}
										</span>
									</div>

									<div className="space-y-4">
										{project.project_updates.data.map((update, updateIndex) => {
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
												<motion.article
													key={update.id}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: 0.1 * updateIndex }}
													className="bg-white rounded-xl border border-gray-200 overflow-hidden p-2"
												>
													{/* Header */}
													<button
														onClick={toggleCollapse}
														className="w-full px-3 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
													>
														<div className="flex-1 min-w-0">
															<div className="flex items-center gap-3 mb-2">
																<time className="text-sm font-medium text-gray-500">
																	{new Date(update.date).toLocaleDateString('en-US', {
																		month: 'short',
																		day: 'numeric',
																		year: 'numeric'
																	})}
																</time>
																{update.media && update.media.length > 0 && (
																	<span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
																		<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
																		</svg>
																		{update.media.length}
																	</span>
																)}
															</div>
															<h3 className="text-lg font-medium text-gray-900 truncate">
																{update.name || 'Project Update'}
															</h3>
																													</div>
														<motion.div
															animate={{ rotate: isCollapsed ? 0 : 180 }}
															transition={{ duration: 0.2 }}
															className="ml-4 text-gray-400"
														>
															<ChevronDown className="h-5 w-5" />
														</motion.div>
													</button>

													{/* Expanded Content */}
													{!isCollapsed && (
														<motion.div
															initial={{ opacity: 0, height: 0 }}
															animate={{ opacity: 1, height: 'auto' }}
															transition={{ duration: 0.3 }}
															className="border-t border-gray-200"
														>
															<div className="p-2 space-y-6">
																{update.description && (
																	<div>
																		<p className="text-gray-700 leading-relaxed whitespace-pre-line">
																			{update.description}
																		</p>
																	</div>
																)}

																{update.media && update.media.length > 0 && (
																	<div>
																		<h4 className="text-sm font-medium text-gray-900 mb-3">Media</h4>
																		<div className="grid grid-cols-2 md:grid-cols-5 gap-2">
																			{update.media.map((mediaItem) => (
																				<motion.div
																					key={mediaItem.id}
																					whileHover={{ scale: 1.02 }}
																					className="rounded-lg overflow-hidden border border-gray-200 cursor-pointer"
																				>
																					<ImageWithLoader
																						src={mediaItem.original_url}
																						alt={`Update image ${mediaItem.id}`}
																						className="w-full aspect-square object-cover"
																						onClick={() => {
																							const updateImages = update.media.map((media) => ({
																								src: media.original_url,
																								alt: `Update image ${media.id}`
																							}));
																							const imageIndex = update.media.findIndex(media => media.original_url === mediaItem.original_url);
																							setModalImage({
																								images: updateImages,
																								currentIndex: imageIndex
																							});
																						}}
																					/>
																				</motion.div>
																			))}
																		</div>
																	</div>
																)}

																{/* Comments */}
																<div className="border-t border-gray-100 pt-6">
																	<div className="flex items-center gap-2 mb-4">
																		<MessageCircle className="h-4 w-4 text-gray-400" />
																		<h4 className="text-sm font-medium text-gray-900">
																			Comments ({update.comments?.length || 0})
																		</h4>
																	</div>

																	<div className="space-y-3 mb-4">
																		{update.comments && update.comments.length > 0 ? (
																			update.comments.map((comment) => (
																				<div
																					key={comment.id}
																					className="bg-gray-50 rounded-lg p-3"
																				>
																					<div className="flex items-start justify-between">
																						<div className="flex-1">
																							<div className="flex items-center gap-2 mb-2">
																								<span className="text-xs text-gray-500">
																									{new Date(comment.created_at).toLocaleDateString()}
																									{comment.updated_at !== comment.created_at && (
																										<span className="ml-2 text-xs text-gray-400 italic">
																											(edited)
																										</span>
																									)}
																								</span>
																							</div>
																							{editingComment === comment.id ? (
																								<div className="space-y-2">
																									<textarea
																										value={editContent}
																										onChange={(e) => setEditContent(e.target.value)}
																										className="w-full p-2 text-sm border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
																										rows={3}
																										placeholder="Edit your comment..."
																									/>
																									<div className="flex gap-2">
																										<button
																											onClick={() => handleCommentUpdate(comment.id)}
																											className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
																										>
																											Save
																										</button>
																										<button
																											onClick={handleCancelEdit}
																											className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
																										>
																											Cancel
																										</button>
																									</div>
																								</div>
																							) : (
																								<p className="text-sm text-gray-700 whitespace-pre-line">
																									{comment.content}
																								</p>
																							)}
																						</div>
																						{editingComment !== comment.id && (
																							<div className="flex gap-1 ml-2">
																								<button
																									onClick={() => handleCommentEdit(comment.id, comment.content)}
																									className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
																									title="Edit comment"
																								>
																									<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
																									</svg>
																								</button>
																								<button
																									onClick={() => handleCommentDelete(comment.id)}
																									className="p-1 text-gray-400 hover:text-red-600 transition-colors"
																									title="Delete comment"
																								>
																									<Trash2 className="h-4 w-4" />
																								</button>
																							</div>
																						)}
																					</div>
																				</div>
																			))
																		) : (
																			<p className="text-sm text-gray-500 italic text-center py-4">
																				No comments yet
																			</p>
																		)}
																	</div>

																	{/* Comment Input */}
																	<div className="flex gap-2">
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
																			className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
																			disabled={isSubmitting[update.id]}
																		/>
																		<button
																			onClick={() => handleCommentSubmit(update.id)}
																			disabled={!commentInputs[update.id]?.trim() || isSubmitting[update.id]}
																			className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
															</div>
														</motion.div>
													)}
												</motion.article>
											);
										})}
									</div>
								</motion.section>
							)}

							{!project.project_updates || project.project_updates.data.length === 0 && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className="bg-white rounded-xl border border-gray-200 p-8 text-center"
								>
									<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
										<Calendar className="h-8 w-8 text-gray-400" />
									</div>
									<h3 className="text-lg font-medium text-gray-900 mb-2">No Updates Yet</h3>
									<p className="text-gray-600">Updates will appear here as the project progresses.</p>
								</motion.div>
							)}
						</div>

						{/* Sidebar */}
						<div className="lg:col-span-1 space-y-6">
							{/* Project Details - Sticky on desktop */}
							<motion.aside
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4 }}
								className="hidden lg:block lg:sticky lg:top-24 lg:h-fit"
							>
								<div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
									<h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
										<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
										Project Details
									</h3>

									<dl className="space-y-3">
										<div className="flex items-center justify-between py-2 border-b border-gray-100">
											<dt className="text-xs font-medium text-gray-500">Status</dt>
											<dd>
												<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
													{project.status}
												</span>
											</dd>
										</div>

										{project.location && (
											<div className="flex items-center justify-between py-2 border-b border-gray-100">
												<dt className="text-xs font-medium text-gray-500">Location</dt>
												<dd className="text-xs text-gray-900 font-medium">{project.location}</dd>
											</div>
										)}

										<div className="flex items-center justify-between py-2 border-b border-gray-100">
											<dt className="text-xs font-medium text-gray-500">Started</dt>
											<dd className="text-xs text-gray-900 font-medium">
												{new Date(project.start_date).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
													year: 'numeric'
												})}
											</dd>
										</div>

										{project.timeline && project.timeline.length > 0 && (
											<div className="flex items-center justify-between py-2 border-b border-gray-100">
												<dt className="text-xs font-medium text-gray-500">Timeline</dt>
												<dd>
													<div className="flex items-center gap-2">
														<span className="text-xs font-semibold text-emerald-600">{timelinePercentage}%</span>
														<div className="w-12 bg-gray-200 rounded-full h-1.5">
															<div
																className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full"
																style={{ width: `${timelinePercentage}%` }}
															/>
														</div>
													</div>
												</dd>
											</div>
										)}

										{project.project_notes && project.project_notes.length > 0 && (
											<div className="flex items-center justify-between py-2 border-b border-gray-100">
												<dt className="text-xs font-medium text-gray-500">Requirements</dt>
												<dd>
													<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f2ae1d]/10 text-[#f2ae1d] border border-[#f2ae1d]/20">
														{project.project_notes.length}
													</span>
												</dd>
											</div>
										)}

										{project.payment_link && (
											<div className="flex items-center justify-between py-2 border-b border-gray-100">
												<dt className="text-xs font-medium text-gray-500">Payment</dt>
												<dd>
													<a
														href={project.payment_link}
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
													>
														<CreditCard className="h-3 w-3" />
														Sheet
													</a>
												</dd>
											</div>
										)}

										{project.project_updates && (
											<div className="flex items-center justify-between py-2 border-b border-gray-100">
												<dt className="text-xs font-medium text-gray-500">Updates</dt>
												<dd className="text-xs text-gray-900 font-medium">
													{project.project_updates.data.length}
												</dd>
											</div>
										)}

										{project.project_updates && (
											<div className="flex items-center justify-between py-2">
												<dt className="text-xs font-medium text-gray-500">Comments</dt>
												<dd className="text-xs text-gray-900 font-medium">
													{project.project_updates.data.reduce((total, update) => total + (update.comments?.length || 0), 0)}
												</dd>
											</div>
										)}
									</dl>
								</div>
							</motion.aside>
						</div>
					</div>
				</div>
			</div>

			{/* Image Modal */}
			<ImageModal
				isOpen={!!modalImage}
				images={modalImage?.images || []}
				currentIndex={modalImage?.currentIndex || 0}
				onClose={() => setModalImage(null)}
			/>

			{/* Delete Confirmation Modal */}
			{deleteModal.isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
					onClick={cancelDelete}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="text-center">
							<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
								<Trash2 className="h-6 w-6 text-red-600" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Comment</h3>
							<p className="text-sm text-gray-500 mb-6">
								Are you sure you want to delete this comment? This action cannot be undone.
							</p>
							<div className="flex gap-3">
								<button
									onClick={cancelDelete}
									className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={confirmDelete}
									className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
								>
									Delete
								</button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</ClientLayout>
	);
}

export default ProjectShow;
