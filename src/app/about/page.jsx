"use client";

import Image from "next/image";
import React from "react";
import aboutImg from "@/assets/hello.png"; 
import TeamCards from "../components/TeamCards";
import NewsletterSignup from "../components/NewsletterSignup";



export default function AboutPage() {
  return (
    <main className=" dark:bg-[#111827] transition-colors duration-300">
      {/* 🔹 About Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Image */}
        <div>
          <Image
            src={aboutImg}
            alt="Remote work"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Right Side - Text */}
        <div data-aos="fade-left" className="text-gray-900 dark:text-white">
          <h1 className="text-4xl font-bold mb-4">About RemoteNest</h1>
          <p className="mb-4 text-gray-700 dark:text-white">
            RemoteNest is a platform dedicated to connecting remote workers with the
            best resources, job opportunities, and communities around the world. Our
            mission is to empower individuals to thrive in the remote work environment
            by providing them with the tools and support they need.
          </p>
          <p className="mb-4 text-gray-700 dark:text-white">
            Whether you're a freelancer, a digital nomad, or part of a remote team,
            RemoteNest offers a variety of features to help you succeed. From curated
            job listings to community forums and productivity tools, we aim to be your
            go-to resource for all things remote work.
          </p>
          <p className="text-gray-700 dark:text-white">
            Join us on this journey to redefine the future of work and create a more
            flexible, inclusive, and connected world.
          </p>
        </div>
      </section>

      {/* 🔹 Team Section */}
      <section className="py-12 px-4  dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center mb-2">
           <TeamCards></TeamCards>
          
        </div>

      {/* news latter section */}
      <div className="mt-16">
        <NewsletterSignup></NewsletterSignup>
      </div>
        
      </section>
    </main>
  );
}
