import React from 'react';
import SingleFeaturedCities from './SingleFeaturedCities';
import Link from 'next/link';

const FeaturedCitiesData = [
    {
        "id": 1,
        "city": "Bangkok",
        "country": "Thailand",
        "image": "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
        "monthlyCost": 950,
        "wifiSpeed": 75
    },
    {
        "id": 2,
        "city": "Bali",
        "country": "Indonesia",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        "monthlyCost": 800,
        "wifiSpeed": 65
    },
    {
        "id": 3,
        "city": "Lisbon",
        "country": "Portugal",
        "image": "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
        "monthlyCost": 1200,
        "wifiSpeed": 90
    },
    {
        "id": 4,
        "city": "Barcelona",
        "country": "Spain",
        "image": "https://images.unsplash.com/photo-1505735444283-57e44ae4cc22",
        "monthlyCost": 1400,
        "wifiSpeed": 100
    },
    {
        "id": 5,
        "city": "Tbilisi",
        "country": "Georgia",
        "image": "https://images.unsplash.com/photo-1618573622956-8e8c1f8f1d9d",
        "monthlyCost": 700,
        "wifiSpeed": 60
    },
    {
        "id": 6,
        "city": "Chiang Mai",
        "country": "Thailand",
        "image": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
        "monthlyCost": 600,
        "wifiSpeed": 55
    },
    {
        "id": 7,
        "city": "Tbilisi",
        "country": "Georgia",
        "image": "https://images.unsplash.com/photo-1618573622956-8e8c1f8f1d9d",
        "monthlyCost": 700,
        "wifiSpeed": 60
    },
    {
        "id": 8,
        "city": "Chiang Mai",
        "country": "Thailand",
        "image": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
        "monthlyCost": 600,
        "wifiSpeed": 55
    }
];
const FeaturedCities = () => {
    return (
        <div className="py-12 bg-gray-50">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                🌆 Featured Cities
            </h2>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {FeaturedCitiesData.map((featuredData) => (
                    <SingleFeaturedCities
                        key={featuredData.id}
                        featuredData={featuredData}
                    />
                ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-10">
                < Link href="/cities" className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 border border-emerald-500 rounded-lg shadow-sm hover:bg-emerald-600 hover:text-white hover:shadow-md transition-all duration-300">
                    View All Cities
                    <span className="text-lg">→</span>
                </Link>
            </div>
        </div>

    );
};

export default FeaturedCities;