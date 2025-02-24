"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElement } from "./StripeElement";
import { loadStripe } from "@stripe/stripe-js";
import Modal from "../models/Model";
import { useAppContext } from "@/context/AppContext";
import { NumberFormatter } from "@/lib/lib";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const StripeCheckout = ({ setShowPaymentModal, clientSecret }) => {
  const { cart } = useAppContext();
  if (!clientSecret) return;
  return (
    <Modal onClose={() => setShowPaymentModal(false)}>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripeElement
          amount={NumberFormatter(cart?.total)}
          clientSecret={clientSecret}
        />
      </Elements>
    </Modal>
  );
};

export default StripeCheckout;
