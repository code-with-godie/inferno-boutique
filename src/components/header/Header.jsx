import Topnav from "@/components/nav/Topnav";
import Image from "next/image";
import TopLinks from "../nav/TopLinks";

const Header = () => {
  return (
    <div className=' sticky top-0 z-50 flex flex-col gap-2 bg-gray-200 '>
      <div className=' w-full h-16 relative'>
        <Image
          className=' object-cover object-center'
          fill
          src={"/banner-1.gif"}
          alt='banner'
        />
      </div>
      <Topnav />
      <TopLinks />
    </div>
  );
};

export default Header;
