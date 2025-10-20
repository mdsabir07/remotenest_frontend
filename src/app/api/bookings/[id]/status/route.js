// app/api/bookings/[id]/status/route.js

import { connectToDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Booking } from "@/models/Booking";
import { NextResponse } from "next/server";

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

    const updated = await Booking.findByIdAndUpdate(id, { adminStatus }, { new: true });
    if (!updated) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
}