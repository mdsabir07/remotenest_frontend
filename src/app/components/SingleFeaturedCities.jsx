import Link from 'next/link';
import React from 'react';

const SingleFeaturedCities = ({ featuredData }) => {
    const { city, country, image, monthlyCost, wifiSpeed , id} = featuredData;
    return (
       <div className="relative bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden group transition">
  {/* Image */}
  <img
    src={image}
    alt={city}
    className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
  />

  {/* Overlay Gradient + Text */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col items-center justify-center text-white p-4 transition">
    <h3 className="text-2xl font-bold drop-shadow-lg">
      {city}, <span className="text-gray-200">{country}</span>
    </h3>
    <p className="mt-2">
      💰 Monthly Cost: <span className="font-semibold">${monthlyCost}</span>
    </p>
    <p>
      📶 Wi-Fi Speed: <span className="font-semibold">{wifiSpeed} Mbps</span>
    </p>

    {/* View More Button */}
    <Link href={`cities/${id}`} className="mt-4 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg shadow hover:bg-emerald-700 transition opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-3 duration-300">
      View More
    </Link>
  </div>
</div>


    );
};

export default SingleFeaturedCities;