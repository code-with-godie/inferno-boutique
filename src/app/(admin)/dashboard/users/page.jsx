import { getUsers } from "@/lib/lib";
import Link from "next/link";
import Table from "@/components/dashboard/table/Table";
import { usersColumns } from "@/utils";

const UsersPage = async ({ searchParams }) => {
  const { q: query } = searchParams;
  const page = searchParams?.page || 1;
  const { users, count } = await getUsers(query, page);

  if (users?.length === 0 && !query) {
    return (
      <div
        className={`flex flex-col gap-4 items-center justify-center h-[90vh] `}
      >
        <p className=' text-gray-400 italic'>
          no users yets. when users register,they will appear here or
        </p>
        <Link className=' bg-sky-600 p-4 rounded-lg' href='/dashboard/new/user'>
          click to add a user
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className=' capitalize text-lg text-textSoft '> users </h1>
      <Table columns={usersColumns} rows={users} />
    </div>
  );
};

export default UsersPage;
