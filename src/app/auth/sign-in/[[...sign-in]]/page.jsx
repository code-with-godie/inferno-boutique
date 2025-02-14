"use client";
import Image from "next/image";
import { SignIn as ClerkSignIn } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <div className='h-screen flex gap-2'>
      <div className='relative flex-1 bg-white hidden md:block p-2'>
        <Image src={"/shoe.png"} alt='banner' fill className='object-contain' />
      </div>
      <div className='flex-1 flex justify-center items-center flex-col'>
        <ClerkSignIn />
      </div>
    </div>
  );
};

export default SignIn;
