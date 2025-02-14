import Link from "next/link";
import React from "react";

const Actions = ({ id, deleteAction }) => {
  return (
    <div className=' flex items-center gap-2  h-full'>
      <Link
        href={`/dashboard/products/${id}` || "/dashboard"}
        className=' px-3 py-1 bg-cyan-600 rounded-md cursor-pointer'
      >
        view
      </Link>
      <form action={deleteAction}>
        <input type='hidden' name='id' value={id} />
        <button className=' px-3 py-1 bg-red-400 rounded-md cursor-pointer'>
          delete
        </button>
      </form>
    </div>
  );
};

export default Actions;
