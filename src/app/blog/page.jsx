"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query params with default values
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "9", 10);
  const sort = searchParams.get("sort") || "newest";
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    totalPages: 1,
    totalDocs: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fetch posts from API with params
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("limit", String(limit));
      params.append("sort", sort);
      if (category) params.append("category", category);
      if (search) params.append("search", search);

      const res = await fetch(`/api/blog/list?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const json = await res.json();

      setPosts(json.posts || []);
      setPagination(json.pagination || pagination);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
      setPagination({
        page: 1,
        limit: 9,
        totalPages: 1,
        totalDocs: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, category, search]);

  // Update URL query params
  const changeParam = (param, value, resetPage = true) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) newParams.set(param, value);
    else newParams.delete(param);

    if (resetPage) newParams.set("page", "1");

    router.push(`/blog?${newParams.toString()}`);
  };

  // Handle search form submit
  const doSearch = (ev) => {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const val = (form.get("search") || "").toString().trim();
    changeParam("search", val);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={category}
          onChange={(e) => changeParam("category", e.target.value)}
          className="border p-2"
        >
          <option value="">All Categories</option>
          <option value="remote work">Remote Work</option>
          <option value="tax/legal">Tax / Legal</option>
          <option value="travel tips">Travel Tips</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="other">Other</option>
        </select>

        <select
          value={sort}
          onChange={(e) => changeParam("sort", e.target.value)}
          className="border p-2"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title_asc">Title A → Z</option>
          <option value="title_desc">Title Z → A</option>
        </select>

        <form onSubmit={doSearch} className="flex items-center">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search..."
            className="border p-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 ml-2 hover:bg-blue-700 transition"
          >
            Go
          </button>
        </form>
      </div>

      {/* Post List */}
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
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
      )}

      {/* Pagination */}
      {pagination.totalDocs > 0 && pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => changeParam("page", String(p), false)} // ✅ don't reset page
              className={`px-3 py-1 border rounded ${p === pagination.page ? "bg-blue-600 text-white" : ""
                }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}