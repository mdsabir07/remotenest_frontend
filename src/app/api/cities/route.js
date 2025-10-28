import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { sendNotification } from "@/lib/sendNotification";
import City from "@/models/City";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Simple slug generator: normalize, remove unsafe chars, collapse dashes
function slugify(input) {
    return String(input || "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9_]/g, "")
        .replace(/-+/g, "-");
}

/*
POST handler to create a City document.

Behavior summary:
- Requires an authenticated session (getServerSession).
- Loads the requesting user and requires admin role (requestingUser.role === "admin").
  -> change this check if your User model uses a different flag (e.g., isAdmin).
- Validates minimal required fields (name, country).
- Generates or uses provided slug and prevents duplicates (409)
- Attaches createdBy/updatedBy audit fields
- returns 201 with created city JSON on success
*/
export async function POST(req) {
    try {
        // 1) Authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user?.id;
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2) Connect to DB
        await connectToDB();

        // 3) Load user
        const requestingUser = await User.findById(userId);
        if (!requestingUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // If user has role === 'admin' they'll be auto-approved below; otherwise non-admins can still create (status: 'pending')

        // 4) Parse body
        const payload = await req.json();
        const { name, country, slug } = payload || {};

        // 5) Basic validation
        if (!name || !country) {
            return NextResponse.json(
                { error: "Missing required fields: name and country" },
                { status: 400 }
            );
        }

        // 6) Slug handling and duplicate guard
        const finalSlug = slug ? slugify(slug) : slugify(`${name}-${country}`);
        const existing = await City.findOne({ slug: finalSlug });
        if (existing) {
            return NextResponse.json(
                { error: "City with this slug already exists, please choose another" },
                { status: 409 }
            );
        }

        // Determine status based on role
        let status = "pending";
        let approvedBy = null;
        let approvedAt = null;
        if (requestingUser.role === "admin") {
            status = "approved";
            approvedBy = requestingUser._id;
            approvedAt = new Date();
        }


        // 7) Prepare document (attach audit fields)
        const doc = {
            ...payload,
            slug: finalSlug,
            status,
            approvedBy,
            approvedAt,
            createdBy: requestingUser._id,
            updatedBy: requestingUser._id,
        };

        // 8) Create and return
        const created = await City.create(doc);

        // ✅ Notify all admins if a regular user created a city
        if (requestingUser.role !== "admin") {
            await sendNotification({
                toRole: "admin",
                toSenderId: requestingUser._id,
                title: "New City Submission",
                message: `A new city "${name}" was submitted by ${requestingUser.name || "a user"}.`,
                type: "info",
            });
        }

        // ✅ Notify the creator about their own submission
        await sendNotification({
            toUser: requestingUser._id,
            toSenderId: requestingUser._id,
            title: "City Submitted",
            message: `Your city "${name}" has been submitted and is pending approval.`,
            type: "success",
        });

        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        // server-side error
        console.error("/api/cities POST error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const status = url.searchParams.get('status');

        await connectToDB();

        // If requesting pending items, ensure admin
        if (status === 'pending') {
            const session = await getServerSession(authOptions);
            if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            const userId = session.user?.id;
            if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            const requestingUser = await User.findById(userId);
            if (!requestingUser || requestingUser.role !== 'admin') {
                return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
            }
            const cities = await City.find({ status: 'pending' }).lean();
            return NextResponse.json({ cities }, { status: 200 });
        }

        // public listing: only approved
        const cities = await City.find({ status: 'approved' }).lean();
        return NextResponse.json({ cities }, { status: 200 });
    } catch (err) {
        console.error('/api/cities GET error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}