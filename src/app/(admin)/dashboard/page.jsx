import LineChart from '@/components/dashboard/chats/LineChart';
import MyPieChart from '@/components/dashboard/piechart/MyPieChart';
import Transactions from '@/components/dashboard/trasactions/Transactions';
import Widgets from '@/components/dashboard/widgets/Widgets';
import WidgetSkeleton from '@/components/skeleton/WidgetSkeleton';
import { Suspense } from 'react';

const Dashboard = () => {
  return (
    <div className=' flex-col lg:flex-row flex gap-2  flex-1  overflow-auto'>
      <div className=' w-full  lg:w-4/6  flex flex-col gap-2'>
        <Suspense fallback={<WidgetSkeleton />}>
          <Widgets />
        </Suspense>
        <Transactions title='Latest Transaction' />
        <LineChart />
      </div>
      <div className='flex-1 min-h-72 p-2 bg-bgSoft md:h-auto md:flex-none w-full md:w-1/3 md:sticky md:top-0  '>
        <h1 className=' text-lg font-semibold text-textSoft'>
          Category distribution
        </h1>
        <MyPieChart />
      </div>
    </div>
  );
};

export default Dashboard;
