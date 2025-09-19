export default function BlogDetailPage({ params }) {
    const { id } = params;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">    
                <h1 className="text-4xl font-bold mb-6">Blog Post: {id}</h1>
                <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Blog Content</h2>   
                    <p className="mb-4">
                        This is a detailed view of the blog post with ID: {id}. Here you can add the full content of the blog post, including text, images, and other media.
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