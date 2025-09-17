import React from 'react';
import SingleFeaturedCities from './SingleFeaturedCities';

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
  }
];
const FeaturedCities = () => {
    return (
        <div>
           
            <h1>this is FeaturedCi</h1>
            <div>
                {
                    FeaturedCitiesData.map((featuredData) => <SingleFeaturedCities key={featuredData.id} featuredData={featuredData}></SingleFeaturedCities>)
                }
            </div>
        </div>
    );
};

export default FeaturedCities;