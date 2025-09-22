import React from 'react';
import SingleFeaturedCities from './SingleFeaturedCities';
import Link from 'next/link';

async function getCities() {
    const res = await fetch('http://localhost:3000/api/cities', {
        cache: 'no-store'
    });
    return res.json();
}
const  FeaturedCities = async () => {
    const cities = await getCities();
   const Data = cities?.cities;
   console.log(Data)
    return (
        
        <div className="py-12 bg-gray-50">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                🌆 Featured Cities
            </h2>
            {/* Cities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {Data.map((singleData) => (
                    <SingleFeaturedCities
                        key={singleData._id}
                        singleData={singleData}
                    />
                ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-10">
                < Link href="/cities" className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 border border-emerald-500 rounded-lg shadow-sm hover:bg-emerald-600 hover:text-white hover:shadow-md transition-all duration-300">
                    View All Cities
                    <span className="text-lg">→</span>
                </Link>
            </div>
        </div>

    );
};

export default FeaturedCities;