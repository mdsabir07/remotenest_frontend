export default function AiRecommenderPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-6">AI Recommender System</h1>
            <p className="text-lg mb-4">Get personalized recommendations powered by AI.</p>
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <label htmlFor="input" className="block text-sm font-medium mb-2">Enter your preferences:</label>
                <input
                    type="text"
                    id="input"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="e.g., technology, remote work"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Get Recommendations
                </button>
            </div>
        </div>
    );  
}