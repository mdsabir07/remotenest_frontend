import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import slugify from "slugify";
import { sendNotification } from "@/lib/sendNotification";

export async function POST(req) {
    const session = await getServerSession(authOptions); // ← won't work correctly without req/res in App Router

    // ✅ Better: use headers from the `req` to extract session
    // const session = await getServerSession({ req, ...authOptions }); ← Only works in Pages Router
    // OR switch to getToken() if needed

    if (!session || !session.user?.id) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        });
    }

    const body = await req.json();
    const { title, content, category, coverImage } = body;

    if (!title || !content || !category) {
        return new Response(
            JSON.stringify({ message: "Missing required fields" }),
            { status: 400 }
        );
    }

    await connectToDB();

    let slug = slugify(title, { lower: true, strict: true });
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
        slug = slug + "-" + Date.now();
    }

    const extractTextFromContent = (content) => {
        if (!content || !content.content) return "";
        const walk = (nodes) => {
            return nodes
                .map((node) => {
                    if (node.type === "text") return node.text;
                    if (node.content) return walk(node.content);
                    return "";
                })
                .join(" ");
        };
        return walk(content.content);
    };

    const plainText = extractTextFromContent(content);
    const excerpt =
        plainText.length > 200 ? plainText.slice(0, 200) + "..." : plainText;

    try {
        const newPost = new BlogPost({
            title,
            slug,
            content,
            excerpt,
            coverImage,
            category,
            author: session.user.id,
            status: "pending", // ✅ Fixed
        });

        await newPost.save();

        // Notify all admins
        await sendNotification({
            toRole: "admin",
            toSenderId: session.user.id,
            title: "New Blog submitted",
            message: `A new blog "${title}" was submitted by ${session.user.name || "a user"}.`,
            type: "info",
        });

        // Notify the author
        await sendNotification({
            toUser: session.user.id,
            toSenderId: session.user.id,
            title: "Blog Submission Received",
            message: `Your blog "${title}" has been received and is pending review.`,
            type: "success",
        });

        return new Response(
            JSON.stringify({ message: "Created for review", post: newPost }),
            { status: 201 }
        );
    } catch (err) {
        console.error("Error creating blog:", err);
        return new Response(
            JSON.stringify({ message: "Server error", error: err.message }),
            { status: 500 }
        );
    }
}