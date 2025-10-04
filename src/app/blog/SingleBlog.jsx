import Link from 'next/link';
import React from 'react';

const SingleBlog = ({blog}) => {
    const {title, coverImage, author, content, id} = blog;
    return (
         <div className="max-w-sm bg-base-100 shadow-xl rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      {/* Image Section */}
      <div className="w-full h-48">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-snug">
          {title}
        </h3>
        <p className="text-gray-600 text-base mb-4 line-clamp-2">{content}</p>

        <div className="text-base text-gray-700 mb-4 flex items-center justify-between">
          <p> {author}</p>
          <Link href={`/blog/${id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition ">
          Read More
        </Link>
        </div>
      </div>
    </div>
    );
};

export default SingleBlog;