// app/api/cities/[id]/reviews/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import City from "@/models/City";
import { User } from "@/models/User";

export async function POST(req, context) {
    const { params } = await context;
    try {
        const session = await getServerSession(authOptions);
        console.log("🧠 SESSION IN POST API:", session);

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        await connectToDB();

        const requestingUser = await User.findById(userId);
        if (!requestingUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = await req.json();
        const { rating, title, body } = payload || {};

        if (!rating || !title || !body) {
            return NextResponse.json(
                { error: "Missing required fields: rating, title, and body" },
                { status: 400 }
            );
        }

        const cityId = params.id;
        const city = await City.findById(cityId);
        if (!city) {
            return NextResponse.json({ error: "City not found" }, { status: 404 });
        }

        const newReview = {
            userId,
            userName: requestingUser.name,
            userAvatar: requestingUser.avatar,
            rating,
            title,
            body,
            createdAt: new Date(),
        };

        city.reviews.push(newReview);
        city.recalculateRating();

        await city.save();

        return NextResponse.json({ message: "Review added successfully", city }, { status: 201 });
    } catch (err) {
        console.error("/api/cities/[id]/reviews POST error:", err?.message, err?.errors);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req, context) {
    const { params } = await context;
    try {
        await connectToDB();

        const cityId = params.id;
        const city = await City.findById(cityId).populate("reviews.userId", "name avatar");

        if (!city) {
            return NextResponse.json({ error: "City not found" }, { status: 404 });
        }

        const reviewsWithUserInfo = city.reviews.map((rev) => ({
            _id: rev._id,
            rating: rev.rating,
            title: rev.title,
            body: rev.body,
            userName: rev.userId?.name || rev.userName || "Anonymous",
            avatarUrl: rev.userId?.avatar || rev.userAvatar || "/default-avatar.png",
            createdAt: rev.createdAt,
        }));

        return NextResponse.json({ reviews: reviewsWithUserInfo }, { status: 200 });
    } catch (err) {
        console.error("/api/cities/[id]/reviews GET error:", err?.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}