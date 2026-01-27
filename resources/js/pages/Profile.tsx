import ClientLayout from '@/layouts/ClientLayout';
import { SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { validatePhoneNumber, formatPhoneInput, getPhoneExamples } from '@/utils/phoneValidation';

function Profile() {
	const { auth } = usePage<SharedData>().props;
	const [success, setSuccess] = useState<string | null>(null);
	const [phoneError, setPhoneError] = useState<string | null>(null);
	const [phoneInput, setPhoneInput] = useState<string>((auth.user?.phoneNumber as string) || '');
	const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);

	const { data, setData, put, processing, errors } = useForm<{
		name: string;
		username: string;
		phoneNumber: string;
		password: string;
		password_confirmation: string;
	}>({
		name: auth.user.name ?? '',
		username: (auth.user?.username as string) ?? '',
		phoneNumber: (auth.user.phoneNumber as string) || '',
		password: '',
		password_confirmation: '',
	});

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const formatted = formatPhoneInput(value, phoneInput);
		setPhoneInput(formatted);
		
		// Validate phone number immediately on change
		if (formatted.trim()) {
			const validation = validatePhoneNumber(formatted);
			setIsPhoneValid(validation.isValid);
			setPhoneError(validation.isValid ? null : validation.error || null);
			if (validation.isValid && validation.formatted) {
				setData('phoneNumber', validation.formatted);
			} else {
				setData('phoneNumber', formatted || '');
			}
		} else {
			setIsPhoneValid(false);
			setPhoneError(null);
			setData('phoneNumber', '');
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSuccess(null);
		
		// Final phone validation before submit
		if (data.phoneNumber) {
			const validation = validatePhoneNumber(data.phoneNumber);
			if (!validation.isValid) {
				setPhoneError(validation.error || 'Invalid phone number format');
				return;
			}
		}
		
		put('/dashboard/profile', {
			onSuccess: () => {
				setSuccess('Profile updated successfully.');
				setPhoneError(null);
			},
			onError: (errors) => {
				if (errors.phoneNumber) {
					setPhoneError(errors.phoneNumber as string);
				}
			}
		});
	};

	return (
		<ClientLayout>
			<Head title="Profile" />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className='p-4 md:p-8'
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

					<div className="space-y-1">
						<label className="block text-sm font-medium text-gray-700">Phone Number</label>
						<input
							type="tel"
							value={phoneInput}
							onChange={handlePhoneChange}
							placeholder="+1 (555) 123-4567"
							className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
								phoneError ? 'border-red-300' : !phoneInput.trim() || isPhoneValid ? 'border-gray-300' : 'border-yellow-300'
							}`}
						/>
						<div className="mt-1">
							{phoneError && (
								<p className="text-xs text-red-600 flex items-center gap-1">
									<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
									</svg>
									{phoneError}
								</p>
							)}
							{phoneInput.trim() && !phoneError && (
								<p className="text-xs text-green-600 flex items-center gap-1">
									<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
									</svg>
									Valid phone number
								</p>
							)}
						</div>
						<div className="mt-2 p-3 bg-gray-50 rounded-md">
							<p className="text-xs text-gray-600 mb-1">International format required:</p>
							<div className="text-xs text-gray-500 space-y-1">
								{getPhoneExamples().slice(0, 3).map((example, index) => (
									<div key={index} className="flex items-center gap-1">
										<span className="text-gray-400">•</span>
										<span>{example}</span>
									</div>
								))}
							</div>
						</div>
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