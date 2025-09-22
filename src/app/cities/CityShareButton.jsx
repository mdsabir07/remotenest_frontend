"use client";
import { useEffect, useState } from "react";
import { FaShareSquare } from "react-icons/fa";

const CityShareButton = ({ id }) => {
  const [shareUrl, setShareUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/cities/${id}`);
    }
  }, [id]);

  return (
    <>
      {/* Share button */}
      <button onClick={() => setIsOpen(true)} className="btn">
        <FaShareSquare size={24} className="text-gray-600 
    cursor-pointer 
    hover:text-white 
    hover:bg-blue-500 
    rounded-full 
    transition 
    duration-300 
    ease-in-out"/>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-5">
            <h2 className="text-lg font-bold mb-3 text-center">
              Share this City
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                  target="_blank"
                  className="block px-4 py-2 bg-sky-500 text-white rounded-lg text-center"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  className="block px-4 py-2 bg-blue-800 text-white rounded-lg text-center"
                >
                  LinkedIn
                </a>
              </li>
            </ul>

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CityShareButton;
