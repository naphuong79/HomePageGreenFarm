import { Layout, Menu } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import { SlSocialFacebook } from 'react-icons/sl';
import { SlSocialTwitter } from 'react-icons/sl';
import { SlSocialGoogle } from 'react-icons/sl';
import { CiUser } from 'react-icons/ci';
import { CiCreditCard1 } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { FiPhone } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/Auth/authSlice';

function HeaderLayout() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      {/* {header} */}
      <div>
        {/* {header-top} */}
        <div className="bg-[#1a1a1a] max-h-8">
          <div className="container mx-auto py-[6px] flex justify-between items-center">
            {/* {Icon} */}
            <div className="flex space-x-12">
              <div className="text-white text-lg hover:text-[#7aa93c]">
                <SlSocialFacebook />
              </div>
              <div className="text-white text-lg hover:text-[#7aa93c]">
                <SlSocialTwitter />
              </div>
              <div className="text-white text-lg hover:text-[#7aa93c]">
                <SlSocialGoogle />
              </div>
            </div>
            {/* {Text} */}
            <div className="flex space-x-16">
            {auth?.loggedIn &&   <Link
                to="/account/dashboard"
                className="text-white text-base flex justify-center items-center gap-1 hover:text-[#7aa93c]"
              >
                <CiUser />
                <span>Tài khoản của tôi</span>
              </Link>}
              {/* <button className="text-white text-base flex justify-center items-center gap-1 hover:text-[#7aa93c]">
                <CiCreditCard1 />
                <span>Giỏ hàng</span>
              </button> */}

              {auth?.loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white text-base flex justify-center items-center gap-1 hover:text-[#7aa93c]"
                >
                  <IoIosLogOut />
                  <span>Đăng xuất</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-white text-base flex justify-center items-center gap-1 hover:text-[#7aa93c]"
                >
                  <IoIosLogOut />
                  <span>Đăng nhập</span>
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* {header-center} */}
        <div className="bg-white h-36">
          <div className="h-20">
            <div className="container mx-auto py-[20px] flex justify-between items-center">
              <div>
              <a href="index.html" class="navbar-brand"><h1 className="text-3xl text-[#87b106] hover:text-[#FFB524] font-black display-6">Fruitables</h1></a>
              </div>
              {/* {Phone} */}
              <div className=" flex justify-center items-center text-xl font-black text-[#87b106] hover:text-[#FFB524]">
                <div className="text-4xl">
                  <FiPhone />
                </div>
                <div className="pl-4">
                  <div>Liên hệ: 19001098</div>
                  <div></div>
                </div>
              </div>
              {/* {Search} */}
              <div>
                <div className=" flex justify-center items-center rounded-full overflow-hidden" action="">
                  <input
                    className="pl-5 pr-[70px] h-[50px] bg-[#f4f6f8] text-[#0000008c] outline-none border-2 w-[400px]"
                    placeholder="Tìm kiếm..."
                    type="text"
                  />
                  <button className="text-xl bg-[#87b106] h-[50px] w-[55px] flex justify-center items-center  font-black text-[#ffff] hover:bg-[#FFB524]">
                    <FaSearch />
                  </button>
                </div>
              </div>
              {/* {Cart} */}
              <Link to="/cart">
                <button className="w-12 h-12 bg-[#7aa93c] hover:bg-[#FFB524] rounded-full flex justify-center items-center">
                  <FaCartShopping className="text-white" />
                </button>
              </Link>
            </div>
          </div>
          {/* {header-bottom} */}
          <ul className="h-12 flex justify-center items-center gap-[50px] text-base pt-6">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'text-[#81c408]' : 'text-[#0000008c] hover:text-[#81c408] text-base')}
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? 'text-[#81c408]' : 'text-[#0000008c] hover:text-[#81c408] text-base')}
            >
              Cửa hàng
            </NavLink>
            <NavLink
              to="/product/123"
              className={({ isActive }) => (isActive ? 'text-[#81c408]' : 'text-[#0000008c] hover:text-[#81c408] text-base')}
            >
              Sản phẩm chi tiết
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? 'text-[#81c408]' : 'text-[#0000008c] hover:text-[#81c408] text-base')}
            >
              Giỏ hàng
            </NavLink>
            {/* <NavLink
              to="/checkout"
              className={({ isActive }) => (isActive ? 'text-[#7aa93c]' : 'text-[#0000008c] hover:text-[#7aa93c] text-xl')}
            >
              Thanh toán
            </NavLink> */}
          </ul>
        </div>
      </div>
    </>
  );
}
export default HeaderLayout;
