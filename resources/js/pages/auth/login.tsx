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
                <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
                    <div className="w-full max-w-md">
                        {/* Heading */}
                        <div className="mb-10 text-center">
                            <p className="text-xs uppercase tracking-[0.3em] text-[#3a3b3a]/60 mb-4">
                                Client Portal
                            </p>
                            <h1 className="text-4xl md:text-5xl font-semibold text-[#3a3b3a] tracking-tight mb-3">
                                Sign in
                            </h1>
                            <p className="text-sm text-[#3a3b3a]/60">
                                Enter your credentials to access your project dashboard.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-8"
                            autoComplete="off"
                        >
                            {/* Username */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="username"
                                    className="block text-xs font-medium uppercase tracking-[0.2em] text-[#3a3b3a]/70"
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
                                    className="w-full rounded-none border-0 border-b border-[#3a3b3a]/25 bg-transparent px-0 py-2 text-base text-[#3a3b3a] placeholder:text-[#3a3b3a]/35 focus:border-[#3a3b3a] focus:outline-none focus:ring-0 transition-colors"
                                />
                                {errors.username && (
                                    <p className="text-sm text-red-600">{errors.username}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-medium uppercase tracking-[0.2em] text-neutral-600"
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
                                    className="w-full rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-0 transition-colors"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Hidden remember always true */}
                            <input type="hidden" name="remember" value="true" />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-[#3a3b3a] bg-[#3a3b3a] px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-[#3a3b3a] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Authenticating…' : 'Sign in'}
                            </button>
                        </form>

                        {/* Info Section */}
                        <div className="mt-12 border-t border-[#3a3b3a]/10 pt-6 text-sm text-[#3a3b3a]/60">
                            <p className="mb-3 font-medium uppercase tracking-[0.2em] text-[#3a3b3a]">
                                No account?
                            </p>
                            <p className="mb-4 leading-relaxed">
                                Partner with us to receive your credentials and access real-time project tracking.
                            </p>
                            <Link
                                href="/partner-with-us"
                                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#3a3b3a] hover:text-[#f2ae1d] transition-colors"
                            >
                                <span>Become a partner</span>
                                <svg
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
