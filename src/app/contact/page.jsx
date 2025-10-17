import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const NavContact = () => {
    return (
        <section id='contact' className="py-12 px-4 lg:px-0 max-w-7xl mx-auto space-y-10">
            <div>
                <h1 className='text-3xl md:text-5xl text-center font-bold mb-6'>Contact Us</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                {/* Left Side */}
                 <div data-aos="zoom-out-down" className="p-6 rounded shadow-lg transition-colors duration-300">
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-1">Full name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-2 rounded border border-gray-200 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Email address</label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 rounded border border-gray-200 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Message</label>
                            <textarea
                                placeholder="Message"
                                rows="4"
                                className="w-full p-2 rounded border border-gray-200 focus:outline-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-medium text-white"
                        >
                            Send
                        </button>
                    </form>
                </div>

                {/* Right Side */}
               <div data-aos="zoom-out-right" className='w-full'>
                    <h2 className="text-2xl md:text-4xl font-bold mb-5">Find Your Perfect Remote Work Destination</h2>
                    <p className="mb-6">
                        Discover the best places around the world to work remotely. Get in touch to learn more about destinations, living costs, and opportunities that fit your lifestyle.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <FaMapMarkerAlt className="text-blue-500" />
                            <span>Dhaka, Bangladesh</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaPhoneAlt className="text-blue-500" />
                            <span>+880185xxxxxx</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-blue-500" />
                            <span>me.name@gmail.com</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap space-x-4 mt-6 text-xl">
                        <a target='_blank' href="https://www.facebook.com/YourProfile/" className="hover:text-blue-500"><FaFacebook /></a>
                        <a target='_blank' href="https://github.com/mdsabir07" className="hover:text-blue-500"><FaGithub /></a>
                        <a target='_blank' href="https://www.linkedin.com/in/mdsabir07/" className="hover:text-blue-500"><FaLinkedin /></a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default NavContact;
