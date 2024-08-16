import { Outlet } from 'react-router-dom';

import FooterLayout from '../inc/FooterLayout';
import HeaderLayout from '../inc/HeaderLayout';
import SidebarAdmin from '../inc/SidebarAdmin/SidebarAdmin';

function DefaultLayout() {
  return (
    <div className="">
      <HeaderLayout />
      <main className="flex w-full">
        <div className="w-1/5">
          <SidebarAdmin />
        </div>
        <div className="p-6 w-4/5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DefaultLayout;
