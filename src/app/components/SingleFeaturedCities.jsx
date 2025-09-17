import React from 'react';

const SingleFeaturedCities = ({ featuredData }) => {
    const { city, country, image, monthlyCost, wifiSpeed } = featuredData;
    return (
        <div className="relative bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            {/* Image */}
            <img
                src={image}
                alt={city}
                className="w-full h-56 object-cover"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-opacity-40 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col items-center justify-center text-white p-4">
                <h3 className="text-2xl font-bold">
                    {city}, <span className="text-gray-200">{country}</span>
                </h3>
                <p className="mt-2">
                    💰 Monthly Cost: <span className="font-semibold">${monthlyCost}</span>
                </p>
                <p>
                    📶 Wi-Fi Speed: <span className="font-semibold">{wifiSpeed} Mbps</span>
                </p>
            </div>
            
        </div>

    );
};

export default SingleFeaturedCities;