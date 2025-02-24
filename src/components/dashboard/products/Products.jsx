"use client";
import { Avatar } from "@mui/material";
import Table from "../table/Table";
import Actions from "./Actions";
import { deleteProduct } from "@/lib/actions";
import Search from "../Search";
import moment from "moment";

const columns = [
  {
    field: "images",
    headerName: "Image",
    width: 70,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>
        <Avatar
          width={90}
          height={90}
          className='object-cover rounded-full cursor-pointer bg-white'
          src={params.row?.images[0]?.secure_url}
          alt={params.row?.title}
        />
      </div>
    ),
  },
  {
    field: "title",
    headerName: "Title",
    width: 100,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>{params.row.title}</div>
    ),
  },
  {
    field: "colors",
    headerName: "Colors",
    width: 130,
    renderCell: (params) => (
      <div className='flex items-center justify-center gap-2 h-full'>
        {params.row?.colors?.length > 0 ? (
          params.row?.colors.map((color, index) => (
            <p
              style={{ backgroundColor: color }}
              key={index}
              className='p-2 rounded-full mr-2 shadow-lg'
            ></p>
          ))
        ) : (
          <p className='text-red-500'>No colors</p>
        )}
      </div>
    ),
  },
  {
    field: "sizes",
    headerName: "Size(s)",
    width: 150,
    renderCell: (params) => (
      <div className='flex items-center justify-center gap-2 h-full p-2'>
        {params.row?.sizes?.length > 0 ? (
          params.row?.sizes.map((size, index) => (
            <p key={index} className='mr-2 shadow-lg  p-2 rounded-lg'>
              {size}
            </p>
          ))
        ) : (
          <p className='text-red-500'>No sizes</p>
        )}
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Price(USD)",
    width: 70,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>{params.row.price}</div>
    ),
  },
  {
    field: "discount",
    headerName: "Discount(USD)",
    width: 100,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>
        {params.row.discount}
      </div>
    ),
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 50,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>
        {params.row.rating}
      </div>
    ),
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>
        {params.row.category}
      </div>
    ),
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 50,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>{params.row.stock}</div>
    ),
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 100,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>{params.row.brand}</div>
    ),
  },
  {
    field: "climates",
    headerName: "Climate",
    width: 120,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>
        {params.row.climates?.join(",")}
      </div>
    ),
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 80,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>
        {params.row.gender}
      </div>
    ),
  },
  {
    field: "description",
    headerName: "Description",
    width: 120,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>
        {params.row.description}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Date",
    width: 150,
    renderCell: (params) => {
      const date = moment(params?.row?.createdAt).format("MMMM Do YYYY");
      return <div className='flex items-center justify-center'>{date}</div>;
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 170,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>
        <Actions
          deleteAction={deleteProduct}
          page='products'
          id={params.id}
          product={params.row} // Pass the full product data here
        />
      </div>
    ),
  },
];

const Products = ({ rows }) => {
  return (
    <div className='h-[85vh]'>
      <Search to={"/dashboard/new/product"} />
      <Table columns={columns} rows={rows} />
    </div>
  );
};

export default Products;
