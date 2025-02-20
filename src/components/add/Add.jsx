"use client";
import { useAppContext } from "@/context/AppContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Add = ({
  images,
  _id,
  price,
  sizes,
  colors,
  stock,
  discount,
  title,
  description,
}) => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [variants, setVariants] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [inCart, setinCart] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const {
    addCartItem,
    cart: { cartItems },
    increaseCartItem,
    decreaseCartItem,
  } = useAppContext();

  const addToCart = () => {
    if (!isSignedIn) {
      router.push("/auth/sign-in");
      return;
    }
    const item = {
      _id,
      image: images[0],
      variants,
      title,
      description,
      stock,
      price: price - discount,
      amount: variants.reduce((total, variant) => total + variant.quantity, 0),
    };
    addCartItem(item);
    setVariants([]);
  };

  const handleIncrease = (size) => {
    if (variants.some((variant) => variant.size === size)) {
      setVariants((prev) =>
        prev.map((variant) =>
          variant.size === size
            ? {
                ...variant,
                quantity:
                  variant.quantity < stock
                    ? variant.quantity + 1
                    : variant.quantity,
              }
            : variant
        )
      );
    }
  };

  const handleDecrease = (size) => {
    if (variants.some((variant) => variant.size === size)) {
      setVariants((prev) =>
        prev.map((variant) =>
          variant.size === size
            ? {
                ...variant,
                quantity:
                  variant.quantity > 1
                    ? variant.quantity - 1
                    : variant.quantity,
              }
            : variant
        )
      );
    }
  };

  const handleSize = (size) => {
    setVariants((prev) => {
      if (prev.some((variant) => variant.size === size)) {
        return prev.filter((variant) => variant.size !== size);
      }
      return [...prev, { size, color: null, quantity: 1 }];
    });
  };

  const handleColor = (size, color) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.size === size ? { ...variant, color } : variant
      )
    );
  };

  useEffect(() => {
    setCartItem(null);
    const inCart = cartItems?.some((item) => item?._id === _id);
    setinCart(inCart);
    if (inCart) {
      setCartItem(cartItems.find((item) => item?._id === _id));
    }
  }, [_id, cartItems]);

  useEffect(() => {
    setDisabled(
      variants.length === 0 ||
        variants.some(
          (variant) => colors && (colors?.length > 0) & !variant.color
        )
    );
  }, [variants, colors]);

  useEffect(() => {
    if (sizes?.length === 1) {
      setVariants([
        {
          size: sizes[0],
          color: colors.length === 1 ? colors[0] : null,
          quantity: 1,
        },
      ]);
    }
  }, [sizes, colors]);

  return (
    <div className='flex flex-col gap-2'>
      {sizes?.length > 0 && (
        <div className='flex flex-col gap-2'>
          <p className='text-lg text-black/70'>Choose Your Variants</p>
          <div className='flex flex-col gap-2'>
            {sizes?.map((size, index) => (
              <div
                key={index}
                className='flex items-center justify-between gap-4 p-2'
              >
                <button
                  disabled={inCart}
                  onClick={() => handleSize(size)}
                  className={`${
                    variants.some((variant) => variant.size === size) ||
                    cartItem?.variants?.some((variant) => variant.size === size)
                      ? "bg-golden border-none text-white"
                      : "disabled:bg-gray-300 disabled:text-white disabled:border-none"
                  } py-1 px-4 border text-sm rounded-sm border-golden cursor-pointer disabled:cursor-not-allowed`}
                >
                  {size}
                </button>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-2'>
                    {colors?.map((color, index) => (
                      <button
                        key={index}
                        disabled={inCart}
                        onClick={() => handleColor(size, color)}
                        style={{ backgroundColor: color }}
                        className={`${
                          variants.some(
                            (variant) =>
                              variant.size === size && variant.color === color
                          )
                            ? "border-2 border-red-500"
                            : ""
                        } w-5 h-5 rounded-full cursor-pointer disabled:cursor-not-allowed my-shadow`}
                      ></button>
                    ))}
                  </div>
                  <button
                    disabled={
                      inCart ||
                      !variants.some((variant) => variant.size === size)
                    }
                    onClick={() => handleDecrease(size)}
                    className='disabled:bg-gray-300 text-white py-1 px-4 text-sm rounded-sm bg-golden cursor-pointer disabled:cursor-not-allowed'
                  >
                    -
                  </button>
                  <button className='p-1 text-black/60'>
                    {inCart
                      ? cartItem?.variants?.find(
                          (variant) => variant.size === size
                        )?.quantity
                      : variants.find((variant) => variant.size === size)
                          ?.quantity || 0}
                  </button>
                  <button
                    disabled={
                      inCart ||
                      !variants.some((variant) => variant.size === size)
                    }
                    onClick={() => handleIncrease(size)}
                    className='disabled:bg-gray-300 text-white py-1 px-4 text-sm rounded-sm bg-golden cursor-pointer disabled:cursor-not-allowed'
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='flex flex-col sm:items-center gap-2 sm:flex-row'>
        {stock < 10 && (
          <div className='flex flex-col'>
            <p className='text-sm text-black/70'>
              Only <span className='text-golden'>{stock} items</span> left.
            </p>
            <p className='text-sm text-black/70'>Don&apos;t miss it</p>
          </div>
        )}
        {!inCart && (
          <div className='flex flex-1 sm:justify-end'>
            <button
              disabled={disabled}
              className='py-1 px-4 rounded-2xl border border-golden cursor-pointer flex-grow sm:flex-grow-0 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:border-none disabled:text-white'
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;
