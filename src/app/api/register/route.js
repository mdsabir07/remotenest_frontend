// app/api/register/route.js
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hash, compare } from "bcryptjs";


export async function POST(req) {
  const { name, email, password } = await req.json();
  await connectToDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
  }

  const hashedPassword = await hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  return new Response(JSON.stringify({ user: newUser }), { status: 201 });
}