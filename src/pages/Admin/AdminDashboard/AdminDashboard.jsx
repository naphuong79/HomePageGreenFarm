import ProductManager from '../ProductManager/ProductManager';
import { AiOutlineDollar } from 'react-icons/ai';
import { IoBagOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

function AdminDashboard() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 ">
        <div className="shadow-md p-4 hover:shadow-xl hover:-translate-y-2 duration-700">
          <h1 className="font-medium uppercase text-[#878a99]">TỔNG DOANH THU</h1>
          <div className="flex justify-between mt-6">
            <h3 className="mb-6 text-[#495057] font-semibold text-[22px]">1000</h3>
            <div className="w-12 h-12 bg-[#45cb85] rounded-lg flex justify-center items-center ">
              <AiOutlineDollar className="text-white text-2xl" />
            </div>
          </div>
        </div>
        <div className="shadow-md p-4 hover:shadow-xl hover:-translate-y-2 duration-700">
          <h1 className="font-medium uppercase text-[#878a99]">ĐƠN HÀNG</h1>
          <div className="flex justify-between mt-6">
            <h3 className="mb-6 text-[#495057] font-semibold text-[22px]">1000</h3>
            <div className="w-12 h-12 bg-[#299cdb] rounded-lg flex justify-center items-center ">
              <IoBagOutline  className="text-white text-2xl" />
            </div>
          </div>
        </div>
        <div className="shadow-md p-4 hover:shadow-xl hover:-translate-y-2 duration-700">
          <h1 className="font-medium uppercase text-[#878a99]">KHÁCH HÀNG</h1>
          <div className="flex justify-between mt-6">
            <h3 className="mb-6 text-[#495057] font-semibold text-[22px]">1000</h3>
            <div className="w-12 h-12 bg-[#ffbe0b] rounded-lg flex justify-center items-center ">
              <FaRegUser  className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
