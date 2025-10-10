// app/api/blog/moderate/route.js

import { getToken } from "next-auth/jwt";
import { connectToDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req) {
    const token = await getToken({ req, secret });

    if (!token || token.role !== "admin") {
        return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 });
    }

    await connectToDB();

    try {
        const pendingPosts = await BlogPost.find({ status: "pending" })
            .populate("author", "name avatar")
            .lean();

        return new Response(JSON.stringify({ posts: pendingPosts }), { status: 200 });
    } catch (err) {
        console.error("Error fetching pending posts:", err);
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}

export async function POST(req) {
    const token = await getToken({ req, secret });

    if (!token || token.role !== "admin") {
        return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 });
    }

    const body = await req.json();
    const { postId, action } = body;

    if (!postId || !["approve", "reject"].includes(action)) {
        return new Response(JSON.stringify({ message: "Invalid action" }), { status: 400 });
    }

    await connectToDB();

    const updateData = {
        status: action === "approve" ? "approved" : "rejected",
        approvedBy: token.id,
        approvedAt: new Date(),
    };

    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(postId, updateData, { new: true });
        if (!updatedPost) {
            return new Response(JSON.stringify({ message: "Post not found" }), { status: 404 });
        }
        return new Response(JSON.stringify({ message: `Post ${action}d`, post: updatedPost }), { status: 200 });
    } catch (err) {
        console.error("Moderation error:", err);
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}