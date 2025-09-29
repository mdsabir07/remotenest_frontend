'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        try {
            const res = await fetch('/api/auth/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            await Swal.fire({
                icon: 'success',
                title: 'Reset link sent!',
                text: 'Please check your email to reset your password.',
            });

            router.push('/auth/login');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: err.message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">Email address</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
                    />

                    <button
                        type="submit"
                        disabled={submitting}
                        className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
                    >
                        {submitting ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}
