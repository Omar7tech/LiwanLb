import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import ClientLayout from '@/layouts/ClientLayout';
import { Star, Edit, X, Check, MessageSquare, TrendingUp, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClientReview {
    id?: number;
    rating: number;
    review_notes?: string;
}

interface Props {
    review?: ClientReview;
    hasReview: boolean;
}

export default function ClientReviews({ review, hasReview }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: review?.rating || 0,
        review_notes: review?.review_notes || '',
    });

    const [hoveredRating, setHoveredRating] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/client-reviews', {
            onSuccess: () => {
                setIsModalOpen(false);
            },
        });
    };

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete('/dashboard/client-reviews', {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
            }
        });
    };

    const renderStars = (rating: number, interactive = false, size = 'normal') => {
        const starSize = size === 'large' ? 32 : size === 'small' ? 16 : 24;
        
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= rating;
                    const isHovered = interactive && star <= hoveredRating;
                    
                    if (interactive) {
                        return (
                            <motion.button
                                key={star}
                                type="button"
                                onClick={() => setData('rating', star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="transition-all duration-300"
                                whileTap={{ scale: 0.85 }}
                                whileHover={{ scale: 1.15, rotate: 5 }}
                            >
                                <Star
                                    size={starSize}
                                    className={`transition-all duration-300 ${
                                        isFilled || isHovered
                                            ? 'fill-[#f2ae1d] text-[#f2ae1d] drop-shadow-sm'
                                            : 'fill-gray-200 text-gray-200'
                                    }`}
                                />
                            </motion.button>
                        );
                    }
                    
                    return (
                        <Star
                            key={star}
                            size={starSize}
                            className={`${
                                isFilled
                                    ? 'fill-[#f2ae1d] text-[#f2ae1d]'
                                    : 'fill-gray-200 text-gray-200'
                            }`}
                        />
                    );
                })}
            </div>
        );
    };

    const getRatingLabel = (rating: number) => {
        const labels = {
            0: 'No Rating',
            1: 'Poor',
            2: 'Fair',
            3: 'Good',
            4: 'Very Good',
            5: 'Excellent'
        };
        return labels[rating as keyof typeof labels] || 'No Rating';
    };

    return (
        <ClientLayout>
            <Head title="Client Feedback" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='p-2 md:p-4 mt-3 md:mt-0'
            >
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-2xl font-normal tracking-tight text-[#3a3b3a] mb-2">
                        Rate Your Experience
                    </h1>
                    <p className="text-sm text-gray-600">
                        Share your private feedback with Liwan to help us improve our service
                    </p>
                </div>

                {/* Feedback Section */}
                {hasReview && review ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-white rounded-lg border border-gray-200 p-4"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Your Current Feedback</h2>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={16} className="text-[#f2ae1d]" />
                                    <span className="text-sm font-medium text-gray-600">
                                        {getRatingLabel(review.rating)}
                                    </span>
                                </div>
                                <motion.button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="text-red-500 hover:text-red-600 transition-colors"
                                    whileTap={{ scale: 0.9 }}
                                    title="Delete feedback"
                                >
                                    <Trash2 size={16} />
                                </motion.button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            {renderStars(review.rating, false, 'normal')}
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-[#f2ae1d]">{review.rating}</span>
                                <span className="text-gray-400">/5</span>
                            </div>
                        </div>

                        {review.review_notes && (
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                <div className="flex items-start gap-2">
                                    <MessageSquare size={16} className="text-[#f2ae1d] mt-0.5 shrink-0" />
                                    <p className="text-sm text-gray-700 leading-relaxed">{review.review_notes}</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-[#f2ae1d] text-white rounded-lg hover:bg-[#d4941a] transition-colors duration-200"
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Edit size={16} />
                                <span className="font-medium text-sm">Update Feedback</span>
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-white rounded-lg border border-gray-200 p-8 text-center"
                    >
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star size={28} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Feedback Yet</h3>
                        <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
                            Your private feedback helps Liwan provide better service
                        </p>
                        <motion.button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#f2ae1d] text-white rounded-lg hover:bg-[#d4941a] transition-colors duration-200"
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Edit size={14} />
                            <span className="font-medium text-sm">Add Your First Feedback</span>
                        </motion.button>
                    </motion.div>
                )}
            </motion.div>

            {/* Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-lg border border-gray-200 max-w-sm w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="px-4 py-3 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-base font-semibold text-gray-900">
                                        {hasReview ? 'Edit Feedback' : 'Add Feedback'}
                                    </h2>
                                    <motion.button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <X size={16} />
                                    </motion.button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Rating
                                    </label>
                                    <div className="flex justify-center mb-2">
                                        {renderStars(data.rating, true, 'normal')}
                                    </div>
                                    <motion.div
                                        key={data.rating}
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center"
                                    >
                                        <span className="inline-flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full">
                                            <span className="font-medium text-[#f2ae1d] text-xs">{data.rating}/5</span>
                                            <span className="text-gray-500 text-xs">{getRatingLabel(data.rating)}</span>
                                        </span>
                                    </motion.div>
                                    {errors.rating && (
                                        <motion.p
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="mt-2 text-sm text-red-600 text-center"
                                        >
                                            {errors.rating}
                                        </motion.p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="review_notes" className="block text-sm font-medium text-gray-900 mb-2">
                                        Notes (Optional)
                                    </label>
                                    <textarea
                                        id="review_notes"
                                        value={data.review_notes}
                                        onChange={(e) => setData('review_notes', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f2ae1d] focus:border-transparent transition-colors resize-none"
                                        placeholder="Share your private feedback..."
                                    />
                                    {errors.review_notes && (
                                        <motion.p
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="mt-1 text-sm text-red-600"
                                        >
                                            {errors.review_notes}
                                        </motion.p>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <motion.button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-3 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 px-3 py-2 bg-[#f2ae1d] text-white rounded-md hover:bg-[#d4941a] disabled:opacity-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {processing ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <Check size={14} />
                                        )}
                                        {hasReview ? 'Update' : 'Submit'}
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50"
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-lg border border-gray-200 max-w-sm w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full mx-auto mb-3">
                                    <Trash2 size={20} className="text-red-600" />
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 text-center mb-2">
                                    Delete Feedback?
                                </h3>
                                <p className="text-gray-600 text-sm text-center mb-4">
                                    This will permanently remove your feedback. This action cannot be undone.
                                </p>
                                <div className="flex gap-2">
                                    <motion.button
                                        type="button"
                                        onClick={() => setIsDeleteModalOpen(false)}
                                        className="flex-1 px-3 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isDeleting ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <Trash2 size={14} />
                                        )}
                                        Delete
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ClientLayout>
    );
}
