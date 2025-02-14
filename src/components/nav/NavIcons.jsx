'use client';
import { ShoppingCart } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import AuthButton from '../button/AuthButton';
import CartModal from '../cart/CartModel';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LogoutButton from '../button/LogoutButton';
import { Suspense } from 'react';
import LoadingAnimation from '../loading/LoadingAnimation';

const NavIcons = () => {
  const router = useRouter();
  const {
    cart: { amount },
    toggleCartModel,
    showcart,
  } = useAppContext();
  const session = useSession();
  return (
    <div className='flex items-center gap-2 p-2'>
      {session?.data?.user?.role === 'admin' && (
        <button
          className=' hidden sm:block py-1 px-4 rounded-md  bg-gray-800 cursor-pointer capitalize text-sm self-start text-white'
          onClick={() => router.push('/dashboard')}
        >
          dashboard
        </button>
      )}
      {session.status === 'authenticated' ? (
        <Suspense fallback={<LoadingAnimation />}>
          <LogoutButton />
        </Suspense>
      ) : (
        <>
          <AuthButton
            text='sign up'
            login={false}
          />
          <AuthButton
            text='sign in'
            login={true}
          />
        </>
      )}

      {session.status === 'authenticated' && (
        <div>
          <Avatar className=' text-2xl' />
          {/* <span>hello, guest</span> */}
        </div>
      )}
      <div className='relative p-1'>
        <div className=' absolute z-50 -top-2 -right-2 p-1 rounded-full bg-golden size-5 grid place-content-center text-white font-bold'>
          {' '}
          {amount}{' '}
        </div>
        <ShoppingCart
          onClick={toggleCartModel}
          className=' text-3xl cursor-pointer'
        />
      </div>
      {showcart && <CartModal />}
    </div>
  );
};

export default NavIcons;
