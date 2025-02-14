import { Avatar } from '@mui/material';
import Pagination from '@/components/dashboard/pagination/Pagination';
import Search from '@/components/dashboard/Search';
import { getUsers } from '@/lib/lib';
import Link from 'next/link';
import { deleteUser } from '@/lib/actions';

const UsersPage = async ({ searchParams }) => {
  const { q: query } = searchParams;
  const page = searchParams?.page || 1;
  const { users, count } = await getUsers(query, page);
  // console.log('count', count);

  if (users?.length === 0 && !query) {
    return (
      <div
        className={`flex flex-col gap-4 items-center justify-center h-[90vh] `}
      >
        <p className=' text-gray-400 italic'>
          no users yets. when users register,they will appear here or
        </p>
        <Link
          className=' bg-sky-600 p-4 rounded-lg'
          href='/dashboard/new/user'
        >
          click to add a user
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1 max-h-[90vh] `}>
      <h1 className=' capitalize text-lg text-textSoft '> users </h1>
      <div className='bg-bgSoft  p-2'>
        <Search to={'/dashboard/new/user'} />
        <div className=' flex-1 rounded-md w-full overflow-auto h-[55vh]'>
          <table className=' w-full overflow-auto'>
            <thead>
              <tr className=' '>
                <td className=' p-2 capitalize font-bold text-sm'>name</td>
                <td className=' p-2 capitalize font-bold text-sm'>email</td>
                <td className=' p-2 capitalize font-bold text-sm'>date</td>
                <td className=' p-2 capitalize font-bold text-sm'>role</td>
                <td className=' p-2 capitalize font-bold text-sm'>action</td>
              </tr>
            </thead>
            <tbody>
              {users?.map((item, index) => (
                <tr
                  key={index}
                  className=''
                >
                  <td className=' flex items-center gap-2 p-2 text-sm'>
                    {' '}
                    <Avatar
                      width={20}
                      height={20}
                      src={item?.avatar}
                      alt={item?.username}
                    />{' '}
                    {item?.username}{' '}
                  </td>
                  <td>
                    <span className={`text-sm p-[.2rem] rounded-md  `}>
                      {item?.email}
                    </span>
                  </td>
                  <td className=' text-sm'>
                    {' '}
                    {item?.createdAt?.toString().slice(2, 10)}{' '}
                  </td>
                  <td className=' text-sm'> {item?.role} </td>
                  <td className=' text-sm flex gap-2 items-start'>
                    <Link
                      href={`/dashboard/users/${item?._id}`}
                      className=' px-3 py-1 bg-cyan-600 rounded-md cursor-pointer'
                    >
                      viewed
                    </Link>
                    <form action={deleteUser}>
                      <input
                        type='hidden'
                        name='id'
                        value={item?._id}
                      />
                      <button className=' px-3 py-1 bg-red-400 rounded-md cursor-pointer'>
                        delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users?.length === 0 && query && (
            <div
              className={`flex flex-col gap-4 items-center justify-center h-20 `}
            >
              <p className=' text-gray-400 italic'>
                {' '}
                {`no users found for search: ${query}`}{' '}
              </p>
            </div>
          )}
        </div>
      </div>
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
