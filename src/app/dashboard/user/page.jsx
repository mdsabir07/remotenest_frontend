"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function UserDashboardPage() {
  const { data } = useSession();
  const userInfo = data?.user;
  const {register, handleSubmit} = useForm();
console.log(userInfo)
  // onsubmit
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.patch('/api/register');
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "✅ Profile updated!",
        showConfirmButton: false,
        timer: 1500
      });
    }
    catch (err) {
     console.error("❌ Update Failed:", err);
      alert("Failed to update profile!");
    }

  };

  return (
   <div className="p-6 space-y-6">
     <div className="border border-blue-500 p-5 rounded border-b-4">
        <h1 className="text-center md:text-5xl text-4xl text-blue-500">Welcome User <span className="text-blue-600">{userInfo.name}</span></h1>
      </div>
       {/* User Info */}

      <div className="grid grid-cols-10 gap-4 border border-blue-500 p-2">
        <div className="col-span-4 border border-blue-500 ">
          <img src={userInfo?.image} alt={userInfo.name} />
        </div>
        <div className="col-span-6 border border-blue-500 text-center py-2 space-y-2">
          <h1 className="text-3xl md:text-4xl">{userInfo.name}</h1>
          <p>{userInfo.email}</p>
          <p>role: {userInfo.role}</p>
        </div>

      </div>
      {/* update form */}
      <div className="border border-blue-500 rounded p-6 mt-6 shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              defaultValue={userInfo.name}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              defaultValue={userInfo.email}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              {...register("image")}
              placeholder="Enter image URL"
              defaultValue={userInfo.image}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
   </div>
  );
}
