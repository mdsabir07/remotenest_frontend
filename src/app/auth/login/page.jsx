'use client';

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Lottie from 'lottie-react';
import loginAnimation from '@/assets/lottie/signin.json';
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const [otpRequired, setOtpRequired] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);

    // Handle email/password login (step 1)
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            callbackUrl,
            ...form,
        });

        if (res.ok) {
            await Swal.fire({
                icon: 'success',
                title: 'Login successful',
                text: 'Redirecting...',
                confirmButtonText: 'OK',
            });
            router.push(res.url || callbackUrl);
        } else {
            switch (res.error) {
                case "OTP required":
                    setOtpRequired(true);
                    await Swal.fire({
                        icon: 'info',
                        title: 'OTP Required',
                        text: 'Please enter the OTP sent to your email.',
                        confirmButtonText: 'OK',
                    });
                    break;

                case 'Email not verified':
                    await Swal.fire({
                        icon: 'warning',
                        title: 'Email Not Verified',
                        text: 'Please check your inbox for the verification email.',
                        confirmButtonText: 'OK',
                    });
                    break;

                default:
                    await Swal.fire({
                        icon: 'error',
                        title: 'Login failed',
                        text: res.error || 'Invalid credentials',
                    });
            }
        }

        setLoading(false);
    };

    // Handle OTP login (step 2)
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setOtpLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            callbackUrl,
            email: form.email,
            password: form.password,
            otp,
        });

        if (res.ok) {
            await Swal.fire({
                icon: 'success',
                title: 'Login successful',
                text: 'Redirecting...',
                confirmButtonText: 'OK',
            });
            router.push(res.url || callbackUrl);
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Login failed after OTP',
                text: res.error || 'Invalid OTP or session expired.',
            });
        }

        setOtpLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 lg:px-0">
            <div className="w-full max-w-5xl shadow-lg rounded overflow-hidden flex flex-col md:flex-row">

                {/* Left: Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold mb-6">Login to Your Account</h2>

                    {!otpRequired ? (
                        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="text-right">
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-blue-600 hover:text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition duration-300 cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4" autoComplete="off">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Enter OTP</label>
                                <input
                                    type="text"
                                    placeholder="6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition duration-300 cursor-pointer"
                                disabled={otpLoading}
                            >
                                {otpLoading ? 'Verifying OTP...' : 'Verify OTP'}
                            </button>
                        </form>
                    )}

                    {!otpRequired && (
                        <>
                            {/* Social login */}
                            <div className="relative flex items-center justify-center py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative px-4 text-sm">
                                    Or continue with
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={() => signIn("google", { callbackUrl })}
                                    className="cursor-pointer flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded transition"
                                >
                                    <FcGoogle className="text-xl" />
                                    <span className="text-sm font-medium">Continue with Google</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => signIn("github", { callbackUrl })}
                                    className="cursor-pointer flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded transition"
                                >
                                    <FaGithub className="text-xl" />
                                    <span className="text-sm font-medium">Continue with GitHub</span>
                                </button>
                            </div>

                            <p className="text-sm text-center mt-4">
                                Don't have an account? <a href="/auth/register" className="text-blue-500 hover:text-blue-600 font-bold hover:underline">Register</a>
                            </p>
                        </>
                    )}
                </div>

                {/* Right: Lottie animation */}
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