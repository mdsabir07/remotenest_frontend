import { buffer } from 'micro';  // Middleware for parsing raw body
import Stripe from 'stripe';  // Stripe Node.js library
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);  // Initialize Stripe with secret key

// Disable body parsing for the webhook request
export const config = {
    api: {
        bodyParser: false,  // We need to parse the raw body for signature validation
    },
};

// Webhook handler
const webhook = async (req, res) => {
    const buf = await buffer(req);  // Parse raw request body
    const sig = req.headers['stripe-signature'];  // Stripe signature from the request header

    try {
        // Verify the webhook signature with Stripe's secret
        const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);

        // Log the entire event object to see it
        console.log('Received event: ', event);

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log('PaymentIntent was successful!', paymentIntent);
                // Handle successful payment here
                break;

            case 'payment_intent.payment_failed':
                const paymentFailed = event.data.object;
                console.log('PaymentIntent failed:', paymentFailed);
                // Handle failed payment here
                break;

            case 'checkout.session.completed':
                const session = event.data.object;
                console.log('Checkout session completed:', session);
                // Handle post-checkout actions like saving order information
                break;

            // Handle the 'charge.updated' event type
            case 'charge.updated':
                const charge = event.data.object;
                console.log('Charge was updated!', charge);
                // You can handle charge updates here (e.g., if the payment status changes)
                break;

            // Handle more event types as necessary
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        // Respond with a success status
        res.status(200).send('Event received');
    } catch (err) {
        // If an error occurs, respond with an error status
        console.error('Error handling webhook:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};

export default webhook;