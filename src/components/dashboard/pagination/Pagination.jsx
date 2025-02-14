'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Pagination = ({ count }) => {
  console.log('count', count);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const page = searchParams.get('page') || 1;
  const ITEMS_PER_PAGE = 10;
  const hasPrev = ITEMS_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext =
    ITEMS_PER_PAGE * (parseInt(page) - 1) + ITEMS_PER_PAGE < count;
  const changePage = type => {
    type === 'prev'
      ? params.set('page', parseInt(page) - 1)
      : params.set('page', parseInt(page) + 1);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className=' p-2 flex justify-between'>
      {' '}
      <button
        onClick={() => changePage('prev')}
        className=' px-3 py-1 bg-white text-black rounded-md cursor-pointer disabled:bg-gray-500 disabled:text-gray-200 disabled:cursor-not-allowed'
        disabled={!hasPrev}
      >
        prev
      </button>
      <button
        onClick={() => changePage('next')}
        className=' px-3 py-1 bg-white text-black rounded-md cursor-pointer disabled:bg-gray-500 disabled:text-gray-200 disabled:cursor-not-allowed'
        disabled={!hasNext}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
