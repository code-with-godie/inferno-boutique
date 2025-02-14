import Filters from '@/components/filters/Filters';
import ProductList from '@/components/productList/ProductList';
import Skeleton from '@/components/skeleton/Skeleton';
import Image from 'next/image';
import { Suspense } from 'react';

const ListPage = async ({ searchParams }) => {
  const params = new URLSearchParams(searchParams);
  const category = params.get('category');
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
      {/* CAMPAIGN */}
      <div className='hidden bg-pink-50 px-4 sm:flex justify-between h-64'>
        <div className='w-2/3 flex flex-col items-center justify-center gap-8'>
          <h1 className='text-4xl font-semibold leading-[48px] text-gray-700'>
            Grab up to 50% off on
            <br /> Selected {category}
          </h1>
        </div>
        <div className='relative w-1/3'>
          <Image
            src='/woman.png'
            alt=''
            fill
            className='object-contain'
          />
        </div>
      </div>
      {/* FILTER */}
      <Filters category={category} />
      {/* PRODUCTS */}
      <h1 className='mt-12 text-xl font-semibold'>
        {' '}
        {category ? `${category} for you!` : `products for you!`}
      </h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList
          category={category}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
