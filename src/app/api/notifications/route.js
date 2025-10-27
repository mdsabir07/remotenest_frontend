import { connectToDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";

export async function GET(req) {
    await connectToDB();
    const session = await getServerSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const notifications = await Notification.find({ userId: session.user.id })
        .sort({ createdAt: -1 })
        .limit(20);

    return Response.json(notifications);
}

export async function POST(req) {
    await connectToDB();
    const { userId, senderId, title, message, type } = await req.json();
    const notifications = await Notification.create({ userId, senderId, title, message, type });
    return Response.json(notifications);
}

export async function PATCH(req) {
    await connectToDB();
    const { ids } = await req.json(); // array of notification IDs to mark as read
    await Notification.updateMany({ _id: { $in: ids } }, { isRead: true });
    return Response.json({ success: true });
}