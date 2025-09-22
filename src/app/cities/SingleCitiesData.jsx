import React from "react";
import CityShareButton from "./CityShareButton";

const SingleCitiesData = ({ singleData }) => {
  const { 
    _id,
    name,
    country,
    featuredImage,
    description,
    connectivity,
    cost,
    location,
    tags,
    averageRating,
    reviewCount,
    status,
    createdAt,
    approvedAt, } = singleData;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* City Image */}
      <div className="relative">
        <img
          src={featuredImage}
          alt={name}
          className="w-full h-72 object-cover"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-3xl font-bold text-white">
            {name}, <span className="text-gray-300">{country}</span>
          </h2>
          <div className="flex gap-2 mt-2">
            {tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* City Info */}
      <div className="p-6 space-y-4">
        {/* Description */}
        <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
          {description}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">💵 Monthly Rent</p>
            <p className="font-semibold text-emerald-600">
              {cost?.rent ? `$${cost.rent}` : "150–450$ (avg)"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">🍛 Food Cost</p>
            <p className="font-semibold text-emerald-600">
              {cost?.food ? `$${cost.food}` : "100–200$"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">🚕 Transport</p>
            <p className="font-semibold text-emerald-600">
              {cost?.transport ? `$${cost.transport}` : "20–50$"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">🌐 Avg Internet</p>
            <p className="font-semibold text-emerald-600">
              {connectivity?.avgDownloadMbps
                ? `${connectivity.avgDownloadMbps} Mbps`
                : "30–60 Mbps"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">📶 Mobile Coverage</p>
            <p className="font-semibold text-emerald-600">
              {connectivity?.mobileCoverage}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">⭐ Average Rating</p>
            <p className="font-semibold text-yellow-500">
              {averageRating}/5 ({reviewCount} reviews)
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="mt-6 bg-orange-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">📍 Location</h3>
          <p className="text-sm text-gray-600">
            Latitude: {location?.lat}, Longitude: {location?.lng}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-between mt-6 text-sm text-gray-500">
          <p>Status: <span className="font-medium text-green-600">{status}</span></p>
          <p>Approved At: {new Date(approvedAt).toLocaleDateString()}</p>
          <p>Created: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
        {/* share */}
        <div className="justify-end flex">
         <CityShareButton id={_id}></CityShareButton>
        </div>
      </div>
    </div>
  );
};

export default SingleCitiesData;
