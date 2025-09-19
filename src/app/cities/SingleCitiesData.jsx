import React from "react";

const SingleCitiesData = ({ singleData }) => {
  const { wifiSpeed, monthlyCost, image, country, city } = singleData;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* City Image */}
      <div className="relative">
        <img
          src={image}
          alt={city}
          className="w-full h-72 object-cover"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">
            {city}, <span className="text-gray-300">{country}</span>
          </h2>
        </div>
      </div>

      {/* City Info */}
      <div className="p-6 space-y-3">
        <p className="text-gray-700 text-lg">
          💰 Monthly Cost:{" "}
          <span className="font-semibold text-emerald-600">
            ${monthlyCost}
          </span>
        </p>
        <p className="text-gray-700 text-lg">
          📶 Wi-Fi Speed:{" "}
          <span className="font-semibold text-emerald-600">
            {wifiSpeed} Mbps
          </span>
        </p>

        {/* CTA Button */}
        
      </div>
    </div>
  );
};

export default SingleCitiesData;
