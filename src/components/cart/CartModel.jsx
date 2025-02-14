"use client";

import { useAppContext } from "@/context/AppContext";
import { Add, Remove } from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";
import LoadingAnimation from "../loading/LoadingAnimation";
import { createStripeIntent } from "@/lib/lib";

const CartModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    cart,
    removeCartItem,
    clearCart,
    increaseCartItem,
    decreaseCartItem,
  } = useAppContext();
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const temCart = cart?.cartItems?.map((item) => {
        const { title, description, amount, price, _id } = item;
        return {
          title,
          image: "https://www.pexels.com/photo/red-and-black-sneaker-18946664/",
          price,
          amount,
          description:
            description ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur incidunt earum culpa, quia similique odit modi? Ipsum quibusdam, quisquam eius neque accusantium aspernatur fugit magnam vel at illo cumque. Ipsa.",
          _id,
        };
      });
      const response = await createStripeIntent({
        cartItems: temCart,
        userId: "56377626251552636",
      });
      console.log("redirecting");

      if (response?.url) {
        window.location.href = response?.url;
      }
    } catch (error) {
      console.log(error);

      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='w-[95vw]  md:max-w-[400px] absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-[120px] right-3 flex flex-col gap-6 z-[3000] h-auto max-h-[80vh]'>
      {cart.amount === 0 ? (
        <div className='w-screen max-w-[200px] flex flex-col gap-1  items-center'>
          <Image src='/logo.png' alt='empty cart' width={70} height={50} />
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
                      <h3 className=' font-serif text-sm  line-clamp-2'>
                        {item.title}
                      </h3>
                      <div className='p-1 bg-gray-50 rounded-sm flex items-center gap-2  w-max'>
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
                      {item?.size && (
                        <p className=' text-[.7rem] text-gray-500'>
                          size: {item?.size}{" "}
                        </p>
                      )}
                      {item?.color && (
                        <div
                          style={{ backgroundColor: item?.color }}
                          className={`w-4 h-4 rounded-full cursor-pointer`}
                        />
                      )}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className='flex justify-between text-sm'>
                    <div>
                      <span className='text-gray-500'>
                        {" "}
                        <Add onClick={() => increaseCartItem(item._id)} />{" "}
                      </span>
                      <span className='text-gray-500'>Qty. {item.amount}</span>
                      <span className='text-gray-500'>
                        {" "}
                        <Remove
                          onClick={() => decreaseCartItem(item._id)}
                        />{" "}
                      </span>
                    </div>
                    <span
                      className='text-blue-500 cursor-pointer'
                      // style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
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
              <span className=' font-serif'>Subtotal</span>
              <span className=''>${cart.total}</span>
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
                  disabled={loading}
                  className='rounded-md py-3 px-4 bg-gray-800 text-white disabled:cursor-not-allowed disabled:opacity-75'
                >
                  {loading ? (
                    <div className=' flex items-center gap-2'>
                      <LoadingAnimation /> Checkout
                    </div>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
