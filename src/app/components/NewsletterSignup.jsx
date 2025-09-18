import React from 'react';

const NewsletterSignup = () => {
    return (
         <div className="bg-emerald-50 py-12 px-6 text-center rounded-xl shadow-sm max-w-2xl mx-auto">
      {/* Text */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
        Get remote work & travel tips directly in your inbox
      </h2>
      <p className="text-gray-600 mb-6">
        Subscribe to stay updated with the best destinations, tips & guides.
      </p>

      {/* Input + Button */}
      <form className="flex flex-col sm:flex-row items-center gap-3 justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg shadow hover:bg-emerald-700 transition duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
    );
};

export default NewsletterSignup;