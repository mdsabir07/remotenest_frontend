export default function AdminDashboardPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">    
                <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
                <p className="text-lg mb-4 text-center max-w-2xl">
                    Welcome to the Admin Dashboard! Here you can manage users, oversee platform activities, and access administrative tools to ensure a smooth experience for all remote workers and digital nomads.
                </p>
                <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Admin Overview</h2> 
                    <p className="mb-4">
                        This section provides a quick overview of platform statistics, user management options, and important notifications. Stay informed and efficiently manage the RemoteNest community!
                    </p>    
                    <a
                        href="/dashboard/admin/users"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Manage Users
                    </a>
                </div>
            </div>
        </div>
    );
}