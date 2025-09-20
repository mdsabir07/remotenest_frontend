"use client";

import { useState } from "react";
import Swal from 'sweetalert2';
// No animation — single-column form

export default function CreateCityForm() {
    const [form, setForm] = useState({
        name: "",
        country: "",
        description: "",
        featuredImage: "",
        tags: "",
        rent: "",
        food: "",
        transport: "",
        avgDownloadMbps: "",
        mobileCoverage: "",
        lat: "",
        lng: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [createdCity, setCreatedCity] = useState(null);

    function onChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        setMessage(null);
        setCreatedCity(null);

        if (!form.name.trim() || !form.country.trim()) {
            setMessage({ type: "error", text: "Name and country are required." });
            return;
        }

        const payload = {
            name: form.name.trim(),
            country: form.country.trim(),
            description: form.description.trim() || undefined,
            featuredImage: form.featuredImage.trim() || undefined,
            tags: form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
            cost: {
                rent: form.rent ? Number(form.rent) : undefined,
                food: form.food ? Number(form.food) : undefined,
                transport: form.transport ? Number(form.transport) : undefined,
            },
            connectivity: {
                avgDownloadMbps: form.avgDownloadMbps ? Number(form.avgDownloadMbps) : undefined,
                mobileCoverage: form.mobileCoverage || undefined,
            },
            location:
                form.lat && form.lng
                    ? { lat: parseFloat(form.lat), lng: parseFloat(form.lng) }
                    : undefined,
        };

        setLoading(true);
        try {
            const res = await fetch("/api/cities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "same-origin",
                body: JSON.stringify(payload),
            });

            const body = await res.json();
            if (res.status === 201) {
                setMessage({ type: "success", text: "City submitted successfully." });
                setCreatedCity(body);
                await Swal.fire({ icon: 'success', title: 'Submitted', text: 'City submitted successfully. It will appear after admin approval.' });
                // reset form if desired:
                setForm({
                    name: "",
                    country: "",
                    description: "",
                    featuredImage: "",
                    tags: "",
                    rent: "",
                    food: "",
                    transport: "",
                    avgDownloadMbps: "",
                    mobileCoverage: "",
                    lat: "",
                    lng: "",
                });
            } else {
                setMessage({ type: "error", text: body?.error || `Error: ${res.status}` });
                await Swal.fire({ icon: 'error', title: 'Submission failed', text: body?.error || `Error: ${res.status}` });
            }
        } catch (err) {
            setMessage({ type: "error", text: String(err) });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Add a City</h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    {message && (
                        <div className={message.type === "error" ? "text-red-600" : "text-green-600"}>
                            {message.text}
                        </div>
                    )}

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">City name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                        <input
                            name="country"
                            value={form.country}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Featured image URL</label>
                        <input
                            name="featuredImage"
                            value={form.featuredImage}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
                        <input
                            name="tags"
                            value={form.tags}
                            onChange={onChange}
                            placeholder="coastal, digital-nomad"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Rent (USD)</label>
                            <input name="rent" value={form.rent} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Food (USD)</label>
                            <input name="food" value={form.food} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Transport (USD)</label>
                            <input name="transport" value={form.transport} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Avg download Mbps</label>
                            <input name="avgDownloadMbps" value={form.avgDownloadMbps} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Mobile coverage</label>
                            <input name="mobileCoverage" value={form.mobileCoverage} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Latitude</label>
                            <input name="lat" value={form.lat} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Longitude</label>
                            <input name="lng" value={form.lng} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loading} className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-300">
                            {loading ? "Submitting..." : "Submit City"}
                        </button>
                    </div>

                    {createdCity && (
                        <div className="mt-4 p-3 border rounded bg-gray-50 dark:bg-gray-900">
                            <div><strong>Created:</strong> {createdCity.name} ({createdCity.status})</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">You will see this city on the public pages after an admin approves it.</div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}