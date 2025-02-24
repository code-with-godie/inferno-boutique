"use client";

import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useCallback, useState } from "react";
import LoadingAnimation from "../loading/LoadingAnimation";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import StripeCheckout from "../stripe/StripeCheckout";
import { createStripeIntent, NumberFormatter } from "@/lib/lib";
import toast, { Toaster } from "react-hot-toast";
import { createMyOrdr } from "@/lib/actions";

const CartModal = () => {
  const { isSignedIn } = useUser();
  const [clientSecret, setClientSecret] = useState(null);
  const [creatingIntent, setCreatingIntent] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const {
    cart,
    removeCartItem,
    clearCart,
    increaseCartItem,
    decreaseCartItem,
  } = useAppContext();

  const { user } = useUser();

  const convertCurrency = (currency) => {
    return Math.round(currency * 100);
  };
  const createpaymentIntext = useCallback(async () => {
    try {
      const amount = convertCurrency(cart?.total);
      const products = cart?.cartItems?.map((item) => {
        const { _id, variants } = item;
        // Ensure variants is an array before using reduce
        const quantity = Array.isArray(variants)
          ? variants.reduce((acc, variant) => {
              // Ensure variant.quantity is a number before adding
              const variantQuantity =
                typeof variant.quantity === "number" ? variant.quantity : 0;
              return acc + variantQuantity;
            }, 0) // Initial value for reduce is 0
          : 0; // Default quantity if variants is not an array

        return {
          _id,
          quantity,
        };
      });

      const res = await createStripeIntent({
        amount,
        products,
        userID: user?.id,
      });
      if (res) {
        setClientSecret(res.clientSecret);
        setShowPaymentModal(true);
      }
    } catch (error) {
      console.log("payment creation error", error);
      toast.error(`${error?.message} 😟😟😟😟`);
    }
  }, [cart?.cartItems, cart.total, user?.id]);
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      if (!isSignedIn) {
        router.push("/auth/sign-in");
        return;
      }

      setCreatingIntent(true);
      await createpaymentIntext();
    } catch (error) {
      console.log(error);
      setCreatingIntent(true);
    } finally {
      setCreatingIntent(false);
    }
  };

  const handleIncrease = (itemId, size) => {
    increaseCartItem({ itemId, size });
  };

  const handleDecrease = (itemId, size) => {
    decreaseCartItem({ itemId, size });
  };

  return (
    <div className='w-[95vw] md:max-w-[450px] absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-[150px] right-3 flex flex-col gap-6 z-[3000] h-auto max-h-[80vh]'>
      {cart.amount === 0 ? (
        <div className='w-screen max-w-[250px] flex flex-col gap-1 items-center'>
          <Image src='/logo.png' alt='empty cart' width={100} height={50} />
          <h1 className='text-gray-500 text-sm mt-2 mb-2'>
            Your cart is empty
          </h1>
        </div>
      ) : (
        <>
          <h2 className='text-xl font-serif'>Shopping Cart</h2>
          {/* LIST */}
          <div className='flex flex-1 overflow-auto flex-col gap-8'>
            {/* ITEM */}
            {cart?.cartItems.map((item) => (
              <div className='flex gap-4' key={item._id}>
                {item.image && (
                  <Image
                    src={item?.image?.secure_url}
                    alt='cart image'
                    width={72}
                    height={96}
                    className='object-cover rounded-md'
                  />
                )}
                <div className='flex flex-col justify-between w-full'>
                  {/* TOP */}
                  <div className=''>
                    {/* TITLE */}
                    <div className='flex items-center justify-between gap-8'>
                      <h3 className='font-serif text-sm line-clamp-2'>
                        {item.title}
                      </h3>
                      <div className='p-1 bg-gray-50 rounded-sm flex items-center gap-2 w-max'>
                        {item.amount && item.amount > 1 && (
                          <div className='text-xs text-green-500 w-max'>
                            {item.amount} x{" "}
                          </div>
                        )}
                        ${item.price}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className='flex justify-between items-center'>
                      {item?.variants?.map((variant, index) => (
                        <div key={index} className='flex items-center gap-2'>
                          <p className='text-[.7rem] text-gray-500'>
                            Size: {variant.size}
                          </p>
                          <div
                            style={{ backgroundColor: variant.color }}
                            className='w-4 h-4 rounded-full cursor-pointer'
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className='flex flex-col gap-2'>
                    {item?.variants?.map((variant, index) => (
                      <div key={index} className='flex items-center gap-2'>
                        <span className='text-gray-500'>
                          Size: {variant.size}
                        </span>
                        <button
                          className='disabled:bg-gray-300 text-white py-1 px-4 text-sm rounded-sm bg-golden cursor-pointer disabled:cursor-not-allowed'
                          onClick={() => handleDecrease(item._id, variant.size)}
                          disabled={variant.quantity <= 1}
                        >
                          -
                        </button>
                        <span className='text-gray-500'>
                          Qty. {variant?.quantity}
                        </span>
                        <button
                          className='disabled:bg-gray-300 text-white py-1 px-4 text-sm rounded-sm bg-golden cursor-pointer disabled:cursor-not-allowed'
                          onClick={() => handleIncrease(item._id, variant.size)}
                          disabled={variant.quantity >= item?.stock}
                        >
                          +
                        </button>
                      </div>
                    ))}
                    <span
                      className='text-blue-500 cursor-pointer'
                      onClick={() => removeCartItem(item._id)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className=''>
            <div className='flex items-center justify-between font-semibold'>
              <span className='font-serif'>Subtotal</span>
              <span className=''>$ {NumberFormatter(cart.total)}</span>
            </div>
            <p className='text-gray-500 text-sm mt-2 mb-4'>
              Shipping and taxes calculated at checkout.
            </p>
            <div className='flex justify-between text-sm'>
              <button
                className='rounded-md py-3 px-4 ring-1 ring-gray-300 bg-red-600 text-white'
                onClick={clearCart}
              >
                Clear cart
              </button>
              <form action={handleCheckout}>
                <button
                  disabled={creatingIntent}
                  className='rounded-md py-3 px-4 bg-gray-800 text-white disabled:cursor-not-allowed disabled:opacity-75 flex items-center gap-2'
                >
                  {creatingIntent ? (
                    <div className='flex items-center gap-2'>
                      <LoadingAnimation /> Checkout
                    </div>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </form>
            </div>
            <Toaster />
          </div>
        </>
      )}
      {clientSecret && showPaymentModal && (
        <StripeCheckout
          clientSecret={clientSecret}
          showPaymentModal={showPaymentModal}
          setShowPaymentModal={setShowPaymentModal}
        />
      )}
    </div>
  );
};

export default CartModal;
