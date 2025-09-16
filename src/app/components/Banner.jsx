"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="w-full mx-auto mt-4">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <div>
          <img
            src="https://i.ibb.co.com/zHTcx53n/banner1.jpg"
            alt="Welcome Banner"
            className="h-64 md:h-96 w-full object-cover"
          />
          <div className="legend">
            <h2 className="text-xl md:text-3xl font-bold">Welcome to RemoteNest Tracker</h2>
            <p>Track the best remote work destinations, Swimming, Best Places</p>
          </div>
        </div>

        <div>
          <img
            src="https://i.ibb.co.com/HLYFYqMm/banner2.jpg"
            alt="Watering Reminder"
            className="h-64 md:h-96 w-full object-cover"
          />
          <div className="legend">
            <h2 className="text-xl md:text-3xl font-bold">Relax & Recharge</h2>
            <p>Enjoy your time swimming and exploring.</p>
          </div>
        </div>

        <div>
          <img
            src="https://i.ibb.co.com/fzTDFDwh/banner3.jpg"
            alt="Indoor Jungle"
            className="h-64 md:h-96 w-full object-cover"
          />
          <div className="legend">
            <h2 className="text-xl md:text-3xl font-bold">Best Places Awaits</h2>
            <p>Discover top destinations for work and life.</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
