'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Confetti from 'react-confetti';

const SuccesPage = () => {
  const router = useRouter();
  //retrieve the order from the stripe
  //save it to the database
  //empty that user cart
  //decrese those items stock
  useEffect(() => {
    setTimeout(() => {
      router.push('/orders');
    }, 5000);
  }, [router]);
  return (
    <div className=' h-screen w-screen overflow-hidden flex  flex-col gap-2 justify-center items-center'>
      <Image
        width={200}
        height={200}
        className=' object-contain'
        alt='success image'
        src='/success.png'
      />
      <p className=' text-gray-500'>waiting for a redirect...</p>
      <p className=' text-gray-500'>Thank you for shopping with us.</p>
      <p className=' text-gray-500'>
        Your order is being prepared for delivery
      </p>
      <Confetti
        width='100vw'
        height='100vh'
      />
    </div>
  );
};

export default SuccesPage;
