"use client";
import { useState } from "react";
import { FaBell } from "react-icons/fa6";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function NotificationBell() {
    const [open, setOpen] = useState(false);
    const { data: notifications, error, isLoading, mutate } = useSWR(
        "/api/notifications",
        fetcher,
        {
            refreshInterval: 10000, // fetch every 10 seconds instead of 5
            revalidateOnFocus: false, // don’t trigger on window focus
        }
    );

    const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

    const markAllAsRead = async () => {
        const unreadIds = notifications?.filter((n) => !n.isRead).map((n) => n._id);
        if (!unreadIds?.length) return;

        try {
            await fetch("/api/notifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: unreadIds }),
            });
            mutate(); // revalidate after marking read
        } catch (err) {
            console.error("Failed to mark as read:", err);
        }
    };

    const toggleDropdown = () => setOpen((prev) => !prev);

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="relative p-2 cursor-pointer"
            >
                <FaBell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50 bg-white dark:bg-gray-900">
                    <div className="p-3 border-b dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
                        <button
                            onClick={markAllAsRead}
                            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                        >
                            Mark all as read
                        </button>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                        {isLoading && <p className="p-3 text-sm text-gray-500 text-center dark:text-gray-400">Loading...</p>}
                        {error && <p className="p-3 text-sm text-red-500 text-center dark:text-red-400">Error loading notifications</p>}
                        {!isLoading && notifications?.length === 0 && (
                            <p className="p-3 text-sm text-gray-500 text-center dark:text-gray-400">No notifications</p>
                        )}
                        {notifications?.map((n) => (
                            <div
                                key={n._id}
                                className={`p-3 border-b dark:border-gray-700 ${!n.isRead ? "bg-blue-50 dark:bg-gray-700/50" : ""}`}
                            >
                                <p className="font-medium text-gray-800 dark:text-gray-100">{n.title}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{n.message}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>

            )}
        </div>
    );
}