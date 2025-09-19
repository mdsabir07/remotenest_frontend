import SingleFeaturedCities from "../components/SingleFeaturedCities";

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

export default function CitiesPage() {
    return (
       <div className="py-12 bg-gray-50 dark:bg-gray-900">
  {/* Section Title */}
  <div className="text-center mb-10">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
      🌆 All Cities
    </h1>
    <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      Explore the most popular destinations for remote work & travel
    </p>
  </div>

  {/* Cities Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {FeaturedCitiesData.map((featuredData) => (
      <div
        key={featuredData.id}
      >
        <SingleFeaturedCities featuredData={featuredData} />
      </div>
    ))}
  </div>
</div>

    );
}