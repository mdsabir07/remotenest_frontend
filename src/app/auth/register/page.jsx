'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import registerAnimation from '@/assets/lottie/register.json';
import Swal from 'sweetalert2';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '', avatar: '' });
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState('');

    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const handleRegister = async (e) => {
        e.preventDefault();

        if (uploading) {
            await Swal.fire({
                icon: 'warning',
                title: 'Please wait',
                text: 'Avatar is still uploading — please wait a moment and try again.',
            });
            return;
        }

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            await Swal.fire({
                icon: 'success',
                title: 'Registration successful!',
                text: 'Please check your email to verify your account.',
                confirmButtonText: 'OK',
            });

            router.push('/auth/check-email'); // ✅ Redirect to "check your email" page
        } else {
            let data;
            try {
                data = await res.json();
            } catch {
                data = { message: 'Registration failed' };
            }

            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">

                {/* Left: Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Create Account</h2>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Avatar (file or URL)</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setPreview(URL.createObjectURL(file));

                                        if (CLOUD_NAME && UPLOAD_PRESET) {
                                            setUploading(true);
                                            const data = new FormData();
                                            data.append('file', file);
                                            data.append('upload_preset', UPLOAD_PRESET);
                                            try {
                                                const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
                                                    method: 'POST',
                                                    body: data,
                                                });
                                                const json = await res.json();
                                                if (json.secure_url) {
                                                    setForm((f) => ({ ...f, avatar: json.secure_url }));
                                                }
                                            } catch (err) {
                                                console.error('Upload failed', err);
                                            } finally {
                                                setUploading(false);
                                            }
                                        } else {
                                            setForm((f) => ({ ...f, avatar: '' }));
                                        }
                                    }}
                                    className="block"
                                />

                                <input
                                    type="text"
                                    placeholder="Or paste image URL"
                                    value={form.avatar}
                                    onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {uploading && <p className="text-sm text-gray-500 mt-2">Uploading avatar...</p>}
                            {preview || form.avatar ? (
                                <div className="mt-2">
                                    <img src={form.avatar || preview} alt="preview" className="w-24 h-24 rounded-full object-cover" />
                                </div>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className={`w-full cursor-pointer ${uploading ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded-md font-semibold transition duration-300`}
                        >
                            {uploading ? 'Uploading avatar...' : 'Register'}
                        </button>

                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
                            Already have an account? <a href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</a>
                        </p>
                    </form>
                </div>

                {/* Right: Animation */}
                <div className="w-full md:w-1/2 hidden md:block p-8">
                    <Lottie
                        animationData={registerAnimation}
                        loop={true}
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
}