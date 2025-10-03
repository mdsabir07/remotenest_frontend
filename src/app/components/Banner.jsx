"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Welcome to RemoteNest Tracker",
      desc: "Track the best remote work destinations, Swimming, Best Places",
      btnText: "Get Started",
      img: "https://i.ibb.co.com/fzdDZH74/end-game-citi-10.jpg",
    },
    {
      id: 2,
      title: "Relax & Recharge",
      desc: "Enjoy your time swimming and exploring.",
      btnText: "Explore Now",
      img: "https://i.ibb.co.com/dJ6g414f/end-game-citi-5.jpg",
    },
    {
      id: 3,
      title: "Best Places Awaits",
      desc: "Discover top destinations for work and life.",
      btnText: "Discover More",
      img: "https://i.ibb.co.com/v4B5tHWq/end-game-citi-4.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 relative">
      <div className="flex flex-col md:flex-row items-center overflow-hidden h-64 md:h-[400px] rounded-2xl">
        {/* Left Side */}
        <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center h-full">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            {slides[currentIndex].title}
          </h2>
          <p className="text-gray-600 mb-6">{slides[currentIndex].desc}</p>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition w-max">
            {slides[currentIndex].btnText}
          </button>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 h-full">
          <img
            src={slides[currentIndex].img}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              currentIndex === idx ? "bg-indigo-600" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
