// components/PostGrid.jsx
import Link from "next/link";

export default function PostGrid({ posts = [], limit }) {
    // If limit is provided, slice the posts
    const displayPosts = limit ? posts.slice(0, limit) : posts;

    if (!displayPosts.length) {
        return <p>No posts found.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((post) => (
                <div key={post._id} className="mb-8 shadow-md hover:shadow-lg pb-4">
                    {post.coverImage && (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-48 object-cover rounded mb-2 bg-no-repeat"
                        />
                    )}
                    <div className="p-3">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-xl font-semibold text-primary hover:underline"
                        >
                            {post.title}
                        </Link>
                        <div className="text-sm flex items-center text-gray-500 gap-2 mt-1">
                            <img
                                src={post.author?.avatar || "/default-avatar.png"}
                                alt={post.author?.name || "Author"}
                                className="w-6 h-6 rounded-full"
                            />
                            <span>{post.author?.name || "Unknown"}</span>
                            <span>• {new Date(post.createdAt).toLocaleDateString()}</span>
                            <span>• {post.category}</span>
                        </div>
                        <p className="mt-2">
                            {post.excerpt ||
                                (post.content
                                    ? JSON.stringify(post.content).slice(0, 100) + "..."
                                    : "No excerpt available.")}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}