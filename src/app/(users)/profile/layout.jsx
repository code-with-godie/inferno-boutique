import React from "react";
import Link from "next/link";

const ProfileLayout = ({ children }) => {
  return (
    <div className='flex'>
      {/* Sticky Sidebar */}
      <nav className='w-64 bg-gray-100 p-4 shadow-md h-screen sticky top-0'>
        <ul className='space-y-4'>
          <li>
            <Link href='/profile' className='block text-gray-800 font-semibold'>
              Profile
            </Link>
          </li>
          <li>
            <Link
              href='/profile/orders'
              className='block text-gray-800 font-semibold'
            >
              Orders
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className='flex-1 p-8'>{children}</main>
    </div>
  );
};

export default ProfileLayout;
