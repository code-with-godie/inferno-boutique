import UserDetails from '@/components/dashboard/user/UserDetails';
import { getUser, getUsers } from '@/lib/lib';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params: { id } }) {
  const user = await getUser(id);
  if (!user?.username)
    return {
      title: 'user does not exist',
    };

  return {
    title: user?.username,
    description: `this is ${user?.username} page`,
  };
}
export async function generateStaticParams() {
  const res = await getUsers(null, 'all');
  console.log('found', res);

  if (!res) return [];
  return res?.users?.map(user => ({
    id: user?._id,
  }));
}
const Single = async ({ params: { id } }) => {
  const user = await getUser(id);
  if (!user) return notFound();
  return <UserDetails {...user} />;
};

export default Single;
