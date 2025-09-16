import { connectToDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export async function fetchLatestPosts(limit = 3) {
    await connectToDB();

    return BlogPost.find({ status: "approved" })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("author", "name avatar")
        .lean();
}