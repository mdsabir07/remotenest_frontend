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
        const data = citiesData?.cities;

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
    <div className="min-h-screen py-10 px-4 sm:px-0">
      {/* Content Section */}
      <div className="max-w-4xl mx-auto">
        <div className="rounded shadow-lg overflow-hidden hover:shadow-xl transition">
          {/* Single Data Component */}
          {singleData ? (
            <SingleCitiesData singleData={singleData} />
          ) : (
            <p className="text-center py-10">Loading city data...</p>
          )}
        </div>
      </div>
    </div>
  );
}
