"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ReviewData = [
    {
        id: 1,
        name: "Ayesha Rahman",
        avatar: "https://i.pravatar.cc/150?img=32",
        reviewText:
            "This platform really helped me connect with like-minded people in the community. I love how simple the UI is!",
        rating: 5,
    },
    {
        id: 2,
        name: "Tanvir Hasan",
        avatar: "https://i.pravatar.cc/150?img=12",
        reviewText:
            "Nice experience overall. The review section makes it easier to see what others are saying before joining events.",
        rating: 4,
    },
    {
        id: 3,
        name: "Mehedi Alam",
        avatar: "https://i.pravatar.cc/150?img=45",
        reviewText:
            "Good initiative, but I think the mobile layout can be improved a bit. Otherwise, very helpful.",
        rating: 3,
    },
    {
        id: 4,
        name: "Nusrat Jahan",
        avatar: "https://i.pravatar.cc/150?img=27",
        reviewText:
            "I found some great tips shared by the community. Really useful feature for new members.",
        rating: 4,
    },
    {
        id: 5,
        name: "Rakibul Islam",
        avatar: "https://i.pravatar.cc/150?img=8",
        reviewText:
            "The star rating system makes it very transparent. Highly recommend this community to others.",
        rating: 5,
    },
];

const CommunityHighlight = () => {
    return (
        <div className="py-10" >
            <h2 className="text-4xl md:font-5xl mb-4 font-bold text-center">
                Community <span className="text-blue-600">Highlights</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-center mb-10 text-lg">
                Discover inspiring stories, experiences, and insights shared by our vibrant
                community. Stay connected, get motivated, and explore how others are making
                the most of remote work and travel.
            </p>
            <div className="h-[500px] pt-16" style={{ backgroundImage: `url(https://i.ibb.co.com/N6WVsRHN/end-game-1-1.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}         // mobile view
                    centeredSlides={true}     // centered card
                    loop={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    speed={3000}
                    breakpoints={{
                        768: { slidesPerView: 2 }, // tablet
                        1024: { slidesPerView: 3 }, // desktop
                    }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 "
                >
                    {ReviewData.map((singleData) => (
                        <SwiperSlide key={singleData.id}>
                            {({ isActive }) => (
                                <div
                                    className={`max-w-sm w-full bg-white border border-gray-200 rounded-xl shadow-md py-6 text-center flex flex-col justify-between min-h-[320px]
            transform transition-transform duration-500
            ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-50"}`}
                                >
                                    <div className="text-blue-500 text-4xl font-bold mb-3">“</div>
                                    <img
                                        src={singleData.avatar}
                                        alt={singleData.name}
                                        className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
                                    />
                                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                                        {singleData.reviewText}
                                    </p>
                                    <div className="flex justify-center mb-2">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span
                                                key={i}
                                                className={`text-xl ${i < singleData.rating ? "text-yellow-400" : "text-gray-300"
                                                    }`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="font-semibold text-gray-800">{singleData.name}</h3>
                                    <p className="text-sm text-gray-500">{singleData.role}</p>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default CommunityHighlight;
