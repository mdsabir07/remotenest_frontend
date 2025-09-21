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
    <div className=" bg-gray-50 dark:bg-gray-900">
      <div
        className="relative h-[500px] flex flex-col items-center justify-center text-white px-6"
        style={{
          backgroundImage: `url(https://i.ibb.co.com/jvy95PKT/end-game-1-2.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Explore Vibrant Cities Worldwide
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-6 text-gray-200">
            Explore diverse skylines, cultures, and communities from around the world —
            where innovation meets tradition and every city tells its own story.
          </p>
          <button className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg shadow-md hover:bg-emerald-700 transition duration-300">
            Explore Cities
          </button>
        </div>
      </div>
      {/* Section Title */}
      <div className="text-center my-16">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white text-center">
          🌍 Discover the <span className="text-blue-600">World’s Best Cities</span>
        </h1>
        <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-center">
          Explore vibrant destinations across the globe with detailed insights on living costs,
          internet speed, and lifestyle — helping you find the perfect place for remote work and travel.
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