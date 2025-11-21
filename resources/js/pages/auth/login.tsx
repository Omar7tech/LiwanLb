import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

interface LoginProps {
    errors: Record<string, string>;
}

export default function Login({ errors }: LoginProps) {

    const { data, setData, post } = useForm({
        username: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login-store');
    };

    return (
        <>
            <Head title="Login To Your Account" />
            <AppLayout>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder='username'
                        value={data.username}
                        onChange={e => setData('username', e.target.value)}
                    />
                    {errors.username && <div>{errors.username}</div>}

                    <input
                        type="password"
                        name="password"
                        placeholder='password'
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                    {errors.password && <div>{errors.password}</div>}

                    <button type="submit">Login</button>
                </form>
            </AppLayout>
        </>
    );
}
