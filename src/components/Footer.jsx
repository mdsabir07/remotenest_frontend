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
        <div className="flex flex-col md:flex-row md:justify-around md:items-center gap-6">
          <motion.h1
            className="text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white text-center md:text-left"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Find your perfect place, work from anywhere.
          </motion.h1>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/login"
            className="inline-flex items-center justify-center px-4 py-2 text-sm text-white bg-gray-800 rounded-lg gap-x-3 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 mx-auto md:mx-0"
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

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* RemoteNest */}
          {/* RemoteNest */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center sm:items-start text-center sm:text-left lg:justify-center lg:pt-8"
          >
            <a
              href="/"
              className="flex flex-col items-center sm:items-start py-4 sm:py-0"
            >
              <h2 className="font-extrabold text-gray-700 text-3xl dark:text-white">
                RemoteNest
              </h2>
              <p className="font-bold text-sm mt-1 sm:mt-0 lg:pl-8">
                Enjoy & Happy.
              </p>
            </a>
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
              <a className="footer-link" href="/destinations/europe">
                Europe
              </a>
              <a className="footer-link" href="/destinations/asia">
                Asia
              </a>
              <a className="footer-link" href="/destinations/americas">
                Americas
              </a>
              <a className="footer-link" href="/destinations/africa">
                Africa
              </a>
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
              <a className="footer-link" href="/services/booking">
                Booking
              </a>
              <a className="footer-link" href="/services/consulting">
                Consulting
              </a>
              <a className="footer-link" href="/services/support">
                Support
              </a>
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
              <a className="footer-link" href="/contact">
                Contact Form
              </a>
            </div>
          </motion.div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            © Copyright 2025. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
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
