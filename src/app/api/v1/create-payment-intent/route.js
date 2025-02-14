import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Initialize the Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async request => {
  const body = await request.json();
  try {
    // Create a customer
    const customer = await stripe.customers.create({
      metadata: {
        userId: body.userId,
        cart: JSON.stringify(body.cartItems),
      },
    });

    // Prepare the line items for Stripe checkout
    const line_items = body.cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image],
          description: item.description,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100, // Stripe expects the price in cents
      },
      quantity: item.amount,
    }));

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'KE'],
      },
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: 'payment',
      customer: customer.id,
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    // Respond with session URL
    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Error in Stripe payment:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
