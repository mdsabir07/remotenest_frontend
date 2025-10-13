// models/Booking.js
import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: { 
        type: String, 
        enum: ["pending", "completed", "failed"], 
        default: "pending" 
    },
    createdAt: { type: Date, default: Date.now },
});
export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);