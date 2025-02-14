'use client';

import { useAppContext } from '@/context/AppContext';
import Login from './Login';
import Register from './Register';

const AuthLayout = () => {
  const { showAuthModel, showLogin } = useAppContext();
  if (!showAuthModel) return;
  return (
    <div className=' h-screen w-screen z-[100] absolute top-0 left-0 flex items-center justify-center overflow-hidden'>
      {showLogin ? <Login /> : <Register />}
    </div>
  );
};

export default AuthLayout;
