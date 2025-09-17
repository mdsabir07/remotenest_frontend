"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <motion.footer
      className="bg-white dark:bg-gray-900"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container px-6 py-12 mx-auto">
        {/* CTA Section */}
        <div className="md:flex md:-mx-3 md:items-center md:justify-between">
          <motion.h1
            className="text-xl font-semibold tracking-tight text-gray-800 md:mx-3 xl:text-2xl dark:text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Find your perfect place, work from anywhere.
          </motion.h1>

          <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/login"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm text-white duration-300 bg-gray-800 rounded-lg gap-x-3 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              <span>Click For Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </motion.a>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        {/* Links Section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Quick Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-semibold text-gray-800 dark:text-white">
              Quick Link
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <a className="footer-link" href="/">Home</a>
              <a className="footer-link" href="/about">About Us</a>
              <a className="footer-link" href="/blog">Blog</a>
              <a className="footer-link" href="/faq">FAQ</a>
            </div>
          </motion.div>

          {/* Destinations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-semibold text-gray-800 dark:text-white">
              Destinations
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <a className="footer-link" href="/destinations/europe">Europe</a>
              <a className="footer-link" href="/destinations/asia">Asia</a>
              <a className="footer-link" href="/destinations/americas">Americas</a>
              <a className="footer-link" href="/destinations/africa">Africa</a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-semibold text-gray-800 dark:text-white">
              Services
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <a className="footer-link" href="/services/booking">Booking</a>
              <a className="footer-link" href="/services/consulting">Consulting</a>
              <a className="footer-link" href="/services/support">Support</a>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="font-semibold text-gray-800 dark:text-white">
              Contact Us
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <a className="footer-link" href="tel:+8807684734978">
                +880 768 473 4978
              </a>
              <a className="footer-link" href="mailto:info@remotenest.com">
                info@remotenest.com
              </a>
              <a className="footer-link" href="/contact">Contact Form</a>
            </div>
          </motion.div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <a href="/">
            <h2 className="font-extrabold text-gray-700 text-3xl">RemoteNest</h2>
            <p className="font-bold pl-8 text-sm">Enjoy & Happy.</p>
          </a>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">
            © Copyright 2025. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {[FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="text-gray-500 hover:text-blue-600 cursor-pointer" />
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
