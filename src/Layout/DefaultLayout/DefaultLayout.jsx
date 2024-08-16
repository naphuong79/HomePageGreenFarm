import { Outlet } from 'react-router-dom';

import FooterLayout from '../inc/FooterLayout';
import HeaderLayout from '../inc/HeaderLayout';

function DefaultLayout() {
  return (
    <div className="">
      <HeaderLayout />
      <main className="mx-auto">
        <Outlet />
      </main>
      <FooterLayout />
    </div>
  );
}

export default DefaultLayout;
