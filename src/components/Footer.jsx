"use client"
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

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
            Discover the world’s best cities for remote work and travel.
            Compare cost, internet speed, lifestyle, and community insights
            to find your next destination.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-500"> Home</Link></li>
            <li><Link href="#" className="hover:text-blue-500"> Cities</Link></li>
            <li><Link href="#" className="hover:text-blue-500"> Blog</Link></li>
            <li><Link href="#" className="hover:text-blue-500">About</Link></li>
            <li><Link href="#" className="hover:text-blue-500"> Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-blue-500"> FAQs</Link></li>
            <li><Link href="#" className="hover:text-blue-500"> Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-blue-500"> Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Join Newsletter</h3>
          <p className="text-sm mb-3">
            Subscribe to get the latest updates on top cities and travel tips.
          </p>
          <div className="flex flex-row">
            <input type="text" placeholder="example@email.com" className="w-3/5 p-3 rounded-l-sm border border-blue-500 focus:outline-none sm:w-2/3" />
            <button type="button" className="w-2/5 p-3 font-semibold text-white cursor-pointer rounded-r-sm sm:w-1/3 bg-blue-500 hover:bg-blue-600">Subscribe</button>
          </div>


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
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} RemoteNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
