'use client';

import { useAppContext } from '@/context/AppContext';

const AuthButton = ({ login, text }) => {
  const { toggleLogin } = useAppContext();
  const handleClick = () => {
    toggleLogin(login);
  };
  return (
    <button
      onClick={handleClick}
      className=' hidden sm:block py-1 px-4 rounded-md border-golden border   cursor-pointer capitalize text-sm self-start text-golden'
    >
      {text}
    </button>
  );
};

export default AuthButton;
