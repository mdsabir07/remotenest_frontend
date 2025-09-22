import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import CommunityHighlight from '../components/CommunityHighlight';
import NewsletterSignup from '../components/NewsletterSignup';

const NavContact = () => {
    return (
        <section id='contact' className="bg-gray-100 dark:bg-[#1F2937] text-gray-900 dark:text-white py-12 px-4 transition-colors duration-300">
            <div>
                <h1 className='text-4xl text-center font-bold mb-6'>Contact Me</h1>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Left Side */}
                 <div data-aos="zoom-out-down" className="bg-white dark:bg-[#111827] p-6 rounded-lg transition-colors duration-300">
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-1">Full name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-2 rounded border border-gray-400 dark:border-gray-500 bg-transparent dark:text-white focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Email address</label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 rounded border border-gray-400 dark:border-gray-500 bg-transparent dark:text-white focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Message</label>
                            <textarea
                                placeholder="Message"
                                rows="4"
                                className="w-full p-2 rounded border border-gray-400 dark:border-gray-500 bg-transparent dark:text-white focus:outline-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded font-medium text-white"
                        >
                            Send
                        </button>
                    </form>
                </div>

                {/* Right Side */}
               <div data-aos="zoom-out-right">
                    <h2 className="text-2xl font-bold mb-2">Find Your Perfect Remote Work Destination</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        Discover the best places around the world to work remotely. Get in touch to learn more
                        about destinations, living costs, and opportunities that fit your lifestyle.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <FaMapMarkerAlt className="text-pink-500" />
                            <span>Dhaka, Bangladesh</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaPhoneAlt className="text-pink-500" />
                            <span>+8801887248726</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-pink-500" />
                            <span>shimuldevnath330@gmail.com</span>
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-6 text-xl">
                        <a target='_blank' href="https://www.facebook.com/YourProfile/" className="hover:text-pink-500"><FaFacebook /></a>
                        <a target='_blank' href="https://github.com/shimul330" className="hover:text-pink-500"><FaGithub /></a>
                        <a target='_blank' href="https://www.linkedin.com/in/shimul-kumar-nath-445519354/" className="hover:text-pink-500"><FaLinkedin /></a>
                    </div>
                </div>

            </div>
            {/* review section */}
            <CommunityHighlight></CommunityHighlight>
            {/* news letter section */}
           <div className='mt-16'>
             <NewsletterSignup></NewsletterSignup>
           </div>
        </section>
    );
};

export default NavContact;
