"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const BookingForm = ({ cityId, rent, session }) => {
    const router = useRouter();
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [totalCost, setTotalCost] = useState(0);

    // Check if user is logged in when the form is accessed directly
    useEffect(() => {
        if (!session && window.location.pathname.includes("/booking")) {
            // If not logged in and trying to access the booking page directly
            Swal.fire({
                title: "Not logged in!",
                text: "Please login to make a booking.",
                icon: "warning",
                confirmButtonText: "Go to Login",
            }).then(() => {
                router.push("/login?redirectTo=/booking"); // Redirect to login page with a redirect URL
            });
        }
    }, [session, router]);

    const handleDateChange = (from, to) => {
        const start = new Date(from);
        const end = new Date(to);
        const durationDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const costPerDay = rent / 30; // Approx daily rent

        if (durationDays > 0) {
            const calculated = Math.round(durationDays * costPerDay);
            setTotalCost(calculated);
        } else {
            setTotalCost(0);
        }
    };

    useEffect(() => {
        if (dateFrom && dateTo) {
            handleDateChange(dateFrom, dateTo);
        }
    }, [dateFrom, dateTo]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            // Make the API request
            const res = await fetch("/api/booking", {
                method: "POST",
                body: formData,
            });

            // Log the response status and body
            console.log("Response Status:", res.status);
            const text = await res.text(); // Get the response body as plain text
            console.log("Response Body:", text);

            // If the response body is HTML, it likely means there's an error
            if (text.includes("<!DOCTYPE html>")) {
                console.error("Received HTML instead of JSON. This could be an error page.");
                Swal.fire("Error", "There was an issue with your booking.", "error");
                return;
            }

            // Now try parsing the response body
            const data = JSON.parse(text); // Try to parse the text into JSON

            // If the response is OK, continue
            if (res.ok) {
                Swal.fire("Booking Confirmed!", "Redirecting to dashboard...", "success");
                // Redirect or do further processing...
            } else {
                throw new Error(data.message || "Something went wrong.");
            }

        } catch (error) {
            console.error("Error parsing response:", error);
            Swal.fire("Error", "There was an issue with your booking.", "error");
        }
    };

    const handleBookNowClick = () => {
        // If user is not logged in, redirect to login page with a query parameter to come back after login
        if (!session) {
            const currentPath = window.location.pathname;
            const callbackUrl = encodeURIComponent(currentPath);
            Swal.fire({
                title: "Not logged in!",
                text: "Please login to make a booking.",
                icon: "warning",
                confirmButtonText: "Go to Login",
            }).then(() => {
                router.push(`/auth/login?callbackUrl=${callbackUrl}`);
            });
        }
    };

    // Show form if logged in, otherwise render nothing or a login prompt
    if (!session) {
        return (
            <div>
                <button
                    onClick={handleBookNowClick}
                    className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600"
                >
                    Book Now
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-4 p-4 rounded shadow-md w-full"
        >
            <div className="mb-2">
                <label className="block font-medium">From:</label>
                <input
                    type="date"
                    required
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>
            <div className="mb-2">
                <label className="block font-medium">To:</label>
                <input
                    type="date"
                    required
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>

            <div className="mb-4">
                <p className="text-sm">
                    💵 <strong>Total Cost:</strong>{" "}
                    {totalCost ? `$${totalCost}` : "Please select valid dates"}
                </p>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600"
            >
                Confirm Booking
            </button>
        </form>
    );
};

export default BookingForm;