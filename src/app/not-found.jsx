// src/app/not-found.jsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useTheme } from '@/components/ThemeContext';

export default function NotFound() {
    const { theme } = useTheme(); // 'light' or 'dark'

    // Optional: ensure focus lands on the title for accessibility
    useEffect(() => {
        const el = document.getElementById('rn-404-title');
        if (el) el.focus();
    }, []);

    const isDark = theme === 'dark';

    return (
        <div
            className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-white via-gray-50 to-sky-50'
                }`}
        >
            <div
                className={`max-w-4xl mx-auto p-8 sm:p-12 ${isDark ? 'bg-gray-800/70 border-gray-700' : 'bg-white/70 border-gray-100'
                    } backdrop-blur rounded-2xl shadow-xl border`}
            >
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Illustration */}
                    <div className="w-full md:w-1/2 text-center">
                        <svg
                            className="w-64 h-64 mx-auto"
                            viewBox="0 0 512 512"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                        >
                            <rect
                                width="512"
                                height="512"
                                rx="32"
                                fill={isDark ? '#0f172a' : '#DBEAFE'}
                            />
                            <path
                                d="M160 288c0-70.7 57.3-128 128-128s128 57.3 128 128"
                                stroke={isDark ? '#60a5fa' : '#1E40AF'}
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M256 160v40"
                                stroke={isDark ? '#60a5fa' : '#1E40AF'}
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle
                                cx="256"
                                cy="320"
                                r="8"
                                fill={isDark ? '#60a5fa' : '#1E40AF'}
                            />
                            <path
                                d="M120 400h272"
                                stroke={isDark ? '#334155' : '#1E40AF'}
                                strokeWidth="8"
                                strokeLinecap="round"
                            />
                        </svg>

                        <div className={`mt-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                            Page not found (404)
                        </div>
                    </div>

                    {/* Message */}
                    <div className="w-full md:w-1/2">
                        <h1
                            id="rn-404-title"
                            tabIndex={-1}
                            className={`text-4xl sm:text-5xl font-extrabold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
                        >
                            Oops — we can't find that page
                        </h1>

                        <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            The page you are looking for might have been removed, had its name changed,
                            or is temporarily unavailable.
                        </p>

                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
                            >
                                Take me home
                            </Link>

                            <Link
                                href="/contact"
                                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md ${isDark
                                        ? 'bg-gray-700 border border-gray-600 text-gray-100 hover:bg-gray-600'
                                        : 'bg-white/80 border border-gray-200 text-slate-900 hover:bg-white'
                                    }`}
                            >
                                Contact support
                            </Link>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="search" className="sr-only">Search</label>
                            <div className="flex items-center gap-2">
                                <input
                                    id="search"
                                    name="search"
                                    type="text"
                                    placeholder="Search the site..."
                                    className={`flex-1 px-4 py-3 rounded-md border focus:outline-none focus:ring-2 ${isDark
                                            ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-400'
                                            : 'bg-white border-gray-200 text-slate-900 focus:ring-blue-400'
                                        }`}
                                />
                                <button
                                    className={`px-4 py-3 rounded-md ${isDark ? 'bg-slate-700 text-gray-100 hover:bg-slate-600' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                        }`}
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className={`mt-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Or try visiting the <Link href="/cities" className="text-blue-600 hover:underline">Cities</Link> or <Link href="/blog" className="text-blue-600 hover:underline">Blog</Link>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}