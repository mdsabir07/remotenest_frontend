"use client";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BookingForm from "@/components/BookingForm";

const SingleCitiesData = ({ singleData, }) => {
  const { data: session } = useSession();
  const user = session?.user?.name;
  const userId = session?.user?.id;
  const router = useRouter();
  // const userEmail = data.user.email;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState('')

  const [cityReviews, setCityReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [error, setError] = useState(null);

  if (!singleData) {
    return <p className="text-center py-10">No city data available.</p>;
  }

  const {
    _id,
    name,
    country,
    featuredImage,
    description,
    connectivity,
    cost,
    location,
    tags,
    averageRating,
    reviewCount,
    status,
    createdAt,
    approvedAt,
  } = singleData;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/cities/${singleData._id}/reviews`);
        const data = await res.json();
        setCityReviews(data.reviews || []);
      } catch (err) {
        setError("Failed to load reviews.");
        console.error("Error fetching reviews:", err);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [singleData._id]);

  // handleReviewSubmit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      alert("Please log in to submit a review.");
      return;
    }

    if (!rating || !review.trim()) {
      alert("Rating and review text are required.");
      return;
    }

    const userAvatar = session?.user?.avatar;
    const payload = {
      rating,
      title: `Review by ${user}`,
      body: review,
      avatar: userAvatar,
    };

    try {
      const res = await fetch(`/api/cities/${_id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to post review");

      const data = await res.json();

      // Update UI
      setCityReviews((prev) => [...prev, {
        userName: user,
        rating,
        body: review,
        avatar: userAvatar,
      }]);

      setReview("");
      setRating(0);
    } catch (err) {
      console.error("Review submit error:", err);
      alert("Failed to submit review.");
    }
  };


  return (
    <div className="rounded shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* City Image */}
      <div className="relative">
        <Image
          src={featuredImage}
          alt={name}
          width={600}
          height={600}
          className="w-full h-60 md:h-100 object-cover"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-3xl font-bold text-white">
            {name}, <span className="text-gray-300">{country}</span>
          </h2>
          <div className="flex gap-2 mt-2 flex-wrap">
            {tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* City Info */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <p className="text-base leading-relaxed whitespace-pre-line">
          {description}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border border-gray-100 rounded shadow">
            <p className="text-sm">💵 Monthly Rent</p>
            <p className="font-semibold text-blue-500">
              {cost?.rent ? `$${cost.rent}` : "150–450$ (avg)"}
            </p>
          </div>
          <div className="p-4 border border-gray-100 rounded shadow">
            <p className="text-sm">🍛 Food Cost</p>
            <p className="font-semibold text-blue-500">
              {cost?.food ? `$${cost.food}` : "100–200$"}
            </p>
          </div>
          <div className="p-4 border border-gray-100 rounded shadow">
            <p className="text-sm">🚕 Transport</p>
            <p className="font-semibold text-blue-500">
              {cost?.transport ? `$${cost.transport}` : "20–50$"}
            </p>
          </div>
          <div className="p-4 border border-gray-100 rounded shadow">
            <p className="text-sm">🌐 Avg Internet</p>
            <p className="font-semibold text-blue-500">
              {connectivity?.avgDownloadMbps
                ? `${connectivity.avgDownloadMbps} Mbps`
                : "30–60 Mbps"}
            </p>
          </div>
          <div className="p-4 border border-gray-100 rounded shadow">
            <p className="text-sm">📶 Mobile Coverage</p>
            <p className="font-semibold text-blue-500">
              {connectivity?.mobileCoverage}
            </p>
          </div>
          <div className="p-4 border border-gray-100 rounded shadow">
            <p className="text-sm">⭐ Average Rating</p>
            <p className="font-semibold text-blue-500">
              {averageRating}/5 ({reviewCount} reviews)
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="mt-6 bg-orange-100/15 p-4 rounded flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="">
            <h3 className="font-semibold mb-2">📍 Location</h3>
            <p className="text-sm">
              Latitude: {location?.lat}, Longitude: {location?.lng}
            </p>
          </div>
          {/* Booking form */}
          <BookingForm cityId={_id} rent={cost?.rent || 300} session={session} />

        </div>


        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-between mt-6 text-sm">
          <p>Status: <span className="font-medium text-blue-500">{status}</span></p>
          <p>Approved At: {new Date(approvedAt).toLocaleDateString()}</p>
          <p>Created: {new Date(createdAt).toLocaleDateString()}</p>
        </div>

        {/* 🔥 User Review Section */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-bold mb-4">💬 User Reviews</h3>

          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className="p-4 rounded shadow-md">
            <p className="text-sm mb-2">Leave a review</p>
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                  className={`cursor-pointer transition-colors ${(hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                  size={22}
                />
              ))}
            </div>
            <textarea
              rows="3"
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your experience..."
              className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
            ></textarea>
            <button
              type="submit"
              disabled={loadingReviews || !rating}
              className={`mt-3 px-5 py-2 rounded-lg cursor-pointer shadow transition ${loadingReviews || !rating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
            >
              Submit Review
            </button>

          </form>
          {error && <p className="text-red-500">{error}</p>}

          <div className="mt-6 space-y-4">
            {loadingReviews ? (
              <p>Loading reviews...</p>
            ) : cityReviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              cityReviews.map((rev, idx) => (
                <div key={idx} className="p-4 border border-gray-300 rounded shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatarUrl || '/default-avatar.png'}
                        alt={`${rev.userName || 'Anonymous'}'s avatar`}
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                      <p className="font-semibold capitalize text-blue-500">{rev.userName || "Anonymous"}</p>
                    </div>
                    <span className="flex text-yellow-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{rev.body}</p>
                </div>
              ))
            )}
          </div>

        </div>
        {/* share post */}
        <div className="mt-8 p-4 flex flex-wrap items-center justify-center gap-4">
          <span className="font-semibold text-gray-700">Share this post:</span>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-2xl hover:scale-110 transition-transform"
          >
            <FaFacebook />
          </a>

          {/* Twitter (X) */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 text-2xl hover:scale-110 transition-transform"
          >
            <FaTwitter />
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 text-2xl hover:scale-110 transition-transform"
          >
            <FaLinkedin />
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 text-2xl hover:scale-110 transition-transform"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleCitiesData;
