import Image from 'next/image';
import React from 'react';

const FirstBanner = () => {
  return (
    <div className='flex flex-col px-4 md:flex-row justify-between md:h-64 relative bg-pink-100'>
      <div className=' absolute top-0 left-0 z-10 bg-semi_black md:bg-transparent md:static bottom-0 w-full flex flex-col items-center justify-center gap-8 md:w-2/3'>
        <h1 className=' text-white text-3xl  md:text-4xl font-semibold leading-[48px] md:text-gray-700'>
          Grab up to 50% off on
          <br /> Selected Products
        </h1>
        <button className='px-6 py-2 border-golden border   cursor-pointer capitalize text-sm self-center text-golden'>
          Buy Now
        </button>
      </div>
      <div className='h-80 w-full relative md:w-1/3 md:h-auto'>
        <Image
          src='/woman.png'
          alt=''
          fill
          className='object-contain'
        />
      </div>
    </div>
  );
};

export default FirstBanner;
