"use client";
import React, { useState } from "react";
import CityShareButton from "./CityShareButton";
import { FaStar } from "react-icons/fa";
import { useSession } from "next-auth/react";

const SingleCitiesData = ({ singleData,  }) => {
  const {data} = useSession();
  // const user = data.user.name;
  // const userEmail = data.user.email;
  // const userId = data.user.id;
  console.log(data.user)
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState(' ')
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
    approvedAt, 
  } = singleData;

  // handleReviewSubmit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // const userReview = {
    //   userId,
    //   user,
    //   userEmail,
    //   review,
    //   rating,
    //   cityId:  _id,

    // }
  
  }

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
          <div className="flex gap-2 mt-2 flex-wrap">
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
      <div className="p-6 space-y-6">
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

        {/* Share */}
        <div className="justify-end flex">
          <CityShareButton id={_id} />
        </div>

        {/* 🔥 User Review Section */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">💬 User Reviews</h3>

          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Leave a review</p>
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                  className={`cursor-pointer transition-colors ${
                (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
              }`}
                  size={22}
                />
              ))}
            </div>
            <textarea
              rows="3"
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your experience..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
            <button type="submit" className="mt-3 px-5 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition">
              Submit Review
            </button>
          </form>

          {/* Example Review List */}
          {/* <div className="mt-6 space-y-4">
            <div className="p-4 border rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">John Doe</p>
                <span className="flex text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Really peaceful city! Loved the affordable lifestyle.
              </p>
            </div>

            <div className="p-4 border rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">Sarah Lee</p>
                <span className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Great place to work remotely, though internet can be patchy.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleCitiesData;
