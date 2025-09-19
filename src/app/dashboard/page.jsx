import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session)
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-red-600">Unauthorized. Please <a className="text-blue-600 underline" href="/login">login</a>.</p>
      </div>
    );

  // derive initials for avatar
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
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-200 dark:bg-emerald-700 flex items-center justify-center text-2xl font-semibold text-emerald-800 dark:text-emerald-100">{initials}</div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {name}!</h1>
            <p className="text-sm">{session.user?.email}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <a href="/dashboard" className="inline-flex items-center px-3 py-2 rounded-md bg-blue-600 text-white text-sm shadow hover:bg-blue-700">Dashboard</a>
          <a href="/dashboard/admin" className="inline-flex items-center px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">Admin</a>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm rounded-lg p-4 border border-gray-100 dark:border-gray-700">
          <div className="text-sm text-gray-200">Active Projects</div>
          <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">12</div>
          <div className="text-xs text-green-600 mt-1">+3 since last week</div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm rounded-lg p-4 border border-gray-100 dark:border-gray-700">
          <div className="text-sm text-gray-200">Tasks Completed</div>
          <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">1,024</div>
          <div className="text-xs text-green-600 mt-1">+12% month-over-month</div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm rounded-lg p-4 border border-gray-100 dark:border-gray-700">
          <div className="text-sm text-gray-200">Community Messages</div>
          <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">87</div>
          <div className="text-xs text-yellow-400 mt-1">5 unread</div>
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/80 dark:bg-gray-800/80 shadow-sm rounded-lg p-4 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Monthly Active Users</h3>
          {/* Simple bar chart (static SVG) - uses currentColor for theme-aware color */}
          <div className="w-full h-40 text-sky-500 dark:text-sky-400">
            <svg viewBox="0 0 100 40" className="w-full h-full text-current">
              <g fill="currentColor">
                <rect x="5" y="18" width="6" height="22" rx="1" />
                <rect x="18" y="10" width="6" height="30" rx="1" />
                <rect x="31" y="6" width="6" height="34" rx="1" />
                <rect x="44" y="14" width="6" height="26" rx="1" />
                <rect x="57" y="8" width="6" height="32" rx="1" />
                <rect x="70" y="20" width="6" height="20" rx="1" />
                <rect x="83" y="12" width="6" height="28" rx="1" />
              </g>
            </svg>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 shadow-sm rounded-lg p-4 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Engagement Overview</h3>
          {/* Simple area chart (static SVG) */}
          <div className="w-full h-40 text-emerald-500 dark:text-emerald-300">
            <svg viewBox="0 0 100 40" className="w-full h-full text-current">
              <path d="M0 30 C 20 10, 40 10, 60 20 C 80 30, 100 10, 120 20" fill="none" stroke="currentColor" strokeWidth="2" />
              <polyline points="0,30 20,18 40,18 60,24 80,30 100,22" fill="currentColor" opacity="0.12" />
            </svg>
          </div>
        </div>
      </section>

      {/* Recent activity / table */}
      <section className="bg-white/80 dark:bg-gray-800/80 shadow-sm rounded-lg p-4 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-gray-200">
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-3 py-2 font-medium text-gray-700 dark:text-gray-200">Project</td>
                <td className="px-3 py-2">Added new city guide for Lisbon</td>
                <td className="px-3 py-2">2025-09-10</td>
                <td className="px-3 py-2 text-green-600">Published</td>
              </tr>
              <tr className="border-t bg-gray-50/60 dark:bg-transparent">
                <td className="px-3 py-2 font-medium text-gray-700 dark:text-gray-200">Task</td>
                <td className="px-3 py-2">Reviewed community posts</td>
                <td className="px-3 py-2">2025-09-12</td>
                <td className="px-3 py-2 text-yellow-500">Pending</td>
              </tr>
              <tr className="border-t">
                <td className="px-3 py-2 font-medium text-gray-700 dark:text-gray-200">Message</td>
                <td className="px-3 py-2">New message from user Anna</td>
                <td className="px-3 py-2">2025-09-14</td>
                <td className="px-3 py-2 text-blue-600">Unread</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}