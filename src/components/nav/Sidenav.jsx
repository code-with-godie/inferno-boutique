import { links } from "@/data/data";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Sidenav = ({ open, setOpen }) => {
  return (
    <div
      onClick={() => setOpen(false)}
      className={`flex flex-col gap-4 absolute z-[3000] bg-white sm:hidden  p-4 right-0 h-screen duration-100 top-0 w-screen max-w-[300px] ${
        open ? " translate-x-0" : " translate-x-full"
      } `}
    >
      <div className=' justify-between  flex gap-2 items-center'>
        <Link href='/'>
          <h1 className=' font-bold text-xl '>INFERNO</h1>
        </Link>
        <IconButton>
          <Close />
        </IconButton>
      </div>
      <div className=' flex  flex-col gap-4'>
        {links.map((item, index) => (
          <NavLink key={index} path={item.path} title={item.title} />
        ))}
      </div>
      <SignedIn>
        <button className=' text-blue-500'>
          <UserButton showName />
        </button>
      </SignedIn>
    </div>
  );
};

export default Sidenav;
