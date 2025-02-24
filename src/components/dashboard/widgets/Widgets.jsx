import { getStarts } from "@/lib/lib";
import { ArrowUpward } from "@mui/icons-material";
import React from "react";
import {
  MdAttachMoney,
  MdShoppingBag,
  MdSupervisedUserCircle,
} from "react-icons/md";

const Widgets = async () => {
  const starts = await getStarts();
  if (!starts) return <div> could not load starts</div>;
  console.log("starts", starts);

  return (
    <div className=' flex-wrap md:flex-nowrap flex gap-2 p-2'>
      {/* =====================widget start================== */}
      <div className='flex-1 bg-bgSoft p-4 rounded-lg flex  gap-2 hover:bg-bgSoft/70'>
        <MdSupervisedUserCircle className='text-textSoft' />
        <div className=' flex flex-col flex-1 gap-2'>
          <p className='  capitalize text-textSoft'>total users</p>
          <p className=' text-2xl capitalize font-bold text-textSoft'>
            {" "}
            {starts?.users || 0}{" "}
          </p>
          <div className='  flex gap-2 items-center'>
            <span className='text-sm text-textSoft'>12%</span>
            <div className=' flex'>
              <ArrowUpward className=' text-lg text-green-400' />
              <ArrowUpward className=' text-lg text-green-400' />
            </div>
          </div>
        </div>
      </div>
      {/* =====================widget start================== */}
      {/* =====================widget start================== */}
      <div className='flex-1 bg-bgSoft p-4 rounded-lg flex  gap-2 hover:bg-bgSoft/70'>
        <MdShoppingBag className='text-textSoft' />
        <div className=' flex flex-col flex-1 gap-2'>
          <p className='  capitalize text-textSoft'>total products</p>
          <p className=' text-2xl capitalize font-bold  text-textSoft'>
            {" "}
            {starts?.products || 0}{" "}
          </p>
          <div className='  flex gap-2 items-center'>
            <span className='text-sm text-textSoft'>12%</span>
            <div className=' flex'>
              <ArrowUpward className=' text-lg text-green-400' />
              <ArrowUpward className=' text-lg text-green-400' />
            </div>
          </div>
        </div>
      </div>
      {/* =====================widget start================== */}
      {/* =====================widget start================== */}
      <div className='flex-1 bg-bgSoft p-4 rounded-lg flex  gap-2 hover:bg-bgSoft/70 '>
        <MdAttachMoney className='text-textSoft' />
        <div className=' flex flex-col flex-1 gap-2'>
          <p className='  capitalize text-textSoft'>total orders</p>
          <p className=' text-2xl capitalize font-bold  text-textSoft'>
            {" "}
            {starts?.orders || 0}
          </p>
          <div className='  flex gap-2 items-center'>
            <span className='text-sm text-textSoft'>12%</span>
            <div className=' flex'>
              <ArrowUpward className=' text-lg text-green-400' />
              <ArrowUpward className=' text-lg text-green-400' />
            </div>
          </div>
        </div>
      </div>
      {/* =====================widget start================== */}
    </div>
  );
};

export default Widgets;
