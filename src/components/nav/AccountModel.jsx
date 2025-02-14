'use client';
import { logout } from '@/lib/actions';
import {
  FavoriteBorderOutlined,
  Login,
  Logout,
  Person2Outlined,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import LoadingAnimation from '../loading/LoadingAnimation';
import { UserButton } from '@clerk/nextjs';
const AccountModel = ({ setShowModel }) => {
  const session = false;
  const router = useRouter();
  const handleNavigate = to => {
    if (session) {
      router.push(to);
    } else {
      router.push('/auth/sign-in');
    }
    setShowModel(false);
  };
  const handleLogout = () => {
    try {
      logout().then(() => {
        setShowModel(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=' hidden bg-white my-shadow  absolute top-[120px] right-10 z-10 md:flex flex-col gap-2 rounded p-1'>
      <div
        className=' flex gap-2 items-center p-2   hover:bg-gray-200 cursor-pointer pr-6 '
        onClick={() => handleNavigate('/')}
      >
        <Person2Outlined className='icon' />
        <p>my account</p>
      </div>
      <div
        className=' flex gap-2 items-center p-2 hover:bg-gray-200 cursor-pointer pr-6'
        onClick={() => handleNavigate('/')}
      >
        <FavoriteBorderOutlined className='icon' />
        <p>orders</p>
      </div>
      <div
        className=' flex gap-2 items-center p-2 hover:bg-gray-200 cursor-pointer pr-6'
        onClick={() => handleNavigate('/')}
      >
        <FavoriteBorderOutlined className='icon' />
        <p>saved items</p>
      </div>
      <UserButton />
      {/* {session ? (
        <div
          className=' flex gap-2 items-center p-2 cursor-pointer pr-6 bg-blue-500 px-3'
          onClick={handleLogout}
        >
          <Logout className='icon text-white' />
          <p className=' text-white'>
            {' '}
            {status === 'loading' ? <LoadingAnimation /> : 'sign-out'}{' '}
          </p>
        </div>
      ) : (
        <div
          className=' flex gap-2 items-center p-2 cursor-pointer pr-6 bg-blue-500 text-white px-3'
          onClick={() => handleNavigate('/sign-in')}
        >
          <Login className='icon text-white' />
          <p className=' text-white'>sign-in</p>
        </div>
      )} */}
    </div>
  );
};

export default AccountModel;
