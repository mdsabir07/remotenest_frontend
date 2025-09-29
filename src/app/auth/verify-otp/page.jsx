'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function VerifyOtpPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get('email');
    const [otp, setOtp] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Redirect if email is missing
    useEffect(() => {
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Access',
                text: 'Missing email in URL. Redirecting...',
            }).then(() => router.push('/auth/login'));
        }
    }, [email, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otp || otp.length !== 6) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid OTP',
                text: 'Please enter a valid 6-digit OTP.',
            });
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'OTP verification failed');

            await Swal.fire({
                icon: 'success',
                title: 'OTP Verified!',
                text: 'Your email has been verified.',
            });

            router.push('/auth/login');
        } catch (err) {
            console.error('OTP Verification Error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Verification Failed',
                text: err.message || 'Something went wrong. Please try again.',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                    Verify OTP
                </h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
                        Enter the 6-digit OTP sent to your email
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d{6}"
                        maxLength={6}
                        required
                        value={otp}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) setOtp(val);
                        }}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300 ${submitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {submitting ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
}