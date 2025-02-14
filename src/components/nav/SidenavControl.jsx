'use client';
import { useState } from 'react';
import Sidenav from './Sidenav';
import Image from 'next/image';
const SidenavControl = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='relative overflow-hidden'>
      <Sidenav open={open} />
    </div>
  );
};

export default SidenavControl;
