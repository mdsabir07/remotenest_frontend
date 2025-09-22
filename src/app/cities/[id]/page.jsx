"use client";
import { useEffect, useState, use } from "react";
import SingleCitiesData from "../SingleCitiesData";

export default function CitiesDetails({ params }) {
  const { id } = use(params); 

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/cities");
        const citiesData = await res.json();
        const data = citiesData.cities;

        if (Array.isArray(data)) {
          setCities(data);
        } else {
          console.error("Cities is not an array:", data);
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };

    fetchCities();
  }, []);

  const singleData = cities.find((d) => d._id === id);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-600">
          🌆 City Details
        </h1>
        <p className="mt-2 text-gray-600">
          Explore everything you need to know about this city.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
          {/* Single Data Component */}
          {singleData ? (
            <SingleCitiesData singleData={singleData} />
          ) : (
            <p className="text-center text-gray-500 py-10">Loading city data...</p>
          )}
        </div>
      </div>
    </div>
  );
}
