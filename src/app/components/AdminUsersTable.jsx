"use client";

import { useEffect, useState } from "react";

export default function AdminUsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/users");
    try {
      const text = await res.text();
      if (res.ok) {
        const json = JSON.parse(text || '{}');
        setUsers(json.users || []);
      } else {
        let msg = text;
        try { msg = JSON.parse(text).error || text } catch(e){}
        setError(msg || `Failed to load users (${res.status})`);
      }
    } catch (e) {
      setError('Failed to parse server response');
    }
    setLoading(false);
  }

  useEffect(() => { fetchUsers(); }, []);

  async function changeRole(id, role) {
    const res = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (res.ok) fetchUsers(); else console.error(await res.text());
  }

  async function deleteUser(id) {
    if (!confirm("Delete this user?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) fetchUsers(); else console.error(await res.text());
  }

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {String(error)}</div>;

  return (
    <div className="overflow-x-auto rounded shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Role</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Avatar</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map(u => (
            <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="px-4 py-3 text-sm">{u.name}</td>
              <td className="px-4 py-3 text-sm">{u.email}</td>
              <td className="px-4 py-3 text-sm">{u.role}</td>
              <td className="px-4 py-3 text-sm">
                {u.avatar ? <img src={u.avatar} alt="avatar" className="w-8 h-8 rounded-full" /> : <span className="text-gray-400">-</span>}
              </td>
              <td className="px-4 py-3 text-sm">
                {u.role !== 'admin' ? (
                  <button onClick={() => changeRole(u._id, 'admin')} className="mr-2 cursor-pointer inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Make admin</button>
                ) : (
                  <button onClick={() => changeRole(u._id, 'user')} className="mr-2 cursor-pointer inline-flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Remove admin</button>
                )}

                <button onClick={() => deleteUser(u._id)} className="cursor-pointer inline-flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
