import React from "react";

const Discount = ({ price, discount }) => {
  let discountedPercentage = (discount / 100) * 100;
  discountedPercentage = discountedPercentage.toFixed(2);
  return (
    <div className=' absolute z-10 top-1 right-1 bg-black px-2 py-1 rounded-lg'>
      <p className=''>{discountedPercentage}% off</p>
    </div>
  );
};

export default Discount;
