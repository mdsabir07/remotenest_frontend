"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminBlogModeration() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn(); // redirect to login
        } else if (status === "authenticated" && session?.user?.role !== "admin") {
            router.push("/unauthorized"); // redirect if not admin
        }
    }, [status, session, router]);

    const fetchPending = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/blog/moderate");
            const json = await res.json();
            console.log("Fetched posts:", json);
            setPosts(Array.isArray(json.posts) ? json.posts : []);
        } catch (err) {
            console.error("Error fetching posts", err);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated" && session?.user?.role === "admin") {
            fetchPending();
        }
    }, [status, session]);

    const moderate = async (postId, action) => {
        const res = await fetch("/api/blog/moderate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId, action }),
        });
        const json = await res.json();
        if (res.ok) {
            setPosts((prev) => prev.filter((p) => p._id !== postId));
        } else {
            alert(json.message || "Error");
        }
    };

    if (status === "loading") return <p>Loading session...</p>;
    if (status === "unauthenticated") return <p>Redirecting to login...</p>;
    if (session?.user?.role !== "admin") return <p>Redirecting...</p>;

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4">Pending Blog Posts</h1>
            {loading ? (
                <p>Loading posts...</p>
            ) : posts.length === 0 ? (
                <p>No pending posts.</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="mb-6 border p-4">
                        <h2 className="text-xl font-semibold">{post.title}</h2>

                        {post.author ? (
                            <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                                <img
                                    src={post.author.avatar || "/default-avatar.png"}
                                    alt={post.author.name}
                                    className="w-6 h-6 rounded-full"
                                />
                                <span>{post.author.name}</span>
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500 mb-2">Unknown author</p>
                        )}

                        <p className="text-gray-800 mb-2">
                            {post.excerpt || (typeof post.content === "string"
                                ? post.content.slice(0, 200)
                                : "[No preview available]")}
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={() => moderate(post._id, "approve")}
                                className="bg-green-600 text-white px-3 py-1 rounded"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => moderate(post._id, "reject")}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}