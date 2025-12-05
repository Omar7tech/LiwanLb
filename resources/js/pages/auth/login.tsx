import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';

interface LoginProps {
    errors: Record<string, string>;
}

export default function Login({ errors }: LoginProps) {

    const { data, setData, post, processing } = useForm({
        username: '',
        password: '',
        remember: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login-store', {
            onFinish: () => setData('password', ''), 
        });
    };

    return (
        <>
            <Head title="Login" />

            <AppLayout>
                <div className="min-h-[calc(100vh-80px)] flex">
                    {/* Left Side - Typography Hero (Desktop Only) */}
                    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-[#3a3b3a] to-[#2a2b2a]">
                        <div className="absolute inset-0 bg-[url('/images/heroimage.jpg')] bg-cover bg-center opacity-10"></div>
                        
                        {/* Large Typography */}
                        <div className="relative z-10 flex flex-col justify-between p-16 text-white h-full">
                            <div>
                                <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
                                    Client Portal
                                </div>
                                <h2 className="text-7xl font-bold mb-6 leading-[0.95] tracking-tight">
                                    Welcome<br/>Back
                                </h2>
                            </div>
                            
                            <div className="space-y-8">
                                <div className="border-l-2 border-[#f2ae1d] pl-6">
                                    <p className="text-2xl font-light leading-relaxed text-white/90">
                                        Track your project.<br/>
                                        Monitor progress.<br/>
                                        Stay connected.
                                    </p>
                                </div>
                                
                                <div className="text-sm text-white/40 font-light">
                                    Secure access to your personalized dashboard
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:px-20">
                        <div className="w-full max-w-lg">
                            <div className="mb-16">
                                <h1 className="text-6xl md:text-7xl font-bold text-[#3a3b3a] mb-6 leading-[0.95] tracking-tight">
                                    Sign In
                                </h1>
                                <div className="w-16 h-0.5 bg-[#3a3b3a]"></div>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-8"
                                autoComplete="off"
                            >
                                {/* Username */}
                                <div className="group">
                                    <label 
                                        htmlFor="username" 
                                        className="block text-xs uppercase tracking-[0.2em] text-[#3a3b3a]/60 mb-3 font-medium"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        placeholder="Enter username"
                                        required
                                        autoComplete="username"
                                        value={data.username}
                                        onChange={e => setData('username', e.target.value)}
                                        className="w-full px-0 py-3 border-0 border-b-2 border-[#3a3b3a]/20 focus:border-[#3a3b3a] focus:outline-none transition-colors duration-300 text-lg text-[#3a3b3a] placeholder:text-[#3a3b3a]/30 bg-transparent"
                                    />
                                    {errors.username && (
                                        <p className="text-red-600 text-sm mt-3 font-light">{errors.username}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="group">
                                    <label 
                                        htmlFor="password" 
                                        className="block text-xs uppercase tracking-[0.2em] text-[#3a3b3a]/60 mb-3 font-medium"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        required
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full px-0 py-3 border-0 border-b-2 border-[#3a3b3a]/20 focus:border-[#3a3b3a] focus:outline-none transition-colors duration-300 text-lg text-[#3a3b3a] placeholder:text-[#3a3b3a]/30 bg-transparent"
                                    />
                                    {errors.password && (
                                        <p className="text-red-600 text-sm mt-3 font-light">{errors.password}</p>
                                    )}
                                </div>

                                {/* Hidden remember always true */}
                                <input type="hidden" name="remember" value="true" />

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group w-full flex justify-between items-center py-5 px-8 bg-[#3a3b3a] text-white font-medium hover:bg-[#f2ae1d] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-12"
                                >
                                    <span className="text-lg tracking-wide">
                                        {processing ? "Authenticating..." : "Sign In"}
                                    </span>
                                    {!processing && (
                                        <svg 
                                            className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    )}
                                    {processing && (
                                        <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    )}
                                </button>
                            </form>

                            {/* Info Section */}
                            <div className="mt-20 pt-12 border-t border-[#3a3b3a]/10">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm uppercase tracking-[0.2em] text-[#3a3b3a] mb-3 font-medium">
                                            No Account?
                                        </h3>
                                        <p className="text-base text-[#3a3b3a]/70 font-light leading-relaxed mb-4">
                                            Partner with us to receive your credentials and access real-time project tracking.
                                        </p>
                                        <Link
                                            href="/partner-with-us"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-[#3a3b3a] hover:text-[#f2ae1d] transition-colors duration-200 group/link"
                                        >
                                            <span className="uppercase tracking-wider">Become a Partner</span>
                                            <svg 
                                                className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-200" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
