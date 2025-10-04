"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";


const BlogDetails = ({ SingleBlog }) => {
    if (!SingleBlog) {
        return (
            <div className="text-center py-20 text-gray-600">
                Loading blog details...
            </div>
        );
    }

    const {
        title,
        author,
        publishedAt,
        coverImage,
        content,
        readingTime,
        tags,
    } = SingleBlog;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="relative w-full h-[400px]">
                <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-snug">
                        {title}
                    </h1>
                    <p className="text-gray-200 text-sm md:text-base">
                        ✍️ By {author} • 🕒 {readingTime} read
                    </p>
                    <p className="text-gray-300 text-xs mt-1">
                        Published on {new Date(publishedAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Blog Content */}
            <div className="max-w-4xl mx-auto py-10 px-4 md:px-6">
                <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
                        {content}
                    </p>

                    {/* Tags */}
                    {tags && (
                        <div className="mt-8 flex flex-wrap gap-2">
                            {tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Divider */}
                    <div className="mt-10 border-t border-b border-gray-200 py-6 text-gray-500 text-sm">
                        <p>
                            🗓️ Last updated on{" "}
                            <span className="font-medium">
                                {new Date(publishedAt).toDateString()}
                            </span>
                        </p>
                    </div>

                    {/* share post */}
                    <div className="my-8 p-4 bg-gray-300 rounded-lg shadow-md flex flex-wrap items-center justify-center gap-4">
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
        </div>
    );
};

export default BlogDetails;
