'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import registerAnimation from '@/assets/lottie/register.json';
import Swal from 'sweetalert2';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            await Swal.fire({
                icon: 'success',
                title: 'Registration successful!',
                text: 'You can now login.',
                confirmButtonText: 'OK',
            });
            router.push('/login');
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

                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-300"
                        >
                            Register
                        </button>

                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
                            Already have an account? <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</a>
                        </p>
                    </form>
                </div>

                {/* Right: Image */}
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