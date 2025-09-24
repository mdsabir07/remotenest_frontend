"use client"
import React, { useEffect, useState } from 'react';
import SingleFeaturedCities from './SingleFeaturedCities';
import Link from 'next/link';
import Loading from '../loading';


const FeaturedCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/cities");
        const citiesData = await res.json();
        const data = citiesData?.cities;
        if (Array.isArray(data)) {
          setCities(data);
        } else {
          console.error("Cities is not an array:", data);
        }
      } catch (err) {
        setError("Error fetching cities:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);
console.log(cities)
  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (

    <div className="py-12 bg-gray-50">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🌆 Featured Cities
      </h2>
      {/* Cities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cities.map((singleData) => (
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