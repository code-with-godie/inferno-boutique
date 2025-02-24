import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import Users from "../../models/User";
import Products from "../../models/Product";
import Orders from "../../models/Orders";
import BadRequestError from "@/app/api/errors/bad-request";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const POST = async (req) => {
  const sig = headers().get("stripe-signature");
  const body = await req.text();
  let event;
  try {
    // Verify the webhook signature to ensure the request is from Stripe
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Invalid stripe webhook signature:", err);
    return NextResponse.json(
      {
        success: false,
        erro: `Invalid stripe webhook signature: ${err}`,
      },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      const customer = await stripe.customers.retrieve(paymentIntent.customer);
      if (customer && !customer.deleted) {
        const products = JSON.parse(customer.metadata?.products);
        const userID = JSON.parse(customer.metadata?.userID);
        const user = await Users.findOne({ clerk_id: userID });
        if (!user) throw BadRequestError("User not found!!!");
        const order = new Orders({
          userID: user._id,
          customerID: customer.id,
          products,
          status: "paid",
          paymentType: "card",
          total: paymentIntent.amount / 100,
          paymentIntent: paymentIntent.client_secret,
          shipping: "",
        });
        await order.save();
        // Update stock for each product
        for (const product of products) {
          const { _id: productID, quantity } = product;
          const productRecord = await Products.findById(productID);
          if (productRecord) {
            productRecord.stock -= quantity;
            await productRecord.save();
          } else {
            console.error(`Product ${productID} not found`);
          }
        }
      }
      break;

    default:
      break;
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({
    success: true,
    message: `order received`,
  });
};
