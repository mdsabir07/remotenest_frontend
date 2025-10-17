"use client"
import { useEffect, useState } from "react";
import SingleFeaturedCities from "../components/SingleFeaturedCities";
import Loading from "../loading";


export default function CitiesPage() {
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

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-0">
      {/* Section Title */}
      <div className="text-center my-16">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          🌍 Discover the <span className="text-blue-500">World's Best Cities</span>
        </h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-center">
          Explore vibrant destinations across the globe with detailed insights on living costs, internet speed, and lifestyle — helping you find the perfect place for remote work and travel.
        </p>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
        {cities.map((singleData) => (
          <div
            key={singleData._id}
          >
            <SingleFeaturedCities singleData={singleData} />
          </div>
        ))}
      </div>
    </div>

  );



}