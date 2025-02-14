import Image from "next/image";
import React from "react";
import { Rating } from "@mui/material";
import Link from "next/link";
import Discount from "../discount/Discount";

const Popular = ({ title, price, discount, rating, _id, images }) => {
  return (
    <Link
      href={`/category/${_id}`}
      className=' flex flex-col gap-4  p-4  my-shadow'
      key={_id}
    >
      <div className='relative w-full h-80'>
        <Image
          src={images[0]?.secure_url || "/product.png"}
          alt=''
          fill
          sizes='30vw'
          className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
        />

        <Image
          src={images[1]?.secure_url || "/product.png"}
          alt=''
          fill
          sizes='30vw'
          className='absolute object-cover rounded-md'
        />
        {discount > 0 && <Discount price={price} discount={discount} />}
      </div>
      <div className='flex  flex-col justify-between'>
        <span className='font-medium line-clamp-3'>{title}</span>
        <div className='flex items-center gap-2'>
          {discount ? (
            <>
              <h3 className='text-lg text-gray-500 line-through'>${price}</h3>
              <h2 className='font-medium text-lg'>${price - discount}</h2>
            </>
          ) : (
            <>
              <h2 className='font-medium text-lg'>${price}</h2>
            </>
          )}
        </div>
      </div>
      <div className='flex justify-between'>
        <Rating readOnly value={rating} />
      </div>
      <button className='rounded-2xl ring-1 ring-golden w-max py-2 px-4 text-xs hover:bg-golden hover:text-white'>
        Add to Cart
      </button>
    </Link>
  );
};
export default Popular;
