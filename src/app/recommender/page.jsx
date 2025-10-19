export default function AiRecommenderPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 lg:px-0">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">AI Recommender System</h1>
            <p className="text-lg mb-4">Get personalized recommendations powered by AI.</p>
            <div className="w-full max-w-md p-6 rounded shadow-md">
                <label htmlFor="input" className="block text-sm font-medium mb-2">Enter your preferences:</label>
                <input
                    type="text"
                    id="input"
                    className="w-full p-2 border border-gray-300 rounded mb-4 bg-gray-50"
                    placeholder="e.g., technology, remote work"
                />
                <button className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 rounded">
                    Get Recommendations
                </button>
            </div>
        </div>
    );  
}