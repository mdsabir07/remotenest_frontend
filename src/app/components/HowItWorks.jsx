import React from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { FaSliders } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Search cities",
      desc: "Type a city name and quickly find details, attractions and costs.",
      icon: <FaSearch className="w-6 h-6 text-white" aria-hidden="true" />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 2,
      title: "Compare & filter",
      desc: "Filter by price, climate, safety and compare multiple cities side-by-side.",
      icon: <FaSliders className="w-6 h-6 text-white" />,
      color: "from-green-400 to-teal-500",
    },
    {
      id: 3,
      title: "Get AI recommendations",
      desc: "Personalized city suggestions based on your preferences.",
      icon: <IoSparkles className="w-6 h-6 text-white" />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: 4,
      title: "Save your favorite cities",
      desc: "Bookmark cities to a favorites list for later planning and sharing.",
      icon: <FaHeart className="w-6 h-6 text-white" />,
      color: "from-pink-400 to-red-500",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-12">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-bold">How it works</h2>
        <p className=" mt-2 text-lg">
          Find the perfect city for you in just a few steps
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
        {steps.map((s, idx) => (
          <div
            key={s.id}
            className="relative rounded p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300"
          >
            {/* Step Number */}
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-500 text-white font-bold flex items-center justify-center rounded-full shadow-md">
              {idx + 1}
            </div>

            {/* Icon */}
            <div
              className={`flex-none w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${s.color}`}
            >
              {s.icon}
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-sm mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
