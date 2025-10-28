// app/api/stripe/webhook/route.js
import { buffer } from "micro";
import Stripe from "stripe";
import { connectToDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { sendNotification } from "@/lib/sendNotification";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: { bodyParser: false }, // Required for Stripe signature verification
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
    }

    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;
    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("❌ Stripe webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        await connectToDB();

        switch (event.type) {
            // ✅ Payment succeeded
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const bookingId = paymentIntent.metadata?.bookingId;

                if (!bookingId) {
                    console.warn("⚠️ Missing bookingId in metadata for successful payment");
                    break;
                }

                const booking = await Booking.findByIdAndUpdate(
                    bookingId,
                    { paymentStatus: "paid" },
                    { new: true }
                ).populate("city user", "name email");

                if (!booking) {
                    console.warn(`⚠️ Booking ${bookingId} not found`);
                    break;
                }

                // 🛎️ Send notifications
                try {
                    // Notify user
                    await sendNotification({
                        toUser: booking.user._id,
                        toSenderId: null,
                        title: "Payment Successful",
                        message: `Your payment for ${booking.city.name} was successful.`,
                        type: "payment",
                    });

                    // Notify admin(s)
                    await sendNotification({
                        toRole: "admin",
                        toSenderId: booking.user._id,
                        title: "New Booking Paid",
                        message: `A new booking for ${booking.city.name} has been paid.`,
                        type: "payment",
                    });
                } catch (notifyErr) {
                    console.error("⚠️ Notification error:", notifyErr);
                }

                break;
            }

            // ⚠️ Payment failed
            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object;
                const bookingId = paymentIntent.metadata?.bookingId;
                if (!bookingId) break;

                await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "failed" });

                // Notify user about failure
                await sendNotification({
                    toUser: booking.user?._id,
                    title: "Payment Failed",
                    message: "Your payment attempt was unsuccessful. Please try again.",
                    type: "payment",
                });

                break;
            }

            case "charge.refunded": {
                const charge = event.data.object;
                const bookingId = charge.metadata?.bookingId;
                if (!bookingId) break;

                await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "refunded" });

                await sendNotification({
                    toUser: booking.user?._id,
                    title: "Refund Processed",
                    message: "Your payment has been refunded successfully.",
                    type: "payment",
                });

                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.status(200).send("✅ Event received");
    } catch (err) {
        console.error("❌ Error handling webhook:", err);
        res.status(500).send("Internal Server Error");
    }
}