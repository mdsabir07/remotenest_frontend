"use client"
import { useEffect, useState } from "react";
import SingleFeaturedCities from "../components/SingleFeaturedCities";


export default  function CitiesPage() {
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
  
   return (

      <div className=" bg-gray-50 dark:bg-gray-900">
        <div
          className="relative h-[500px] flex flex-col items-center justify-center text-white px-6"
          style={{
            backgroundImage: `url(https://i.ibb.co.com/jvy95PKT/end-game-1-2.jpg)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Explore Vibrant Cities Worldwide
            </h1>
            <p className="text-base md:text-xl max-w-2xl mx-auto mb-6 text-gray-200">
              Explore diverse skylines, cultures, and communities from around the world —
              where innovation meets tradition and every city tells its own story.
            </p>
          </div>
        </div>
        {/* Section Title */}
        <div className="text-center my-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white text-center">
            🌍 Discover the <span className="text-blue-600">World’s Best Cities</span>
          </h1>
          <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-center">
            Explore vibrant destinations across the globe with detailed insights on living costs,
            internet speed, and lifestyle — helping you find the perfect place for remote work and travel.
          </p>


        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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