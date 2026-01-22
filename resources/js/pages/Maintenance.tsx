import React from 'react';

export default function Maintenance() {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-64 sm:h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-20 w-40 h-40 sm:w-64 sm:h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-20 w-40 h-40 sm:w-64 sm:h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full z-10 border border-white/20">
                <div className="mb-6 sm:mb-8 flex justify-center">
                    <img src="/images/logo.png" alt="Logo" className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-md" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">Under Maintenance</h1>
                
                <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                    We are currently improving our website to serve you better. <br className="hidden sm:inline" />
                    We will be back shortly!
                </p>

                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">System Update in Progress</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-200 mt-3 sm:mt-4 overflow-hidden">
                        <div className="bg-amber-500 h-1.5 rounded-full animate-progress" style={{width: '45%'}}></div>
                    </div>
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
                .animate-progress {
                    animation: progress 2s ease-in-out infinite;
                }
                @keyframes progress {
                    0% { width: 0%; margin-left: 0; }
                    50% { width: 100%; margin-left: 0; }
                    100% { width: 0%; margin-left: 100%; }
                }
            `}</style>
        </div>
    );
}
