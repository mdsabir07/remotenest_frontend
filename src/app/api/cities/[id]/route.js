import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import City from "@/models/City";
import { User } from "@/models/User";

// PATCH: allow admin to change status to 'approved' or 'pending' (and set approvedBy/approvedAt appropriately).
export async function PATCH(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectToDB();
        const user = await User.findById(session.user.id);
        if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        const id = params.id;
        const body = await req.json();
        const { status } = body;
        if (!["approved", "pending", "rejected"].includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const update = { status, updatedBy: user._id };
        if (status === "approved") {
            update.approvedBy = user._id;
            update.approvedAt = new Date();
        } else {
            update.approvedBy = null;
            update.approvedAt = null;
        }

        const updated = await City.findByIdAndUpdate(id, update, { new: true });
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

        // ✅ Notify the city creator about approval/rejection
        await sendNotification({
            toUser: updated.createdBy,
            toSenderId: user._id,
            title: `City ${status === "approved" ? "Approved" : status === "rejected" ? "Rejected" : "Updated"}`,
            message: `Your city "${updated.name}" has been marked as ${status}.`,
            type: status === "approved" ? "success" : status === "rejected" ? "error" : "info",
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (err) {
        console.error("PATCH /api/cities/[id] error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE: allow admin to delete a city.
export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectToDB();
        const user = await User.findById(session.user.id);
        if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        const id = params.id;
        const removed = await City.findByIdAndDelete(id);
        if (!removed) return NextResponse.json({ error: "Not found" }, { status: 404 });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("DELETE /api/cities/[id] error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}