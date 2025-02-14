// 'use client';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
const FeaturedCategory = ({ category, products }) => {
  // const router = useRouter();
  return (
    <Link href={`/category?category=${category}`}>
      <div
        className=' bg-gray-50 md:p-5  h-80 relative cursor-pointer'
        // onClick={() => router.push(`/category?category=${category}`)}
      >
        <Image
          alt='product'
          src={products[0]?.images[0]?.secure_url || 'shoe.png'}
          fill
          className=' object-cover'
        />
        <div className='absolute w-full h-full z-10 flex flex-col gap-2 p-2 top-0 left-0 text-white bg-semi_black'>
          <div className=' flex-1 w-full grid place-content-center'>
            <h1 className='text-3xl font-bold text-white  capitalize'>
              {category} for you
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default FeaturedCategory;
