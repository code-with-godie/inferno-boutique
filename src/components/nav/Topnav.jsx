"use client";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import { Dashboard, KeyboardArrowDown, Search } from "@mui/icons-material";
import { Badge } from "@mui/material";
import CartModal from "../cart/CartModel";
import { useAppContext } from "@/context/AppContext";
import Sidenav from "./Sidenav";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { checkAdmin } from "@/actions";
const Topnav = () => {
  const {
    cart: { amount },
    toggleCartModel,
    showcart,
  } = useAppContext();
  const [open, setOpen] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const session = useAuth();

  useEffect(() => {
    if (session) {
      checkAdmin(session?.userId).then((result) => {
        setIsAdmin(result);
      });
    }
  }, [session]);
  return (
    <div className=' bg-white flex flex-col gap-4 p-2 overflow-hidden'>
      <div className=' flex items-center gap-4 p-2  justify-between px-2 py-1'>
        <div className='flex-1 md:flex-none flex gap-2 items-center'>
          <Link href='/'>
            <h1 className=' font-bold text-xl'>INFERNO</h1>
          </Link>
          <Image
            width={40}
            height={40}
            className='rounded-full object-contain'
            alt='logo'
            src={"/logo.png"}
          />
        </div>
        <form className=' hidden max-w-[700px] flex-1 md:flex items-center gap-4 '>
          <div className=' rounded-lg border border-gray-300 flex-1  p-2 flex items-center gap-2'>
            <Search className=' text-gray-300' />
            <input
              type='text'
              className=' flex-1 bg-transparent outline-none border-none min-w-0'
              placeholder='search for brands,category,title....'
            />
          </div>
          <button className=' px-4 py-2 rounded-lg bg-blue-500 cursor-pointer text-white font-bold'>
            search
          </button>
        </form>
        <div className=' flex gap-4 items-center'>
          <div
            // onClick={() => setShowModel(prev => !prev)}
            className=' flex gap-2 items-center cursor-pointer'
          >
            <SignedOut>
              <button>
                <SignInButton />
              </button>
            </SignedOut>
            <div className=' hidden md:block'>
              <SignedIn>
                Hi,{" "}
                <button className=' text-blue-500'>
                  <UserButton showName />
                </button>
              </SignedIn>
            </div>
          </div>

          {isAdmin && (
            <Link href={"/dashboard"} className=' px-2 hidden md:block'>
              <Dashboard className=' text-blue-500 text-3xl' />
            </Link>
          )}
          <div
            onClick={toggleCartModel}
            className=' flex gap-2 items-center p-2 cursor-pointer'
          >
            <Badge
              badgeContent={
                <p className='  bg-blue-500 p-1 font-bold  text-white rounded-full'>{`${amount}`}</p>
              }
            >
              <FiShoppingCart className=' text-3xl  text-gray-600' />
            </Badge>
          </div>
          <button className=' sm:hidden' onClick={() => setOpen(true)}>
            {" "}
            <Image src='/menu.png' alt='menu' width={30} height={30} />{" "}
          </button>
        </div>
      </div>
      <div className=' flex md:hidden'>
        <form action='' className=' flex-1 flex items-center gap-4'>
          <div className=' rounded-2xl border border-gray-400 flex-1  p-2 flex items-center gap-2'>
            <Search className=' text-gray-400' />
            <input
              type='text'
              className=' flex-1 bg-transparent outline-none border-none min-w-0'
              placeholder='search for brands,category,title....'
            />
          </div>
        </form>
      </div>
      {showcart && <CartModal />}
      {/* {showModel && <AccountModel setShowModel={setShowModel} />} */}
      <Sidenav setOpen={setOpen} open={open} />
    </div>
  );
};

export default Topnav;
