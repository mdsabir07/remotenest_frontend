"use client";

import { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setMessage(` Welcome aboard! Thanks for subscribing, ${email}`);
    setEmail("");

    // 5 seconds পর message hide হবে
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
   <div className="border-blue-400 relative border rounded-2xl shadow-2xl py-16 max-w-7xl mx-auto px-6 bg-white flex flex-col items-center justify-center text-center">
      {/* Top Icon */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex h-16 w-16 items-center justify-center border border-blue-400 rounded-full bg-white shadow-lg">
          <span className="text-2xl">✉️</span>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-800 mb-3">
        Join Our Newsle<span className="text-blue-400">tt</span>er
      </h2>
      <h2 className="text-4xl font-bold text-gray-800 mb-3">
        Join Our Newsle<span className="text-blue-400">tt</span>er
        Test
      </h2>
     
      <p className="text-gray-600 mb-6 text-lg max-w-lg">
        Get the best destinations, travel tips & insider guides delivered to your inbox.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-3/4 flex justify-center"
      >
        <div className="relative w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 pr-28 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-black"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 px-4 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all duration-300"
          >
            Subscribe
          </button>
        </div>
      </form>

      {/* Safety Note */}
      <p className="mt-4 text-sm text-gray-500">
        Your email is safe with us — we never spam.
      </p>

      {/* Success / Error Message */}
      {message && (
        <div className="mt-6">
          <p className="text-emerald-600 font-medium bg-emerald-50 px-4 py-2 rounded-lg inline-block shadow-sm">
            {message}
          </p>
        </div>
      )}
    </div>


  );
};

export default NewsletterSignup;