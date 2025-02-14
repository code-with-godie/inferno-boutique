"use client";
import { Dashboard, Help, Home, Logout, Settings } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  MdAttachMoney,
  MdShoppingBag,
  MdSupervisedUserCircle,
} from "react-icons/md";
const DashboardSidenav = () => {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <div className='w-max md:w-1/5 bg-bgSoft md:min-w-[250px] overflow-auto p-2'>
      <div className=' flex gap-2 items-center mb-2'>
        <Avatar
          src={user?.imageUrl}
          className=' w-10 h-10 md:w-14 md:h-14'
          alt='user'
        />
        <div className=' flex-1 flex flex-col'>
          <h1 className=' hidden md:block capitalize font-bold text-lg text-textSoft'>
            {user?.fullName}
          </h1>
          <p className=' hidden md:block italic text-gray-500'>administrator</p>
        </div>
      </div>
      <div className=' flex flex-col gap-3'>
        <h1 className=' text-gray-500 capitalize'>pages</h1>
        <div className=' flex flex-col gap-3'>
          <Link
            href='/dashboard'
            className={`flex items-center  hover:bg-gray-50/10 px-2 rounded-lg cursor-pointer py-2 gap-2 ${
              pathname === "/dashboard" &&
              " bg-textSoft hover:bg-textSoft text-white"
            }`}
          >
            <Dashboard className=' text-3xl md:text-lg ' />
            <p className='hidden md:block text-lg  capitalize '>dashboard</p>
          </Link>
          <Link
            href='/dashboard/users'
            className={`flex items-center  hover:bg-gray-50/10 px-2 rounded-lg cursor-pointer py-2 gap-2 ${
              pathname === "/dashboard/users" &&
              " bg-textSoft hover:bg-textSoft text-white"
            }`}
          >
            <MdSupervisedUserCircle className=' text-3xl md:text-lg ' />
            <p className=' hidden md:block text-lg capitalize'>users</p>
          </Link>
          <Link
            href='/dashboard/products'
            className={`flex items-center  hover:bg-gray-50/10 px-2 rounded-lg cursor-pointer py-2 gap-2 ${
              pathname === "/dashboard/products" &&
              " bg-textSoft hover:bg-textSoft text-white"
            }`}
          >
            <MdShoppingBag className=' text-3xl md:text-lg' />
            <p className=' hidden md:block text-lg  capitalize'>products</p>
          </Link>
          <Link
            href='/dashboard/transactions'
            className={`flex items-center  hover:bg-gray-50/10 px-2 rounded-lg cursor-pointer py-2 gap-2 ${
              pathname === "/dashboard/transactions" &&
              " bg-textSoft hover:bg-textSoft text-white"
            }`}
          >
            <MdAttachMoney className=' text-3xl md:text-lg' />
            <p className='hidden md:block text-lg capitalize'>transactions</p>
          </Link>
          <Link
            href='/'
            className={`flex items-center  hover:bg-gray-50/10 px-2 rounded-lg cursor-pointer py-2 gap-2 ${
              pathname === "/" && " bg-textSoft hover:bg-textSoft text-white"
            }`}
          >
            <Home className=' text-3xl md:text-lg ' />
            <p className='hidden md:block text-lg capitalize'>Back to app</p>
          </Link>
        </div>
      </div>
      <div className=' flex flex-col gap-1'>
        <h1 className=' text-gray-500 capitalize'>users</h1>
        <div className=' flex flex-col gap-3'>
          <div className=' flex items-center  hover:bg-gray-50/10 px-2 rounded-lg cursor-pointer py-2 gap-2'>
            <Settings className=' text-3xl md:text-lg' />
            <p className='hidden md:block text-lg capitalize'>settings</p>
          </div>
          <div className=' flex items-center gap-2 hover:bg-gray-50/10 px-2 rounded-lg cursor-pointer py-2'>
            <Help className='text-3xl md:text-lg ' />
            <p className='hidden md:block text-lg  capitalize'>help</p>
          </div>
          <div className=' flex items-center gap-2 hover:bg-gray-50/10 px-2 rounded-lg cursor-pointer py-2 bg-gray-500'>
            <Logout className=' text-3xl md:text-lg ' />
            <p className='hidden md:block text-lg  capitalize'>logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidenav;
