"use client";

import React from "react";
import Image from "next/image";

import logo1 from "@/assets/logocarousel/logo1.png";
import logo2 from "@/assets/logocarousel/logo2.png";
import logo3 from "@/assets/logocarousel/logo3.png";
import logo5 from "@/assets/logocarousel/logo5.png";
import logo6 from "@/assets/logocarousel/logo6.png";
import logo7 from "@/assets/logocarousel/logo7.png";
import logo8 from "@/assets/logocarousel/logo8.png";

const logos = [logo1, logo2, logo3, logo5, logo6, logo7, logo8];

const LogoCarousel = () => {
  return (
    <div className="max-w-7xl mx-auto marquee-wrapper py-6 my-6">
      <div className="marquee-track">
        {/* Render 2 copies of the logo set */}
        {[...Array(2)].map((_, i) => (
          <div className="flex" key={i}>
            {logos.map((logo, index) => (
              <div
                key={`${i}-${index}`}
                className="flex-shrink-0 w-32 md:w-36 lg:w-40 px-6"
              >
                <Image
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  className="object-contain mx-auto"
                  width={160}
                  height={80}
                  priority={i === 0 && index < logos.length}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;
