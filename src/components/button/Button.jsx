'use client';

import { useRouter } from 'next/navigation';

const Button = ({ to, handleClick, text, small }) => {
  const router = useRouter();
  return (
    <button
      onClick={handleClick ? handleClick() : () => router.push(to)}
      className={`${
        small ? 'hidden sm:block py-1 px-4 rounded-md' : 'px-6 py-2 '
      }  border-golden border   cursor-pointer capitalize text-sm self-start text-golden`}
    >
      {text || ' order now'}
    </button>
  );
};

export default Button;
