"use client"
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Remote<span className="text-blue-600">Nest</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Discover the world’s best cities for remote work and travel. 
            Compare cost, internet speed, lifestyle, and community insights 
            to find your next destination.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-600"> Home</Link></li>
            <li><Link href="#" className="hover:text-blue-600"> Cities</Link></li>
            <li><Link href="#" className="hover:text-blue-600"> Blog</Link></li>
            <li><Link href="#" className="hover:text-blue-600">About</Link></li>
            <li><Link href="#" className="hover:text-blue-600"> Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-blue-600"> FAQs</Link></li>
            <li><Link href="#" className="hover:text-blue-600"> Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-blue-600"> Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Join Newsletter</h3>
          <p className="text-sm mb-3">
            Subscribe to get the latest updates on top cities and travel tips.
          </p>
         

          {/* Social Links */}
          <div className="flex space-x-4 mt-5 text-xl">
            <a href="#" className="hover:text-emerald-400"><FaFacebook /></a>
            <a href="#" className="hover:text-emerald-400"><FaTwitter /></a>
            <a href="#" className="hover:text-emerald-400"><FaLinkedin /></a>
            <a href="#" className="hover:text-emerald-400"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} RemoteNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
