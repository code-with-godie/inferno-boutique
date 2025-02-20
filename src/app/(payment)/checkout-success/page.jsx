"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    // Set dimensions for Confetti
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    // Cleanup function to clear the timeout
    return () => clearTimeout(redirectTimeout);
  }, [router]);

  return (
    <div className='h-screen w-screen overflow-hidden flex flex-col gap-2 justify-center items-center relative'>
      <Image
        width={200}
        height={200}
        className='object-contain'
        alt='success image'
        src='/success.png'
      />
      <p className='text-gray-500'>waiting for a redirect...</p>
      <p className='text-gray-500'>Thank you for shopping with us.</p>
      <p className='text-gray-500'>Your order is being prepared for delivery</p>
      <Confetti width={dimensions.width} height={dimensions.height} />
    </div>
  );
};

export default SuccessPage;
