import { connectToDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata({ params }) {
    const { slug } = params;
    await connectToDB();
    const post = await BlogPost.findOne({ slug, status: "approved" }).lean();

    if (!post) {
        return { title: "Not found" };
    }
    return {
        title: post.title,
        description: post.excerpt || post.title,
    };
}

export default async function BlogDetailPage({ params }) {
    try {
        const { slug } = params;
        await connectToDB();

        const post = await BlogPost.findOne({ slug, status: "approved" })
            .populate("author", "name avatar");
        // .lean(); ← DO NOT use lean for now

        if (!post) {
            return <div className="p-4">Post not found.</div>;
        }

        const markdownContent =
            typeof post.content === "string"
                ? post.content
                : post.content?.markdown || JSON.stringify(post.content);

        return (
            <div className="max-w-5xl mx-auto">
                {post.coverImage && (
                    <img src={post.coverImage} alt="" className="w-full h-auto mb-4" />
                )}
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

                <div className="text-sm text-gray-500 flex items-center gap-2 mb-4">
                    <img
                        src={post.author?.avatar || "/default-avatar.png"}
                        alt={post.author?.name || "Author"}
                        className="w-8 h-8 rounded-full"
                    />
                    <span>{post.author?.name || "Unknown"}</span>
                    <span>• {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Unknown date"}</span>
                    <span>• {post.category}</span>
                </div>

                <div className="prose max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {markdownContent}
                    </ReactMarkdown>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching post:", error);
        return (
            <div className="text-red-500 p-4">
                An error occurred while loading the post.
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
        );
    }
}