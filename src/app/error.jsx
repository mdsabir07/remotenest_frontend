'use client';

import { useEffect } from 'react';
import { useTheme } from '@/components/ThemeContext';

export default function GlobalError({ error, reset }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        // Log to console and optionally send to external logging service
        console.error('Global error boundary caught:', error);
        // Example: window.fetch('/api/log', { method: 'POST', body: JSON.stringify({ error: String(error) }) })
    }, [error]);

    // Create a github issue link with prefilled title/body (optional)
    const repoIssueUrl = (() => {
        try {
            const title = encodeURIComponent(`Error: ${error?.message?.slice(0, 120) || 'Unhandled error'}`);
            const body = encodeURIComponent(`Stack:\n\n\`\`\`\n${error?.stack || 'no stack available'}\n\`\`\`\n\nSteps to reproduce (if known):\n\n1. \n2. `);
            return `https://github.com/mdsabir07/remotenest_frontend/issues/new?title=${title}&body=${body}`;
        } catch {
            return '#';
        }
    })();

    return (
        <div className={`${isDark ? 'bg-slate-900 text-gray-100' : 'bg-white text-slate-900'} min-h-screen flex items-center justify-center p-6`}>
            <div className={`${isDark ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-100'} max-w-3xl w-full rounded-lg shadow-xl border p-6`}>
                <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                        <div className={`p-3 rounded-md ${isDark ? 'bg-red-800' : 'bg-red-100'}`}>
                            <svg className={`h-6 w-6 ${isDark ? 'text-red-300' : 'text-red-700'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                <path fillRule="evenodd" d="M8.257 3.099c.763-1.36 2.722-1.36 3.485 0l6.518 11.636A1.5 1.5 0 0116.985 17H3.015a1.5 1.5 0 01-1.275-2.265L8.257 3.1zM9 7a1 1 0 012 0v3a1 1 0 11-2 0V7zm1 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : ''}`}>Something went wrong</h2>
                        <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            An unexpected error occurred while loading this part of the app. You can try again or report the issue.
                        </p>

                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => reset()}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                            >
                                Retry
                            </button>

                            <a
                                href={repoIssueUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${isDark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-white border border-gray-200 text-slate-900 hover:bg-gray-50'} inline-flex items-center gap-2 px-4 py-2 rounded`}
                            >
                                Report issue
                            </a>
                        </div>

                        <details className={`mt-4 p-3 rounded ${isDark ? 'bg-gray-900/40 text-gray-200' : 'bg-gray-50 text-gray-700'}`}>
                            <summary className="cursor-pointer">Error details</summary>
                            <pre className="mt-2 text-xs whitespace-pre-wrap">{String(error?.stack || error?.message || 'No details')}</pre>
                        </details>

                    </div>
                </div>
            </div>
        </div>
    );
}