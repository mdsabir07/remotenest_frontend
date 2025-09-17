

import React from "react";
import { Search, Sliders, Sparkles, Heart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Search cities",
      desc: "Type a city name and quickly find details, attractions and costs.",
      icon: <Search className="w-6 h-6 text-indigo-600" aria-hidden="true"  />,
      example: true,
    },
    {
      id: 2,
      title: "Compare & filter",
      desc: "Filter by price, climate, safety and compare multiple cities side-by-side.",
      icon: <Sliders className="w-6 h-6 text-indigo-600" />,
      
    },
    {
      id: 3,
      title: "Get AI recommendations",
      desc: "Personalized city suggestions based on your preferences.",
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
    },
    {
      id: 4,
      title: "Save your favorite cities",
      desc: "Bookmark cities to a favorites list for later planning and sharing.",
      icon: <Heart className="w-6 h-6 text-indigo-600" />,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
        <p className="text-gray-600 mt-2">
           find the perfect city for you
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
        {steps.map((s) => (
          <div
            key={s.id}
            className="bg-white border rounded-2xl p-6 shadow hover:shadow-md transition"
          >
            <div className="flex items-start gap-4">
              <div className="flex-none w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                {s.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
              </div>
            </div>

            {/* input  */}
            {s.example && (
              <div className="mt-4">
                <div className="flex items-center border rounded-lg px-2 py-1.5 bg-gray-50">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search city..."
                    className="flex-1 px-2 text-sm bg-transparent outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
