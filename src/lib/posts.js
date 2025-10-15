import { connectToDB } from "@/lib/mongodb";
import { getBlogPostModel } from "@/models/BlogPost";


export async function fetchLatestPosts(limit = 3) {
  await connectToDB(); // ensure DB is ready
  const BlogPost = getBlogPostModel(); // register model only after connect

  return BlogPost.find({ status: "approved" })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("author", "name avatar")
    .lean();
}