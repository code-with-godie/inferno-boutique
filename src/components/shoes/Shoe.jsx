import Product from "@/components/category/Popular";
import { getCategoryProducts } from "@/lib/lib";
import Slider from "./Slider";
// import { Rating } from '@mui/material';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { Autoplay } from 'swiper/modules';

const Shoe = async () => {
  const products = await getCategoryProducts({ category: "shoe" });

  if (!products) {
    return <div>could not load shoe</div>;
  }

  return (
    <div className=' flex  items-center flex-col md:p-2 bg-white p-4'>
      {/* <div > */}
      <Slider products={products} />
    </div>
    // </div>
  );
};

export default Shoe;
