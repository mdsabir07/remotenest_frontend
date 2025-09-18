import React from 'react';

const NewsletterSignup = () => {
    return (
        <div className="bg-emerald-50 py-12">
  <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Left Side: Text + Form */}
    <div className="text-center md:text-left">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
        Get remote work & travel tips directly in your inbox
      </h2>
      <p className="text-gray-600 mb-6">
        Subscribe to stay updated with the best destinations, tips & guides.
      </p>

      <form className="flex flex-col sm:flex-row items-center md:items-start gap-3 justify-center md:justify-start">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-black"
        />
        <button
          type="submit"
          className="px-6 py-3 text-black font-medium border border-emerald-500 rounded-lg shadow-sm hover:bg-emerald-600 hover:text-white hover:shadow-md transition-all duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>

    {/* Right Side: Image */}
    <div className="flex justify-center">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80"
        alt="Remote Work"
        className="w-full h-64 md:h-72 object-cover rounded-lg shadow-md"
      />
    </div>
  </div>
</div>

    );
};

export default NewsletterSignup;