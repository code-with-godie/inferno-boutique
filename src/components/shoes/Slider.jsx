"use client";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Discount from "../discount/Discount";

const Slider = ({ products }) => {
  return (
    <Swiper
      autoplay={{ delay: 2000 }}
      loop={true}
      modules={[Autoplay]}
      spaceBetween={10}
      breakpoints={{
        480: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
        },
        900: {
          slidesPerView: 4,
        },
      }}
      className='flex gap-x-2 overflow-auto h-80 w-full'
    >
      {products.map((item) => (
        <SwiperSlide key={item._id}>
          <Link
            href={`/category?category=${item?.category}`}
            className='w-60 h-full flex flex-col gap-4 flex-shrink-0  p-2 px-6'
          >
            <div className='relative w-full h-80'>
              <Image
                src={item?.images[0]?.secure_url || "/product.png"}
                alt=''
                fill
                className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 w-full h-full'
              />

              <Image
                src={item?.images[1]?.secure_url || "/product.png"}
                alt=''
                fill
                // sizes='30vw'
                className='absolute object-cover rounded-md w-full h-full'
              />
              {item?.discount > 0 && (
                <Discount price={item?.price} discount={item?.discount} />
              )}
            </div>
            <div className='flex flex-col justify-between'>
              <span className='font-medium line-clamp-1'>{item?.title}</span>
              <div className='flex items-center gap-2'>
                {item?.discount ? (
                  <>
                    <h3 className='text-lg text-gray-500 line-through'>
                      ${item?.price}
                    </h3>
                    <h2 className='font-medium text-lg'>
                      ${item?.price - item?.discount}
                    </h2>
                  </>
                ) : (
                  <>
                    <h2 className='font-medium text-lg'>${item?.price}</h2>
                  </>
                )}
              </div>
            </div>
            <div className='flex justify-between'>
              <Rating readOnly value={item?.rating} />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
