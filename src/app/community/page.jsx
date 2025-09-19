
export default function CommunityPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-4xl font-bold mb-6">Community</h1>
                <p className="text-lg mb-4 text-center max-w-2xl">
                    Join our vibrant community of remote workers and digital nomads! Share your experiences, ask questions, and connect with like-minded individuals.
                </p>
                <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Community Forum</h2>
                    <p className="mb-4">
                        Participate in discussions, share tips, and get advice from fellow remote workers. Whether you're looking for productivity hacks, travel recommendations, or just want to chat, our forum is the place to be!
                    </p>
                    <a
                        href="https://community.remotenest.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Visit the Forum
                    </a>
                </div>
            </div>
        </div>
    );
}