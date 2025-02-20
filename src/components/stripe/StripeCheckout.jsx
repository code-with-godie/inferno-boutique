"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElement } from "./StripeElement";
import { loadStripe } from "@stripe/stripe-js";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../models/Model";
import LoadingAnimation from "../loading/LoadingAnimation";
import { createStripeIntent } from "@/lib/lib";
import { useUser } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const StripeCheckout = ({ showPaymentModal, setShowPaymentModal }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [creatingIntent, setCreatingIntent] = useState(true);
  const { cart } = useAppContext();
  const { user } = useUser();

  const convertCurrency = (currency) => {
    return Math.round(currency * 100);
  };
  const amount = convertCurrency(cart?.total);
  const createpaymentIntext = useCallback(async () => {
    try {
      const productIDs = cart?.cartItems?.map((item) => {
        const { _id } = item;
        return _id;
      });
      const res = await createStripeIntent({
        amount,
        userID: user?.id,
        productIDs,
      });
      if (res) {
        setClientSecret(res.clientSecret);
      }
    } catch (error) {
      setShowPaymentModal(false);
      console.log("payment creation error", error);
      toast.error(`${error?.message} 😟😟😟😟`);
    } finally {
      setCreatingIntent(false);
    }
  }, [amount, cart?.cartItems, setShowPaymentModal, user?.id]);
  useEffect(() => {
    createpaymentIntext();
  }, [createpaymentIntext]);

  if (creatingIntent) {
    return (
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      >
        <LoadingAnimation />
      </Modal>
    );
  }
  if (!clientSecret) return;
  return (
    <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripeElement amount={cart?.total} clientSecret={clientSecret} />
      </Elements>
      <Toaster />
    </Modal>
  );
};

export default StripeCheckout;
