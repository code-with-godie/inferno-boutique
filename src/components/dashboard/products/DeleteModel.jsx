import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
} from "@mui/material";

const DeleteModal = ({ open, onClose, product, onDelete }) => {
  if (!product) return null;

  return (
    <Dialog className=' bg-black/25' open={open} onClose={onClose}>
      <DialogTitle className=' text-blue-500'>Confirm Deletion</DialogTitle>
      <DialogContent className='flex flex-col items-center'>
        <Avatar
          width={150}
          height={150}
          className='object-cover rounded-full mb-4'
          src={product?.images[0]?.secure_url}
          alt={product?.title}
        />
        <p className=' line-clamp-4'>{product?.title}</p>
      </DialogContent>
      <DialogActions className=' flex justify-between'>
        <button
          onClick={onClose}
          className=' p-2 bg-blue-500 text-white rounded-lg cursor-pointer'
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className=' p-2 bg-red-500 text-white rounded-lg cursor-pointer'
        >
          Delete
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
