'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import { slides } from '@/data/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const Slider = () => {
  const router = useRouter();
  return (
    <div className=' flex h-[70vh] w-full '>
      <Swiper
        className=' relative w-full h-full'
        spaceBetween={0}
        pagination
        autoplay={{
          delay: 3000,
        }}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay, A11y, Pagination]}
      >
        {slides.map(item => (
          <SwiperSlide
            key={item.id}
            className=' w-full h-full'
          >
            <div
              className={` w-full h-full cursor-pointer flex relative md:bg-[${item.bg}]`}
              onClick={() => router.push(`/category?climate=winter`)}
            >
              <div className=' flex-1 grid place-content-center absolute text-white z-10 w-full h-full md:flex-1 md:static md:text-black '>
                <h1 className=' text-center text-3xl md:text-4xl'>
                  {' '}
                  {item.title}{' '}
                </h1>
                <p className=' text-center text-lg md:text-2xl'>
                  {' '}
                  {item.description}{' '}
                </p>
              </div>
              <div className=' relative flex-1 bg-semi_black'>
                <Image
                  className=' object-cover opacity-70 md:opacity-100'
                  src={item.img}
                  fill
                  alt='an image display'
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
