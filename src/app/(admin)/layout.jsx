import DashboardFooter from '@/components/dashboard/footer/DashboardFooter';
import DashboardSidenav from '@/components/dashboard/nav/DashboardSidenav';
import DashboardTopnav from '@/components/dashboard/nav/DashboardTopnav';

const AdminLayout = ({ children }) => {
  return (
    <section className=' bg-bg_main w-full h-screen overflow-auto text-white flex'>
      <DashboardSidenav />
      <div className=' flex-1 px-2 pb-2 flex flex-col  overflow-auto'>
        <DashboardTopnav />
        {children}
        {/* <div className=' flex-1 md:overflow-auto'></div> */}
        <DashboardFooter />
      </div>
    </section>
  );
};

export default AdminLayout;
