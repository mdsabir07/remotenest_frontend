// src/app/dashboard/add-city/page.jsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
// Import the client component directly; it should include "use client" at the top.
import CreateCityForm from "@/app/components/CreateCityForm";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <main className="p-6">
                <h1 className="text-xl font-semibold">Add City</h1>
                <p className="mt-4">You need to sign in to submit a city.</p>
            </main>
        );
    }

    return (
        <main className="">
            <h1 className="text-2xl font-bold">Add City</h1>
            <p className="text-sm mt-1">Only signed-in users can submit cities; admin submissions auto-approve.</p>

            <div className="mt-6">
                <CreateCityForm />
            </div>
        </main>
    );
}