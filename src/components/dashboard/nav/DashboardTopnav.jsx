import { Chat, Notifications, Search, Settings } from '@mui/icons-material';

const DashboardTopnav = () => {
  return (
    <div className=' flex-col md:flex-row p-1 bg-bgSoft rounded-sm flex items-center gap-2'>
      <h1 className='hidden md:flex flex-1 text-lg capitalize p-2 text-textSoft'>
        Dashboard
      </h1>
      <div className=' flex-col-reverse md:flex-row flex items-center gap-2 w-full'>
        <form
          action=''
          className=' bg-bg_main px-4 py-2 rounded-md flex items-center gap-2 w-full'
        >
          <Search className=' cursor-pointer text-textSoft' />
          <input
            type='text'
            placeholder='search...'
            className=' bg-transparent outline-none border-none '
          />
        </form>
        <div className=' w-full flex justify-evenly md:justify-end gap-2 p-2'>
          <h1 className=' flex-1 text-lg capitalize md:hidden text-textSoft'>
            Dashboard
          </h1>
          <Chat className=' cursor-pointer text-textSoft' />
          <Notifications className=' cursor-pointer text-textSoft' />
          <Settings className=' cursor-pointer text-textSoft' />
        </div>
      </div>
    </div>
  );
};

export default DashboardTopnav;
