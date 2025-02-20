import Stripe from "stripe";
import { NextResponse } from "next/server";

// Initialize the Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (request) => {
  const body = await request.json();
  try {
    const { userID, productsID, amount } = body;
    // Create a customer
    const customer = await stripe.customers.create({
      metadata: {
        userID,
        productsID,
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
    });
  } catch (error) {
    console.error("Error in Stripe payment:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
