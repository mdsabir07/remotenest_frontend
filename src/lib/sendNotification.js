// lib/sendNotification.js
import { User } from "@/models/User";
import { connectToDB } from "./mongodb";
import Notification from "@/models/Notification";

export async function sendNotification({
    toRole,
    toUser,
    senderId,
    title,
    message,
    type = "general"
}) {
    if (!title || !message) {
        console.warn("⚠️ sendNotification called without title/message");
        return;
    }

    await connectToDB();

    try {
        // ✅ Send to all users of a specific role (e.g., all admins)
        if (toRole) {
            const users = await User.find({ role: toRole }, "_id");
            if (users.length > 0) {
                const notifications = users.map((user) => ({
                    userId: user._id,
                    senderId,
                    title,
                    message,
                    type,
                    isRead: false,
                }));
                await Notification.insertMany(notifications);
            }
        }

        // ✅ Send to a specific user
        if (toUser) {
            await Notification.create({
                userId: toUser,
                senderId,
                title,
                message,
                type,
                isRead: false,
            });
        }
    } catch (err) {
        console.error("❌ Error in sendNotification:", err);
    }
}