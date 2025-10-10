import { connectToDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export async function GET(req) {
    const url = new URL(req.url);

    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const sort = url.searchParams.get("sort") || "newest";
    const category = url.searchParams.get("category") || "";
    const search = url.searchParams.get("search") || "";

    await connectToDB();

    const filter = { status: "approved" }; // Only show approved posts

    if (category) {
        filter.category = category;
    }

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { excerpt: { $regex: search, $options: "i" } },
            // If your content structure is more complex, adjust this accordingly:
            // { "content.text": { $regex: search, $options: "i" } },
        ];
    }

    const sortOptions = {
        newest: { createdAt: -1 },
        oldest: { createdAt: 1 },
        title_asc: { title: 1 },
        title_desc: { title: -1 },
    };

    const sortBy = sortOptions[sort] || sortOptions.newest;
    const skip = (page - 1) * limit;

    try {
        const [posts, totalDocs] = await Promise.all([
            BlogPost.find(filter)
                .sort(sortBy)
                .skip(skip)
                .limit(limit)
                .populate("author", "name avatar")
                .lean(),
            BlogPost.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(totalDocs / limit);

        return new Response(
            JSON.stringify({
                posts,
                pagination: { page, limit, totalPages, totalDocs },
            }),
            { status: 200 }
        );
    } catch (err) {
        console.error("Error fetching posts:", err);
        return new Response(
            JSON.stringify({ message: "Server error fetching posts" }),
            { status: 500 }
        );
    }
}