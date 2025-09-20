import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  await connectToDB();
  const admin = await User.findById(session.user.id);
  if (!admin || admin.role !== "admin") return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const users = await User.find().select("-password").lean();
  return new Response(JSON.stringify({ users }), { status: 200 });
}
