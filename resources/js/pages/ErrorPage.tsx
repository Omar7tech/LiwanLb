import React from 'react';

interface ErrorPageProps {
    status: number;
}

export default function ErrorPage({ status }: ErrorPageProps) {
    const errorData = {
        400: {
            title: 'Bad Request',
            description: 'The server could not understand the request due to invalid syntax.',
            color: 'gray',
            bgColor: 'bg-gray-500',
            hoverBgColor: 'hover:bg-gray-600',
            blobColors: ['gray-200', 'gray-300', 'gray-100']
        },
        401: {
            title: 'Unauthorized',
            description: 'You need to log in to access this page.',
            color: 'blue',
            bgColor: 'bg-blue-500',
            hoverBgColor: 'hover:bg-blue-600',
            blobColors: ['blue-200', 'blue-300', 'blue-100']
        },
        403: {
            title: 'Forbidden',
            description: 'Sorry, you are forbidden from accessing this page.',
            color: 'yellow',
            bgColor: 'bg-yellow-500',
            hoverBgColor: 'hover:bg-yellow-600',
            blobColors: ['yellow-200', 'yellow-300', 'yellow-100']
        },
        404: {
            title: 'Page Not Found',
            description: 'Oops! The page you\'re looking for doesn\'t exist. It might have been moved or deleted.',
            color: 'red',
            bgColor: 'bg-red-500',
            hoverBgColor: 'hover:bg-red-600',
            blobColors: ['red-200', 'red-300', 'red-100']
        },
        405: {
            title: 'Method Not Allowed',
            description: 'The request method is not allowed for this URL.',
            color: 'indigo',
            bgColor: 'bg-indigo-500',
            hoverBgColor: 'hover:bg-indigo-600',
            blobColors: ['indigo-200', 'indigo-300', 'indigo-100']
        },
        408: {
            title: 'Request Timeout',
            description: 'The server timed out waiting for the request.',
            color: 'pink',
            bgColor: 'bg-pink-500',
            hoverBgColor: 'hover:bg-pink-600',
            blobColors: ['pink-200', 'pink-300', 'pink-100']
        },
        419: {
            title: 'Page Expired',
            description: 'The page expired, please try again.',
            color: 'amber',
            bgColor: 'bg-amber-500',
            hoverBgColor: 'hover:bg-amber-600',
            blobColors: ['amber-200', 'amber-300', 'amber-100']
        },
        422: {
            title: 'Validation Error',
            description: 'The submitted data failed validation.',
            color: 'rose',
            bgColor: 'bg-rose-500',
            hoverBgColor: 'hover:bg-rose-600',
            blobColors: ['rose-200', 'rose-300', 'rose-100']
        },
        429: {
            title: 'Too Many Requests',
            description: 'You have made too many requests. Please try again later.',
            color: 'orange',
            bgColor: 'bg-orange-500',
            hoverBgColor: 'hover:bg-orange-600',
            blobColors: ['orange-200', 'orange-300', 'orange-100']
        },
        500: {
            title: 'Server Error',
            description: 'Something went wrong on our end. We\'re working to fix it. Please try again later.',
            color: 'purple',
            bgColor: 'bg-purple-500',
            hoverBgColor: 'hover:bg-purple-600',
            blobColors: ['purple-200', 'purple-300', 'purple-100']
        },
        502: {
            title: 'Bad Gateway',
            description: 'The server received an invalid response from the upstream server.',
            color: 'cyan',
            bgColor: 'bg-cyan-500',
            hoverBgColor: 'hover:bg-cyan-600',
            blobColors: ['cyan-200', 'cyan-300', 'cyan-100']
        },
        503: {
            title: 'Service Unavailable',
            description: 'We\'re currently performing updates to improve your experience. We\'ll be back shortly.',
            color: 'slate',
            bgColor: 'bg-slate-500',
            hoverBgColor: 'hover:bg-slate-600',
            blobColors: ['slate-100', 'slate-200', 'slate-50']
        },
        504: {
            title: 'Gateway Timeout',
            description: 'The server acting as a gateway did not receive a timely response.',
            color: 'teal',
            bgColor: 'bg-teal-500',
            hoverBgColor: 'hover:bg-teal-600',
            blobColors: ['teal-200', 'teal-300', 'teal-100']
        }
    };

    const currentError = errorData[status as keyof typeof errorData] || {
        title: 'Error',
        description: 'An error occurred.',
        color: 'gray',
        bgColor: 'bg-gray-500',
        hoverBgColor: 'hover:bg-gray-600',
        blobColors: ['gray-200', 'gray-300', 'gray-100']
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className={`absolute -top-20 -left-20 w-40 h-40 sm:w-64 sm:h-64 bg-${currentError.blobColors[0]} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob`}></div>
                <div className={`absolute top-0 -right-20 w-40 h-40 sm:w-64 sm:h-64 bg-${currentError.blobColors[1]} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000`}></div>
                <div className={`absolute -bottom-32 left-20 w-40 h-40 sm:w-64 sm:h-64 bg-${currentError.blobColors[2]} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000`}></div>
            </div>

            <div className="bg-white p-8 sm:p-12 md:p-16 text-center max-w-md w-full z-10">
                <div className="mb-8">
                    <img src="/images/logo.png" alt="Logo" className="h-12 sm:h-14 w-auto mx-auto mb-8 opacity-80" />
                </div>
                
                <div className="space-y-6">
                    <div className={`text-5xl sm:text-6xl font-light text-${currentError.color}-500`}>{status}</div>
                    <h2 className="text-xl sm:text-2xl font-medium text-gray-900">{currentError.title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                        {currentError.description}
                    </p>
                </div>

                <div className="mt-10">
                    <a href="/" className={`inline-flex items-center text-${currentError.color}-600 hover:text-${currentError.color}-700 font-medium text-sm transition-colors duration-150`}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to home
                    </a>
                </div>
            </div>

            <style>{`
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
            `}</style>
        </div>
    );
}
