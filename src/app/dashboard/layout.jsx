'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useTheme } from '@/components/ThemeContext';
import Loading from '../loading';

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { status } = useSession();

    if (status === 'loading') {
        return <Loading />;
    }

    return (
        <div className="flex h-screen overflow-hidden transition-colors">
            {/* Sidebar */}
            <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="flex-1 flex flex-col ml-0 md:ml-10 h-full overflow-hidden">
                {/* Mobile Navbar */}
                <header className="flex items-center justify-between p-4 shadow-md md:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="cursor-pointer">
                        <FiMenu className="h-6 w-6" />
                    </button>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="ml-4 px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                    </button>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}