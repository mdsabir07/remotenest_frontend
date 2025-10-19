"use client";

import { useEffect, useState } from "react";

export default function AdminCityTable() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchCities() {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/cities?status=pending`);
    try {
      const text = await res.text();
      if (res.ok) {
        const json = JSON.parse(text || '{}');
        setCities(json.cities || []);
      } else {
        let msg = text;
        try { msg = JSON.parse(text).error || text } catch(e){}
        setError(msg || `Failed to load cities (${res.status})`);
      }
    } catch (e) {
      setError('Failed to parse server response');
    }
    setLoading(false);
  }

  useEffect(() => { fetchCities(); }, []);

  async function approveCity(id) {
    const res = await fetch(`/api/cities/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: 'approved' })
    });
    if (res.ok) fetchCities(); else console.error(await res.text());
  }

  async function deleteCity(id) {
    if (!confirm('Delete this city?')) return;
    const res = await fetch(`/api/cities/${id}`, { method: 'DELETE' });
    if (res.ok) fetchCities(); else console.error(await res.text());
  }

  if (loading) return <div>Loading submissions...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {String(error)}</div>;

  return (
    <div className="overflow-x-auto rounded shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Title</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Location</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Submitted By</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {cities.map(c => (
            <tr key={c._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{c.title || c.name}</td>
              <td className="px-4 py-3 text-sm">
                {(() => {
                  const loc = c.location;
                  if (!loc) return c.country || '-';
                  if (typeof loc === 'string') return loc;
                  if (typeof loc === 'object' && ('lat' in loc || 'lng' in loc)) {
                    const lat = loc.lat ?? loc.latitude ?? null;
                    const lng = loc.lng ?? loc.longitude ?? null;
                    if (lat != null && lng != null) return `${lat}, ${lng}`;
                    if (lat != null) return `${lat}`;
                    if (lng != null) return `${lng}`;
                  }
                  return String(loc);
                })()}
              </td>
              <td className="px-4 py-3 text-sm">{c.createdBy?.name || c.createdBy?.email || '-'}</td>
              <td className="px-4 py-3 text-sm">
                <button onClick={() => approveCity(c._id)} className="mr-2 cursor-pointer inline-flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Approve</button>
                <button onClick={() => deleteCity(c._id)} className="cursor-pointer inline-flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}