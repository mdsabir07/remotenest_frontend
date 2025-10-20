// app/api/bookings/route.js
import { connectToDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Booking } from "@/models/Booking";
import { City } from "@/models/City";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { cityId, dateFrom, dateTo } = body;

  if (!cityId || !dateFrom || !dateTo) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const city = await City.findById(cityId);
  if (!city) {
    return NextResponse.json({ error: "City not found" }, { status: 404 });
  }

  const from = new Date(dateFrom);
  const to = new Date(dateTo);
  const nights = Math.ceil((to - from) / (1000 * 60 * 60 * 24));

  if (nights <= 0) {
    return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
  }

  const dailyRent = city.cost?.rent ? city.cost.rent / 30 : 50; // fallback
  const totalPrice = Math.round(nights * dailyRent); // rounded for Stripe

  const booking = await Booking.create({
    user: session.user.id,
    city: city._id,
    dateFrom: from,
    dateTo: to,
    totalPrice,
    paymentStatus: "pending",
  });

  return NextResponse.json({ success: true, bookingId: booking._id, adminStatus: booking.adminStatus });
}

export async function GET(req) {
    await connectToDB();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = session.user.role === "admin";
    const query = isAdmin ? {} : { user: session.user.id };

    const bookings = await Booking.find(query)
        .populate("city", "name location pricePerNight") // optional populate
        .sort({ createdAt: -1 });

    return NextResponse.json({ bookings });
}