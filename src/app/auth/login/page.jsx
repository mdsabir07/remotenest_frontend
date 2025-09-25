'use client';

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Lottie from 'lottie-react';
import loginAnimation from '@/assets/lottie/signin.json';
import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            callbackUrl,
            ...form,
        });

        if (res.ok) {
            // If the login is successful
            await Swal.fire({
                icon: 'success',
                title: 'Login successful',
                text: 'Redirecting...',
                confirmButtonText: 'OK',
            });
            router.push(res.url || callbackUrl);
        } else {
            // If login fails, check if the user is unverified
            if (res.error === 'Email not verified') {
                await Swal.fire({
                    icon: 'warning',
                    title: 'Email Not Verified',
                    text: 'Please check your inbox for the verification email.',
                    confirmButtonText: 'OK',
                });
            } else {
                // For other login errors
                await Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: res.error || 'Invalid credentials',
                });
            }
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">

                {/* Left: Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Login to Your Account</h2>

                    <form onSubmit={handleLogin} className="space-y-4">
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

                        <div className="text-right">
                            <a
                                href="/auth/forgot-password"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-300 cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        {/* Social login */}
                        <div className="relative flex items-center justify-center py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <div className="relative px-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm">
                                Or continue with
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={() => signIn("google", { callbackUrl })}
                                className="cursor-pointer flex items-center justify-center gap-3 w-full border border-gray-300 dark:border-gray-600 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                <span className="text-xl"><FcGoogle /></span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Continue with Google</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => signIn("github", { callbackUrl })}
                                className="cursor-pointer flex items-center justify-center gap-3 w-full border border-gray-300 dark:border-gray-600 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                <span className="text-xl text-gray-700 dark:text-white"><FaGithub /></span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Continue with GitHub</span>
                            </button>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
                            Don't have an account? <a href="/auth/register" className="text-blue-600 dark:text-blue-400 hover:underline">Register</a>
                        </p>
                    </form>
                </div>

                {/* Right: Image */}
                <div className="w-full md:w-1/2 hidden md:block p-8">
                    <Lottie
                        animationData={loginAnimation}
                        loop={true}
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
}