import { links } from '@/data/data';
import { Facebook, Instagram, X } from '@mui/icons-material';
import Link from 'next/link';
const TopLinks = () => {
  return (
    <div className=' hidden p-2 sm:flex items-center gap-4 bg-blue-950'>
      <div className='flex items-center gap-2'>
        <Facebook className=' text-sm text-white' />
        <Instagram className=' text-sm text-white' />
        <X className=' text-sm text-white' />
      </div>
      <div>
        {links.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className=' text-white'
          >
            {' '}
            {item.title}{' '}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopLinks;
