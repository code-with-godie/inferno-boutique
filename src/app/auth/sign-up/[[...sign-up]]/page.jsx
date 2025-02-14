"use client";
import Image from "next/image";
import { SignUp as ClearkSignUp } from "@clerk/nextjs";
const SignUp = () => {
  return (
    <div className=' h-screen flex gap-2'>
      <div className=' relative flex-1 bg-white  hidden md:block p-2'>
        <Image
          src={"/shoe.png"}
          alt='banner'
          fill
          className=' object-contain'
        />
      </div>
      <ClearkSignUp />
    </div>
  );
};

export default SignUp;
