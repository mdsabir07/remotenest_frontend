'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
    FiMenu,
    FiX,
    FiSun,
    FiMoon,
    FiUser,
    FiShield,
    FiHome
} from 'react-icons/fi';
import { useTheme } from '@/components/ThemeContext';


export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { name: 'User Dashboard', href: '/dashboard/user', icon: <FiUser /> },
        { name: 'Admin Dashboard', href: '/dashboard/admin', icon: <FiShield /> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            {/* Sidebar */}
            <div className={clsx(
                "fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 p-5 space-y-6 transition-transform duration-300 ease-in-out",
                sidebarOpen ? "translate-x-0" : "-translate-x-full",
                "md:relative md:translate-x-0 md:flex md:flex-col"
            )}>
                <div className="flex items-center justify-between md:justify-start md:space-x-2">
                    <FiHome className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Dashboard</h2>
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <FiX className="h-6 w-6" />
                    </button>
                </div>

                <nav className="flex flex-col gap-2 mt-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition",
                                pathname === item.href
                                    ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                                    : ""
                            )}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto">
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-6 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    >
                        {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-0 md:ml-64 transition-all duration-300">
                {/* Mobile Navbar */}
                <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md md:hidden">
                    <button onClick={() => setSidebarOpen(true)}>
                        <FiMenu className="h-6 w-6" />
                    </button>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <button onClick={toggleTheme}>
                        {theme === 'dark' ? <FiSun className="h-6 w-6" /> : <FiMoon className="h-6 w-6" />}
                    </button>
                </header>

                {/* Page Content */}
                <main className="p-6 flex-grow">{children}</main>
            </div>
        </div>
    );
}