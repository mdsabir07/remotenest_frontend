
export default function AdminDashboardPage() {
  // session
  const { data: sessionData } = useSession();
  const user = sessionData?.user;

  
  return (
    <div className="p-6 space-y-6">
      {/* User Info */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1">Welcome, {user?.name || 'Admin'}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-500 mt-1">Role: {user?.role || 'Admin'}</p>
        </div>
      </div>
    </div>
  );
}
