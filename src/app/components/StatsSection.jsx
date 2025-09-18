"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FiMapPin, FiUsers, FiStar } from "react-icons/fi";

export default function StatsSection() {
  // 🔹 Future-ready: from API later
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // 📌 Static dummy data for now
    const dummyStats = [
      { id: 1, icon: "city", label: "Cities", value: 100, suffix: "+" },
      { id: 2, icon: "users", label: "Remote Workers", value: 10000, suffix: "+" },
      { id: 3, icon: "star", label: "Reviews", value: 500, suffix: "+" },
    ];
    setStats(dummyStats);

    // 📝 Later: replace with fetch
    // fetch('/api/stats')
    //   .then(res => res.json())
    //   .then(data => setStats(data))
  }, []);

  // helper to pick icons
  const getIcon = (name) => {
    switch (name) {
      case "city": return <FiMapPin size={28} />;
      case "users": return <FiUsers size={28} />;
      case "star": return <FiStar size={28} />;
      default: return null;
    }
  };

  return (
    <section className="max-w-7xl mx-auto rounded-4xl mb-10 p-10 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-2xl font-semibold dark:text-white mb-6 text-center">Impact & Trust</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl shadow-sm"
            >
              <div className="p-3 rounded-lg bg-white dark:bg-slate-700 shadow-inner">
                {getIcon(s.icon)}
              </div>

              <div>
                <div className="text-3xl font-bold leading-none">
                  <CountUp end={s.value} duration={1.8} separator="," />
                  <span className="ml-1 text-xl font-medium">{s.suffix}</span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
