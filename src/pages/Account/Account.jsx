import { useState } from 'react';
import ClientProductsYour from '../../components/ClientProductsYour/ClientProductsYour';
import Profile from '../../components/Profile/Profile';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../features/Auth/authSlice';
import TableOrder from './TableOrder/TableOrder';
import { Link } from 'react-router-dom';
import { RiAdminLine } from "react-icons/ri";

function Account() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [sidebarBtn, setSidebarBtn] = useState('info');
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex p-6 mx-auto container">
      {/* {sidebar} */}
      <div className="w-1/5">
        <nav class="flex max-w-[100px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 ">
          <div
            role="button"
            onClick={() => {
              setSidebarBtn('');
            }}
            class="flex items-center w-48 p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            <div class="grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            Đơn hàng của bạn
          </div>
            {auth?.currentUser?.role === 'admin' &&  <Link
            to="/admin"
            class="flex items-center w-48 p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            <div class="grid mr-4 place-items-center">
            <RiAdminLine />
            </div>
            Quản trị Admin
          </Link>}
          <div
            role="button"
            onClick={() => {
              setSidebarBtn('info');
            }}
            class="flex items-center w-48 p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            <div class="grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            Tài khoản
          </div>
         

          <div
            role="button"
            onClick={handleLogout}
            class="flex items-center w-48 p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            <div class="grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            Đăng xuất
          </div>
        </nav>
      </div>
      {/* {Right} */}
      <div className="w-4/5">
        {/* <ClientProductsYour/> */}

        {sidebarBtn === 'info' ? <Profile /> : <TableOrder />}
      </div>
    </div>
  );
}

export default Account;
