// Testimonial.tsx
"use client";


import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";
import testimonial from '@/assets/testimonial.png';

const Testimonial = () => {
    return (
        <section className="max-w-7xl mx-auto py-10 px-4 sm:px-0">
            <h2 className="text-3xl md:text-5xl mb-4 font-bold text-center">
                Community <span className="text-blue-500">Highlights</span>
            </h2>
            <p className="max-w-2xl mx-auto text-center text-lg">
                Explore stories and insights from our remote work community.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between py-12 space-y-6 md:space-y-0">
                {/* Left side: Testimonial */}
                <div className="md:w-1/2 space-y-6">
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
                        className="myTestimonialSwiper"
                    >
                        <SwiperSlide>
                            <div className="flex flex-col">
                                <div className="flex justify-between p-4">
                                    <div className="flex space-x-4">
                                        <div>
                                            <Image
                                                src={testimonial}
                                                alt="Remote worker"
                                                objectFit="cover"
                                                className="w-12 h-12 rounded-full dark:bg-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-md font-bold text-blue-500">Sarah Mitchell</h4>
                                            <span className="text-xs">— Product Manager, SaaS Startup</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 dark:text-yellow-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                            <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                                        </svg>
                                        <span className="text-xl font-bold">4.5</span>
                                    </div>
                                </div>
                                <div className="p-4 text-lg">
                                    "RemoteNest has completely changed how I approach work. The tools, community, and resources gave me the structure I needed to thrive remotely. I’ve become more productive while spending more time with my family — it’s the perfect balance."
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col">
                                <div className="flex justify-between p-4">
                                    <div className="flex space-x-4">
                                        <div>
                                            <Image
                                                src={testimonial}
                                                alt="Remote worker"
                                                objectFit="cover"
                                                className="w-12 h-12 rounded-full dark:bg-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-md font-bold text-blue-500">Rajiv Patel</h4>
                                            <span className="text-xs">— Full-Stack Developer, Freelancer</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 dark:text-yellow-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                            <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                                        </svg>
                                        <span className="text-xl font-bold">4.5</span>
                                    </div>
                                </div>
                                <div className="p-4 text-lg">
                                    "As a digital nomad, I’ve used countless platforms, but RemoteNest stands out. The onboarding was smooth, and the focus on collaboration without micromanagement is exactly what remote workers need. It feels like a team, even across time zones."
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col">
                                <div className="flex justify-between p-4">
                                    <div className="flex space-x-4">
                                        <div>
                                            <Image
                                                src={testimonial}
                                                alt="Remote worker"
                                                objectFit="cover"
                                                className="w-12 h-12 rounded-full dark:bg-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-md font-bold text-blue-500">Maria Lopez</h4>
                                            <span className="text-xs">— UX Designer, Creative Agency</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 dark:text-yellow-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                            <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                                        </svg>
                                        <span className="text-xl font-bold">4.5</span>
                                    </div>
                                </div>
                                <div className="p-4 text-lg">
                                    "RemoteNest provides an incredible remote culture — from async communication tips to curated tools, everything is built with intention. It's not just about remote work, it's about working well — wherever you are."
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col">
                                <div className="flex justify-between p-4">
                                    <div className="flex space-x-4">
                                        <div>
                                            <Image
                                                src={testimonial}
                                                alt="Remote worker"
                                                objectFit="cover"
                                                className="w-12 h-12 rounded-full dark:bg-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-md font-bold text-blue-500">James Carter</h4>
                                            <span className="text-xs">— Marketing Strategist, E-commerce Brand</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 dark:text-yellow-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                            <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                                        </svg>
                                        <span className="text-xl font-bold">4.5</span>
                                    </div>
                                </div>
                                <div className="p-4 text-lg">
                                    "I was skeptical about switching to remote, but RemoteNest made the transition seamless. The resources helped me build a remote-friendly workflow, and now I can’t imagine going back to an office. Plus, I’ve never been more focused!"
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col">
                                <div className="flex justify-between p-4">
                                    <div className="flex space-x-4">
                                        <div>
                                            <Image
                                                src={testimonial}
                                                alt="Remote worker"
                                                objectFit="cover"
                                                className="w-12 h-12 rounded-full dark:bg-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-md font-bold text-blue-500">Anika Bauer</h4>
                                            <span className="text-xs">— Virtual Assistant, Remote Team</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 dark:text-yellow-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                            <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                                        </svg>
                                        <span className="text-xl font-bold">4.5</span>
                                    </div>
                                </div>
                                <div className="p-4 text-lg">
                                    "RemoteNest gives me the flexibility to work from anywhere, without losing touch with my team. The platform feels human, not corporate — and that makes a huge difference. I feel valued, connected, and empowered every day."
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Right side: Image */}
                <div className="md:w-1/2 flex justify-end">
                    <div className="relative w-full max-h-[365px] h-100 overflow-hidden">
                        <Image
                            src={testimonial}
                            alt="Remote worker"
                            layout="fill"
                            objectFit="contain"
                            className="object-right"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;