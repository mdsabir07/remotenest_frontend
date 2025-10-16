import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SingleFeaturedCities = ({ singleData }) => {

  const { _id,
    name,
    country,
    tags,
    featuredImage,
    cost,
    reviewCount,
    averageRating,
    connectivity,
    description, } = singleData;
  const fallbackImage = "https://i.ibb.co.com/5hrfsKQC/end-game-citi-9.jpg";
  return (
    <div className="group bg-white rounded shadow-md overflow-hidden border border-gray-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-3">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={featuredImage || fallbackImage}
          alt={name || 'city image'}
          height={300}
          width={400}
          className="w-full h-full object-cover transform transition-transform duration-[2000ms] ease-in-out group-hover:-translate-y-4"
        />

        {/* Tags Overlay */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
          {tags?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="bg-emerald-600/80 text-white text-xs px-2 py-1 rounded-full shadow-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col space-y-6 h-full">
        <div>
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <span className="text-sm bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md">
              {country}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {description}
          </p>



          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex items-center">
              <span className="mr-2 text-orange-500">⭐</span>
              <span className="font-semibold">Average Rating:</span>&nbsp;
              <span className='font-semibold text-yellow-500'>{averageRating}/5 ({reviewCount} reviews)</span>
            </div>


            <div className="flex items-center">
              <span className="mr-2 text-orange-500">💰</span>
              <span className="font-semibold">Estimated Cost:</span>&nbsp;
              {cost?.rent || "N/A"}
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-orange-500">🌐</span>
              <span className="font-semibold">Connectivity:</span>&nbsp;
              {connectivity?.mobileCoverage || "N/A"}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <Link
            href={`/cities/${_id}`}
            className="block w-full text-center font-semibold px-4 py-2 bg-white text-emerald-700 border border-emerald-500 rounded-lg shadow-sm hover:bg-emerald-600 hover:text-white hover:shadow-md transition-all duration-300"
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleFeaturedCities;