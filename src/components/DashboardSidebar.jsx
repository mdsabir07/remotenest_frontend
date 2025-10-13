'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import {
    FiSun,
    FiMoon,
    FiShield,
    FiUser,
    FiMapPin,
    FiInbox,
    FiUsers,
    FiHome,
    FiX,
    FiPlusSquare,
    FiFileText,
    FiCalendar,
} from 'react-icons/fi';
import { useTheme } from './ThemeContext';

export default function DashboardSidebar({ sidebarOpen, setSidebarOpen }) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { theme, toggleTheme } = useTheme();

    const role = session?.user?.role;

    const navItems = [
        {
            name: 'Admin',
            path: '/dashboard/admin',
            icon: <FiShield />,
            roles: ['admin'],
        },
        {
            name: 'User',
            path: '/dashboard/user',
            icon: <FiUser />,
            roles: ['admin', 'user'],
        },
        {
            name: 'Add city',
            path: '/dashboard/add-city',
            icon: <FiMapPin />,
            roles: ['admin', 'user'],
        },
        {
            name: 'City submissions',
            path: '/dashboard/admin/submissions',
            icon: <FiInbox />,
            roles: ['admin'],
        },
        {
            name: 'Add blog',
            path: '/dashboard/blog/create',
            icon: <FiPlusSquare />,
            roles: ['admin', 'user'],
        },
        {
            name: 'Blogs',
            path: '/dashboard/admin/blogs',
            icon: <FiFileText />,
            roles: ['admin'],
        },
        {
            name: 'Users',
            path: '/dashboard/admin/users',
            icon: <FiUsers />,
            roles: ['admin'],
        },
        {
            name: 'My bookings',
            path: '/dashboard/bookings',
            icon: <FiCalendar />,
            roles: ['admin', 'user'],
        },
    ];

    const filteredNavItems = navItems.filter((item) =>
        item.roles.includes(role)
    );

    return (
        <div
            className={clsx(
                'fixed top-0 left-0 z-30 w-64 h-full transform p-5 space-y-6 transition-transform duration-300 ease-in-out',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full',
                'md:relative md:translate-x-0 md:flex md:flex-col md:h-full'
            )}
        >
            <div className="flex items-center justify-between md:justify-start md:space-x-2">
                <FiHome className="w-6 h-6" />
                <h2 className="text-xl font-bold">Dashboard</h2>
                <button className="md:hidden cursor-pointer" onClick={() => setSidebarOpen(false)}>
                    <FiX className="h-6 w-6" />
                </button>
            </div>

            <nav className="flex flex-col gap-2 mt-6">
                {filteredNavItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={clsx(
                            'flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition',
                            pathname === item.path
                                ? 'bg-gray-200 dark:bg-gray-700 font-semibold'
                                : ''
                        )}
                    >
                        {item.icon}
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="mt-auto space-y-2">
                {/* dashboard to home */}
                <Link href="/" className='flex items-center justify-center gap-2 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                    Go to Home
                </Link>
                <button
                    onClick={toggleTheme}
                    className="w-full px-3 py-2 cursor-pointer rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>

                {role && (
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Role: {role}
                    </div>
                )}
            </div>
        </div>
    );
}