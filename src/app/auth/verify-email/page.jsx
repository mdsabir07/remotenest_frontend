'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            Swal.fire('Error', 'Verification token missing', 'error');
            setLoading(false);
            return;
        }

        const verifyEmail = async () => {
            try {
                // Use GET request with token in query string
                const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Verification failed');
                }

                await Swal.fire('Success', 'Email verified successfully!', 'success');
                router.push('/auth/login');
            } catch (err) {
                Swal.fire('Error', err.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [token, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow text-center">
                {loading ? <p>Verifying your email...</p> : <p>Please wait...</p>}
            </div>
        </div>
    );
}