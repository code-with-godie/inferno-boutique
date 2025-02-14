'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ path, title }) => {
  const pathname = usePathname();
  return (
    <Link
      className={` p-2  rounded-lg hover:bg-gray-200 ${
        pathname === path &&
        ' hover:bg-blue-500 bg-blue-500 text-white font-bold'
      }`}
      href={path}
    >
      {title}
    </Link>
  );
};

export default NavLink;
