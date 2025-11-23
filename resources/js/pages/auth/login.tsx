import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

interface LoginProps {
    errors: Record<string, string>;
}

export default function Login({ errors }: LoginProps) {

    const { data, setData, post, processing } = useForm({
        username: '',
        password: '',
        remember: true, // always remember
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login-store', {
            onFinish: () => setData('password', ''), // clear password
        });
    };

    return (
        <>
            <Head title="Login" />

            <AppLayout>
                <div className="flex justify-center items-center h-[70vh]">

                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-sm space-y-5"
                        autoComplete="off"
                    >
                        <h2 className="text-center text-2xl font-bold text-[#3a3b3a]">
                            Login
                        </h2>

                        {/* Username */}
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                                autoComplete="username"
                                value={data.username}
                                onChange={e => setData('username', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f2ae1d] focus:border-[#f2ae1d] text-[#3a3b3a]"
                            />
                            {errors.username && (
                                <p className="text-red-600 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                autoComplete="current-password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f2ae1d] focus:border-[#f2ae1d] text-[#3a3b3a]"
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Hidden remember always true */}
                        <input type="hidden" name="remember" value="true" />

                        {/* Submit Button */}
                        <button
    type="submit"
    disabled={processing}
    className="w-full flex justify-center items-center gap-2 py-2 bg-[#f2ae1d] text-white font-bold rounded-lg hover:bg-[#d89c19] transition disabled:opacity-70"
>
    {processing ? (
        <>
            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Logging in...
        </>
    ) : (
        "Login"
    )}
</button>
                    </form>

                </div>
            </AppLayout>
        </>
    );
}
