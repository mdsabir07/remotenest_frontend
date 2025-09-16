'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Lottie from 'lottie-react';
import loginAnimation from '@/assets/lottie/signin.json';


export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            ...form,
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            alert("Login failed");
        }
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

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-300"
                        >
                            Login
                        </button>

                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
                            Don't have an account? <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">Register</a>
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