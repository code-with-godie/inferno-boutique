"use client";
import { CircularProgress } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const StripeElement = ({ clientSecret, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setProcessing(true);
      if (!stripe || !elements) {
        return;
      }
      const { error: submitError } = await elements.submit();
      if (submitError) {
        toast.error(`${submitError?.message}😟😟`);
        setProcessing(false);
        return;
      }
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url:
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/checkout-success` ||
            "http://localhost:3000/checkout-success",
        },
      });
      if (error) {
        console.log(error);
        toast.error(`${error?.message}😟😟`);
        setProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        setSucceeded(true);
        setProcessing(false);
      }
    } catch (error) {
      toast.error(`${error?.message}😟😟`);
    } finally {
      setProcessing(false);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return <CircularProgress />;
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      {clientSecret && <PaymentElement />}
      <button
        type='submit'
        disabled={processing || !stripe}
        className={`px-4 py-2 bg-blue-500 text-white rounded-md capitalize ${
          processing ? "bg-gray-500 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {processing ? "Processing..." : `Pay $${amount}`}
      </button>
      {succeeded && toast.success(`Payment successful ✅✅`)}
      <Toaster />
    </form>
  );
};
