'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function BookingsPage() {
    const { data: session, status } = useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/bookings');
                const data = await res.json();
                if (res.ok) {
                    setBookings(data.bookings);
                } else {
                    console.error(data.error);
                }
            } catch (err) {
                console.error("Error fetching bookings:", err);
            } finally {
                setLoading(false);
            }
        };

        if (status === 'authenticated') {
            fetchBookings();
        }
    }, [status]);

    if (loading) return <p className="p-4">Loading bookings...</p>;
    if (!session) return <p className="p-4">You must be logged in.</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">My Bookings</h1>

            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="border rounded p-4 shadow">
                            <h2 className="text-lg font-semibold">{booking.city?.name}</h2>
                            <p className="text-sm text-gray-600">
                                {booking.city?.location
                                    ? `Lat: ${booking.city.location.lat}, Lng: ${booking.city.location.lng}`
                                    : ''}
                            </p>
                            <p className="mt-2">
                                <strong>From:</strong>{' '}
                                {new Date(booking.dateFrom).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>To:</strong>{' '}
                                {new Date(booking.dateTo).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Total Price:</strong> ${booking.totalPrice}
                            </p>
                            <p>
                                <strong>Payment Status:</strong>{' '}
                                <span
                                    className={
                                        booking.paymentStatus === 'completed'
                                            ? 'text-green-600'
                                            : booking.paymentStatus === 'failed'
                                                ? 'text-red-600'
                                                : 'text-yellow-600'
                                    }
                                >
                                    {booking.paymentStatus}
                                </span>
                            </p>
                            <p>
                                <strong>Admin Status:</strong>{' '}
                                <span
                                    className={
                                        booking.adminStatus === 'approved'
                                            ? 'text-green-600'
                                            : booking.adminStatus === 'rejected'
                                                ? 'text-red-600'
                                                : 'text-yellow-600'
                                    }
                                >
                                    {booking.adminStatus}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}