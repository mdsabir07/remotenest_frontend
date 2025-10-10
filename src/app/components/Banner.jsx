"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Welcome to RemoteNest Tracker",
      desc: "Track the Best Remote Work Destinations, Explore Stunning Swimming Spots, and Discover the Most Beautiful Places Around the World ",
      btnText: "Explore Cities",
      img: "https://i.ibb.co.com/5hrfsKQC/end-game-citi-9.jpg",
    },
    {
      id: 2,
      title: "Relax & Recharge – Unwind & Reenergize",
      desc: "Enjoy Your Time Swimming and Exploring – Dive into Crystal-Clear Waters, Discover Hidden Gems, and Make Every Moment of Your Adventure Memorable and Exciting",
      btnText: "Explore Cities",
      img: "https://i.ibb.co.com/dJ6g414f/end-game-citi-5.jpg",
    },
    {
      id: 3,
      title: "Best Places Await – Explore & Enjoy",
      desc: "Discover Top Destinations for Work and Life – Find the Perfect Places to Live, Work Remotely, and Enjoy an Ideal Balance Between Productivity and Leisure",
      btnText: "Explore Cities",
      img: "https://i.ibb.co.com/QjjyjP1k/end-game-citi-1.jpg",
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
      <div className="flex flex-col md:flex-row items-center overflow-hidden h-64 md:h-[400px] ">
        {/* Left Side */}
        <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center h-full space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-500">
            {slides[currentIndex].title}
          </h2>
          <p className=" mb-6 text-xl">{slides[currentIndex].desc}</p>
          <Link href="/cities"className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition w-max">
            {slides[currentIndex].btnText}
          </Link>
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
          <FaChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition"
        >
          <FaChevronRight className="w-6 h-6 text-gray-800" />
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
