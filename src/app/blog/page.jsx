export default function BlogPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">    
                <h1 className="text-4xl font-bold mb-6">Blog</h1>
                <p className="text-lg mb-4 text-center max-w-2xl">
                    Welcome to the RemoteNest Blog! Here, we share insights, tips, and stories about remote work, digital nomadism, and productivity. Stay tuned for the latest updates and articles to help you thrive in your remote work journey.
                </p>
                <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
                    <p className="mb-4">
                        Explore our collection of articles covering a wide range of topics including remote work best practices, tools and technologies, work-life balance, travel tips for digital nomads, and much more.
                    </p>
                    <a
                        href="https://blog.remotenest.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Visit the Blog
                    </a>
                </div>
            </div>
        </div>
    );
}