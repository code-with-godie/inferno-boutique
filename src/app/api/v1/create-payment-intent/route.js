import Stripe from "stripe";
import { NextResponse } from "next/server";

// Initialize the Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export const POST = async (request) => {
  const body = await request.json();
  try {
    const { userID, products, amount } = body;
    // Validate input data
    if (!userID || !Array.isArray(products) || typeof amount !== "number") {
      throw new Error("Invalid input data");
    }

    // Create a customer
    const customer = await stripe.customers.create({
      metadata: {
        userID: JSON.stringify(userID), // Ensure userID is a string
        products: JSON.stringify(products),
      },
    });

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Total amount to be charged
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
    });

    return NextResponse.json({
      success: true,
      message: "Stripe payment intent created",
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id, // Return customer ID instead of the entire customer object
    });
  } catch (error) {
    console.error("Error in Stripe payment:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
