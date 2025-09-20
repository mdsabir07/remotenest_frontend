import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  await connectToDB();
  const admin = await User.findById(session.user.id);
  if (!admin || admin.role !== "admin") return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const body = await req.json();
  if (!["user", "admin"].includes(body.role)) return new Response(JSON.stringify({ error: "Invalid role" }), { status: 400 });

  const updated = await User.findByIdAndUpdate(params.id, { role: body.role }, { new: true }).select("-password");
  if (!updated) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

  return new Response(JSON.stringify({ user: updated }), { status: 200 });
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  await connectToDB();
  const admin = await User.findById(session.user.id);
  if (!admin || admin.role !== "admin") return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const removed = await User.findByIdAndDelete(params.id);
  if (!removed) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
