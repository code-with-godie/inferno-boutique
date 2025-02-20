"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push("/");
    }, 5000);

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
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
};

export default SuccessPage;
