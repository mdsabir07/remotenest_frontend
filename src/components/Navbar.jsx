"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./ThemeContext";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Cities", path: "/ExploreCities" },
    { name: "AI Recommender", path: "/recommender" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  const userLinks = [
    { name: "Community", path: "/community" },
    { name: "Blog", path: "/blog" },
    { name: "User Dashboard", path: "/dashboard/user" },
    { name: "Admin Dashboard", path: "/dashboard/admin" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            <Link href="/">RemoteNest</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {[...commonLinks, ...(session ? userLinks : [])].map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}

            {/* Logout for logged-in users */}
            {session && (
              <button
                onClick={() => signOut()}
                className="text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-4 px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-900">
          {[...commonLinks, ...(session ? userLinks : [])].map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
            >
              {link.name}
            </Link>
          ))}

          {session && (
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="w-full text-left text-red-500 dark:text-red-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          )}

          {/* Theme toggle (mobile) */}
          <button
            onClick={toggleTheme}
            className="w-full px-3 py-2 mt-2 border text-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;