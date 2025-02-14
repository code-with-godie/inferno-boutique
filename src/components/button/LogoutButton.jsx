import { logout } from '@/lib/actions';
import React from 'react';

const LogoutButton = () => {
  return (
    <form action={logout}>
      <button
        className={`  px-6 py-2 border-golden border   cursor-pointer capitalize text-sm self-start text-golden`}
      >
        logout
      </button>
    </form>
  );
};

export default LogoutButton;
