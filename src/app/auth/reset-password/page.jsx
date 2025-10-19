'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            Swal.fire({
                icon: 'error',
                title: 'Passwords do not match',
            });
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Something went wrong');

            await Swal.fire({
                icon: 'success',
                title: 'Password reset successful!',
                text: 'You can now log in with your new password.',
            });

            router.push('/auth/login');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: err.message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">Invalid or missing token</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 lg:px-0">
            <div className="w-full max-w-md p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm">New Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
                    />

                    <label className="block mb-2 text-sm">Confirm Password</label>
                    <input
                        type="password"
                        required
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
                    />

                    <button
                        type="submit"
                        disabled={submitting}
                        className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
                    >
                        {submitting ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
