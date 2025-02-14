import React from 'react';

const DashboardFooter = () => {
  return (
    <div className=' flex items-center justify-between text-textSoft italic'>
      {' '}
      <p>Inferno boutique</p>{' '}
      <p> &copy; All rights reserved {new Date().getFullYear()}. </p>{' '}
    </div>
  );
};

export default DashboardFooter;
