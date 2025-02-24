import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa"; // Import icons
import DeleteModal from "./DeleteModel"; // Import the delete modal

const Actions = ({ id, product, deleteAction }) => {
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteAction({ id }); // Perform the deletion logic
    setOpen(false); // Close the modal after deletion
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='flex items-center gap-2 h-full'>
      {/* View Button */}
      <Link
        href={`/dashboard/products/${id}`}
        className='flex items-center gap-1 px-3 py-1 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition-all duration-300'
      >
        <FaEye className='text-sm' />
        <span className='hidden sm:inline'>View</span>
      </Link>

      {/* Delete Button */}
      <button
        onClick={handleDeleteClick}
        className='flex items-center gap-1 px-3 py-1 text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 transition-all duration-300'
      >
        <FaTrash className='text-sm' />
        <span className='hidden sm:inline'>Delete</span>
      </button>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        open={open}
        onClose={handleClose}
        product={product}
        onDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default Actions;
