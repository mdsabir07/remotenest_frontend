"use client";

import { useSession } from "next-auth/react";

export default function UserDashboardPage() {
  const { data } = useSession();
  const userInfo = data?.user;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        {userInfo?.image && (
          <img
            src={userInfo.image}
            alt={userInfo.name}
            className="w-24 h-24 rounded-full mb-3"
          />
        )}
        <h2 className="text-xl font-semibold">{userInfo?.name}</h2>
        <p className="text-gray-500">{userInfo?.email}</p>
        {userInfo?.country && (
          <p className="text-gray-500">Country: {userInfo.country}</p>
        )}
      </div>

      {/* Additional Info or Actions */}
      <div className="space-y-3">
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          Update Profile
        </button>
      </div>
    </div>
  );
}
