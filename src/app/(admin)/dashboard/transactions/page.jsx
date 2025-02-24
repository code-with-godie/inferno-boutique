import Link from "next/link";
import Table from "@/components/dashboard/table/Table";
import { getOrders } from "@/lib/lib";
import { transactionsColumns } from "@/utils";
const TransactionsPage = async () => {
  const rows = await getOrders();
  if (rows?.length === 0 && !query) {
    return (
      <div
        className={`flex flex-col gap-4 items-center justify-center h-[90vh] `}
      >
        <p className=' text-gray-400 italic'>
          you have not added any product yet
        </p>
        <Link
          className=' bg-sky-600 p-4 rounded-lg'
          href='/dashboard/new/product'
        >
          click here to add a product
        </Link>
      </div>
    );
  }

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
  return <Table columns={transactionsColumns} rows={formattedRows} />;
};

export default TransactionsPage;
