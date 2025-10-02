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
        <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            {/* Sidebar */}
            <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-0 md:ml-14 transition-all duration-300 bg-gray-100">
                {/* Mobile Navbar */}
                <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md md:hidden">
                    <button 
                    onClick={() => setSidebarOpen(true)} className='cursor-pointer'>
                        <FiMenu className="h-6 w-6" />
                    </button>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <button onClick={toggleTheme}>
                        {theme === 'dark' ? (
                            <FiSun className="h-6 w-6" />
                        ) : (
                            <FiMoon className="h-6 w-6" />
                        )}
                    </button>
                </header>

                {/* Page Content */}
                <main className="p-6 flex-grow">{children}</main>
            </div>
        </div>
    );
}