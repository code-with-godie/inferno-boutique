import React from "react";
import Table from "../table/Table";
import { getOrders } from "@/lib/lib";
import { transactionsColumns } from "@/utils";
const Transactions = async ({ title }) => {
  const rows = await getOrders(true);

  // Map the data to match the columns
  const formattedRows = rows.map((row) => ({
    _id: row._id, // Assuming each row has a unique _id
    username: row.userID?.username || "Unknown User", // Adjust based on your user schema
    avatar: row.userID?.avatar, // Adjust based on your user schema
    status: row.status,
    count: row?.products?.length || 0,
    products: row?.products,
    createdAt: row.createdAt, // Format the date
    total: `$${row.total.toFixed(2)}`, // Format the total as currency
  }));

  return (
    <div className='bg-bgSoft shrink-0 rounded-md h-[400px] overflow-x-auto p-1'>
      <h1 className='capitalize text-lg text-textSoft py-4'>{title}</h1>
      <Table columns={transactionsColumns} rows={formattedRows} />
    </div>
  );
};

export default Transactions;
