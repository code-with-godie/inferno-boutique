'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MdSearch } from 'react-icons/md';

const Search = ({ to }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleSearch = e => {
    const params = new URLSearchParams(searchParams);
    params.set('page', 1);
    if (e.target.value?.length > 0) {
      params.set('q', e.target.value);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params}`);
  };
  return (
    <div className=' flex justify-between items-center gap-2'>
      <div className=' bg-bg_main px-4 py-2 rounded-md flex items-center gap-2'>
        <MdSearch className=' cursor-pointer' />
        <input
          type='text'
          placeholder='search...'
          onChange={handleSearch}
          className=' bg-transparent outline-none border-none '
        />
      </div>
      <Link
        href={to}
        className=' px-3 py-1 bg-sky-600 rounded-md cursor-pointer'
      >
        add new
      </Link>
    </div>
  );
};

export default Search;
