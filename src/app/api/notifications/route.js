import { connectToDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectToDB();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await Notification.find({ userId: session.user.id })
        .sort({ createdAt: -1 })
        .limit(20);

    return NextResponse.json(notifications);
}

export async function POST(req) {
    await connectToDB();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, senderId, title, message, type } = await req.json();

    if (!userId || !title || !message) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const notification = await Notification.create({
        userId,
        senderId: senderId || session.user.id,
        title,
        message,
        type: type || "general",
        isRead: false,
    });

    return NextResponse.json(notification);
}

export async function PATCH(req) {
    await connectToDB();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await Notification.updateMany(
        { _id: { $in: ids }, userId: session.user.id },
        { $set: { isRead: true } }
    );

    return NextResponse.json({ success: true });
}