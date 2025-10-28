import { connectToDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Booking } from "@/models/Booking";
import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/sendNotification"; // ✅ import your helper

export async function PATCH(req, { params }) {
    await connectToDB();
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { adminStatus } = await req.json();

    if (!["approved", "rejected", "cancelled"].includes(adminStatus)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await Booking.findByIdAndUpdate(id, { adminStatus }, { new: true })
        .populate("user", "name _id")
        .populate("city", "name");

    if (!updated) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // ✅ Notify the user about the admin’s action
    try {
        const statusMessages = {
            approved: "has been approved 🎉",
            rejected: "was rejected ❌",
            cancelled: "has been cancelled 🚫",
        };

        await sendNotification({
            toUser: updated.user._id,
            senderId: session.user.id, // ✅ fixed here
            title: "Booking Update",
            message: `Your booking for ${updated.city.name} ${statusMessages[adminStatus]}`,
            type: "booking",
        });
    } catch (notifyErr) {
        console.error("⚠️ Notification send failed:", notifyErr);
    }

    return NextResponse.json({
        success: true,
        booking: updated,
        message: `Booking ${adminStatus} successfully.`,
    });
}