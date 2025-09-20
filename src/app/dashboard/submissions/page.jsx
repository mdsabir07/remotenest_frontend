import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import AdminCityTable from "@/app/components/AdminCityTable"; // client component
import React from "react";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <div className="p-6">You must be signed in to view this page.</div>;
    }

    // load user role from DB if your session doesn't include role; otherwise use session.user.role
    // for simplicity, we'll assume session.user.id exists and you can fetch role server-side if needed.
    // If role is not available in session, you can fetch User by id here.

    // Example: require admin (pseudo)
    // const user = await User.findById(session.user.id);
    // if (!user || user.role !== "admin") return <div>Forbidden</div>;

    // If you have role in session
    if (session.user?.role !== "admin") {
        return <div className="p-6">Forbidden: admin only.</div>;
    }

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">City Submissions</h1>
            <p className="text-sm text-gray-600">Approve or delete submitted cities.</p>
            <div className="mt-6">
                {/* AdminCityTable is a client component that calls PATCH/DELETE */}
                <AdminCityTable />
            </div>
        </main>
    );
}