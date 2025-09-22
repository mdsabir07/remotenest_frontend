import SingleCitiesData from "../SingleCitiesData";

async function getCities() {
  const res = await fetch('/api/cities', {
    cache: 'no-store'
  });
  return res.json();
}
export default async function CitiesDetails({ params }) {
  const cities = await getCities();
  const Data = cities?.cities;
  const { id } = await params;

  const singleData = Data.find(d => d._id === id);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-600">
          🌆 City Details
        </h1>
        <p className="mt-2 text-gray-600">
          Explore everything you need to know about this city.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
          {/* Single Data Component */}
          <SingleCitiesData singleData={singleData} />
        </div>
      </div>
    </div>
  );
}