"use client";

import { FaUsers, FaGlobeAsia, FaStar, FaHandshake, FaAward, FaShieldAlt } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: false, // viewport এ এলে বার বার trigger হবে
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🌍 Impact & Trust
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Empowering remote workers globally and building trust through transparency and community.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          <div className="p-6 text-center shadow-md hover:shadow-xl transition rounded-2xl bg-white">
            <FaGlobeAsia className="text-5xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">
              {inView && <CountUp key={inView} end={150} duration={2} />}+
            </h3>
            <p className="text-gray-600">Remote-Friendly Cities</p>
          </div>

          <div className="p-6 text-center shadow-md hover:shadow-xl transition rounded-2xl bg-white">
            <FaUsers className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">
              {inView && <CountUp key={inView + "users"} end={10000} duration={2} />}+
            </h3>
            <p className="text-gray-600">Active Remote Workers</p>
          </div>

          <div className="p-6 text-center shadow-md hover:shadow-xl transition rounded-2xl bg-white">
            <FaStar className="text-5xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">
              {inView && <CountUp key={inView + "rating"} end={4.8} decimals={1} duration={2} />} /5
            </h3>
            <p className="text-gray-600">Average Rating</p>
          </div>

          <div className="p-6 text-center shadow-md hover:shadow-xl transition rounded-2xl bg-white">
            <FaHandshake className="text-5xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">
              {inView && <CountUp key={inView + "connections"} end={5000} duration={2} />}+
            </h3>
            <p className="text-gray-600">Connections Made</p>
          </div>
        </div>
         {/* Trust Indicators */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-10">  Trusted & Recognized </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 shadow-md hover:shadow-xl transition rounded-2xl"> <FaAward className="text-4xl text-indigo-500 mx-auto mb-3" />
              <p className="font-semibold text-gray-800">Featured in TechCrunch</p>
            </div>
            <div className="bg-white p-6 shadow-md hover:shadow-xl transition rounded-2xl"> <FaShieldAlt className="text-4xl text-teal-500 mx-auto mb-3" />
              <p className="font-semibold text-gray-800">ISO Certified Platform</p>
            </div>
            <div className="bg-white p-6 shadow-md hover:shadow-xl transition rounded-2xl"> <FaHandshake className="text-4xl text-pink-500 mx-auto mb-3" />
              <p className="font-semibold text-gray-800"> Trusted by Global Partners </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4"> Ready to join 10,000+ remote workers worldwide? </h3>
          <p className="text-gray-600 mb-6"> Start your journey today and discover your perfect destination. </p>
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"> Get Started </button>
        </div>
      </div>
    </section>
  );
}
