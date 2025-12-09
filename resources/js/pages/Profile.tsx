import ClientLayout from '@/layouts/ClientLayout';
import { SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

function Profile() {
	const { auth } = usePage<SharedData>().props;
	const [success, setSuccess] = useState<string | null>(null);

	const { data, setData, put, processing, errors } = useForm({
		name: auth.user.name ?? '',
		username: (auth.user as any).username ?? '',
		password: '',
		password_confirmation: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSuccess(null);
		put('/dashboard/profile', {
			onSuccess: () => setSuccess('Profile updated successfully.'),
		});
	};

	return (
		<ClientLayout>
			<Head title="Profile" />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<h1 className="text-2xl font-semibold tracking-tight text-[#3a3b3a] mb-4">
					Profile settings
				</h1>

				{success && (
					<p className="mb-4 text-sm text-green-700">
						{success}
					</p>
				)}

				<form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
					<div className="space-y-1">
						<label className="block text-sm font-medium text-gray-700">Name</label>
						<input
							type="text"
							value={data.name}
							onChange={(e) => setData('name', e.target.value)}
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
						/>
						{errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
					</div>

					<div className="space-y-1">
						<label className="block text-sm font-medium text-gray-700">Username</label>
						<input
							type="text"
							value={data.username}
							onChange={(e) => setData('username', e.target.value)}
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
						/>
						{errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
					</div>

					<div className="border-t border-gray-200 pt-4 mt-4">
						<h2 className="text-sm font-semibold text-gray-800 mb-2">Change password</h2>
						<p className="text-xs text-gray-500 mb-3">Leave blank if you don't want to change your password.</p>

						<div className="space-y-1">
							<label className="block text-sm font-medium text-gray-700">New password</label>
							<input
								type="password"
								value={data.password}
								onChange={(e) => setData('password', e.target.value)}
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
							/>
							{errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
						</div>

						<div className="space-y-1 mt-3">
							<label className="block text-sm font-medium text-gray-700">Confirm new password</label>
							<input
								type="password"
								value={data.password_confirmation}
								onChange={(e) => setData('password_confirmation', e.target.value)}
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
							/>
						</div>
					</div>

					<div className="pt-2">
						<button
							type="submit"
							disabled={processing}
							className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black disabled:opacity-70"
						>
							Save changes
						</button>
					</div>
				</form>
			</motion.div>
		</ClientLayout>
	);
}

export default Profile;