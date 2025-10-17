import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import BarChart from "@/components/BarChart";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Redirect unauthenticated users to login with callback
  if (!session) {
    const callbackUrl = encodeURIComponent('/dashboard');
    redirect(`/auth/login?callbackUrl=${callbackUrl}`);
  }

  // Redirect unverified users to verify-email page
  // if (!session.user.isVerified) {
  //   redirect('/auth/verify-email-notice');
  // }

  // User is authenticated and verified - show dashboard content below
  const name = session.user?.name || "User";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* user information */}

        <div className="space-y-6">
          <div className="border border-blue-500 p-5 rounded-xl border-b-4">
          <h1 className="text-center md:text-5xl text-4xl text-blue-500">Welcome to your Dashboard</h1>
        </div>
        <div className="grid grid-cols-10 gap-4 border border-blue-400 p-2">
          <div className="col-span-4 border border-blue-400 ">
            <img src={session.user?.avatar} alt={initials} />
          </div>
          <div className="col-span-6 border border-blue-400 text-center py-2 space-y-2">
            <h1 className="text-3xl md:text-4xl">{name}</h1>
            <p>{session.user?.email}</p>
          </div>
        </div>
        </div>

        {/* dashboard button */}

        <div className="flex gap-2">
          <a href="/dashboard" className="inline-flex items-center px-3 py-2 rounded-md bg-blue-600 text-sm shadow hover:bg-blue-700">Dashboard</a>
          {session.user?.role === 'admin' && (
            <>
              <a href="/dashboard/admin" className="inline-flex items-center px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">Admin</a>
              <a href="/dashboard/admin/submissions" className="inline-flex items-center px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">Submissions</a>
            </>
          )}
        </div>
      </header>

     <BarChart></BarChart>

    </div>
  );
}