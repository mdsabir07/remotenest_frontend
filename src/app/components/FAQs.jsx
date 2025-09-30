"use client";

import { useState } from "react";

const FAQs = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggle = (idx) => {
        if (openIndex === idx) {
            setOpenIndex(null);
        } else {
            setOpenIndex(idx);
        }
    };
    return (
        <div className="flow-root">
            <div className="-my-4 flex flex-col divide-y divide-gray-200">
                {faqs.map((item, idx) => (
                    <div key={idx} className="group py-4">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full text-left gap-1.5"
                            onClick={() => toggle(idx)}
                        >
                            <h2 className="text-lg font-medium">{item.question}</h2>
                            <svg
                                className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIndex === idx ? "-rotate-180" : "rotate-0"
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        <div
                            className={`mt-4 transition-[max-height] duration-300 ease-in-out overflow-hidden ${openIndex === idx ? "max-h-96" : "max-h-0"
                                }`}
                        >
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default FAQs;