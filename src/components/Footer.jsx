"use client"
import Link from "next/link";
import { FaGithub, FaLinkedin, FaStackOverflow, FaWordpress } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-0 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <div className="text-2xl font-bold mb-4 text-blue-500">
            <Link href="/">RemoteNest</Link>
          </div>
          <p className="text-sm leading-relaxed">
            Discover the world's best cities for remote work and travel.
            Compare cost, internet speed, lifestyle, and community insights
            to find your next destination.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-600"> Home</Link></li>
            <li><Link href="/cities" className="hover:text-blue-600"> Cities</Link></li>
            <li><Link href="/blog" className="hover:text-blue-600"> Blog</Link></li>
            <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600"> Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:text-blue-600"> FAQs</Link></li>
            <li><Link href="/" className="hover:text-blue-600"> Privacy Policy</Link></li>
            <li><Link href="/" className="hover:text-blue-600"> Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Join Newsletter</h3>
          <p className="text-sm mb-3">
            Subscribe to get the latest updates on top cities and travel tips.
          </p>
          <div className="flex flex-row">
            <input type="text" placeholder="example@email.com" className="w-3/5 p-2 rounded-l-sm border border-blue-500 focus:outline-none sm:w-2/3" />
            <button type="button" className="w-2/5 p-2 font-semibold text-white cursor-pointer rounded-r-sm sm:w-1/3 bg-blue-500 hover:bg-blue-600">Subscribe</button>
          </div>


          {/* Social Links */}
          <div className="flex space-x-4 mt-5 text-xl">
            <a href="https://github.com/mdsabir07" target="_blank" className="hover:text-blue-600"><FaGithub /></a>
            <a href="https://stackoverflow.com/users/8124426/sabir" target="_blank" className="hover:text-blue-600"><FaStackOverflow /></a>
            <a href="https://linkedin.com/in/sabir07" target="_blank" className="hover:text-blue-600"><FaLinkedin /></a>
            <a href="https://profiles.wordpress.org/mdsabir07" target="_blank" className="hover:text-blue-600"><FaWordpress /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} RemoteNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
