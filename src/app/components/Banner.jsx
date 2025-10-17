"use client";

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <section className="lg:grid lg:h-screen lg:place-content-center">
            <div
              className="mx-auto w-screen max-w-screen-xl p-4 sm:p-0 md:grid md:grid-cols-2 md:items-center space-y-8 md:space-y-0 gap-5"
            >
              <div className="max-w-prose text-left space-y-4">
                <h1 className="text-4xl font-bold sm:text-5xl">
                  Welcome to <strong className="text-blue-500"> RemoteNest </strong>
                  Tracker
                </h1>

                <p className="mt-4 text-base text-pretty sm:text-lg/relaxed">
                  Track the Best Remote Work Destinations, Explore Stunning Swimming Spots, and Discover the Most Beautiful Places Around the World
                </p>

                <div className="mt-4 flex gap-4 sm:mt-6">
                  <Link
                    className="inline-block rounded border border-blue-500 text-white bg-blue-500 px-5 py-3 font-medium shadow-sm transition-colors hover:bg-blue-600"
                    href="/"
                  >
                    Explore Cities
                  </Link>
                </div>
              </div>

              <div className="max-h-full">
                <Image
                  src={banner1}
                  alt="Banner"
                  className="h-[250px] md:h-[400px] lg:h-[500px] w-full object-contain"
                  placeholder="blur" // optional, adds blur-up effect
                  quality={90}
                />

              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="lg:grid lg:h-screen lg:place-content-center">
            <div
              className="mx-auto w-screen max-w-screen-xl p-4 sm:p-0 md:grid md:grid-cols-2 md:items-center space-y-8 md:space-y-0 gap-5"
            >
              <div className="max-w-prose text-left space-y-4">
                <h1 className="text-4xl font-bold sm:text-5xl">
                  Best Places Await –<strong className="text-blue-500"> Explore & Enjoy </strong>
                </h1>

                <p className="mt-4 text-base text-pretty sm:text-lg/relaxed">
                  Discover Top Destinations for Work and Life – Find the Perfect Places to Live, Work Remotely, and Enjoy an Ideal Balance Between Productivity and Leisure
                </p>

                <div className="mt-4 flex gap-4 sm:mt-6">
                  <Link
                    className="inline-block rounded border border-blue-500 text-white bg-blue-500 px-5 py-3 font-medium shadow-sm transition-colors hover:bg-blue-600"
                    href="/"
                  >
                    Explore Cities
                  </Link>
                </div>
              </div>

              <div className="max-h-full">
                <Image
                  src={banner2}
                  alt="Banner"
                  className="h-[250px] md:h-[400px] lg:h-[500px] w-full object-contain"
                  placeholder="blur" // optional, adds blur-up effect
                  quality={90}
                />

              </div>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
