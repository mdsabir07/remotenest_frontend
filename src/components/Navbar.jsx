"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./ThemeContext";

const Navbar = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // avoid rendering session-dependent UI during SSR to prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Cities", path: "/cities" },
    {
      name: "Resources",
      children: [
        { name: "AI Recommender", path: "/recommender" },
        { name: "Blog", path: "/blog" },
        { name: "FAQs", path: "/faq" },
      ],
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/auth/login", guestOnly: true },
    { name: "Register", path: "/auth/register", guestOnly: true },
  ];

  // user links: top-level "User" and a "Dashboard" menu that contains Admin
  const userLinks = [
    { name: "Community", path: "/community" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  // track open dropdown on desktop and expanded items on mobile
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState({});
  const closeTimerRef = useRef(null);

  return (
    <nav className="shadow dark:shadow-md sticky top-0 z-50 transition-colors duration-300 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold text-blue-500">
            <Link href="/">RemoteNest</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {[...commonLinks, ...(mounted && session ? userLinks : [])]
              .filter((l) => !(l.guestOnly && mounted && session))
              .map((link) => {
                if (link.children) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => {
                        if (closeTimerRef.current) {
                          clearTimeout(closeTimerRef.current);
                          closeTimerRef.current = null;
                        }
                        setOpenDropdown(link.name);
                      }}
                      onMouseLeave={() => {
                        // small delay so pointer can move into the dropdown without closing
                        closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 150);
                      }}
                    >
                      {link.path ? (
                        <Link
                          href={link.path}
                          className="hover:text-blue-500 dark:hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <button className="hover:text-blue-500 dark:hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                          {link.name}
                        </button>
                      )}
                      {openDropdown === link.name && (
                        <div
                          className="absolute mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50"
                          onMouseEnter={() => {
                            if (closeTimerRef.current) {
                              clearTimeout(closeTimerRef.current);
                              closeTimerRef.current = null;
                            }
                          }}
                          onMouseLeave={() => {
                            closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 150);
                          }}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.path}
                              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-white"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                );
              })}

            {/* Logout for logged-in users */}
            {session && (
              <button
                onClick={() => signOut()}
                className="text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Logout
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 text-lg cursor-pointer transition-colors"
            >
              {theme === "light" ? (
                <span title="Switch to dark mode">🌙</span>
              ) : (
                <span title="Switch to light mode">☀️</span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2">
          {[...commonLinks, ...(session ? userLinks : [])]
            .filter((l) => !(l.guestOnly && session))
            .map((link) => {
              if (link.children) {
                const expanded = !!expandedMobile[link.name];
                return (
                  <div key={link.name}>
                    <div className="flex justify-between items-center">
                      {link.path ? (
                        <Link
                          href={link.path}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 rounded-md text-base font-medium"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <span className="block px-3 py-2 rounded-md text-base font-medium">{link.name}</span>
                      )}

                      <button
                        onClick={() => setExpandedMobile((s) => ({ ...s, [link.name]: !s[link.name] }))}
                        className="px-3"
                        aria-expanded={expanded}
                      >
                        <span>{expanded ? "−" : "+"}</span>
                      </button>
                    </div>

                    {expanded && (
                      <div className="pl-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </Link>
              );
            })}

          {session && (
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="w-full text-left text-red-500 dark:text-red-400 px-3 py-2 rounded-md text-base font-medium cursor-pointer"
            >
              Logout
            </button>
          )}

          {/* Theme toggle (mobile) */}
          <button
            onClick={toggleTheme}
            className="w-full p-3 mt-2 text-sm shadow-md"
          >
            {/* {theme === "light" ? "🌙" : "☀️"} */}
            {theme === "light" ? (
              <span title="Switch to dark mode">🌙</span>
            ) : (
              <span title="Switch to light mode">☀️</span>
            )}
          </button>
        </div>
      )}
    </nav>
  );

};

export default Navbar;