import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { GrDeliver } from "react-icons/gr";
import { CiCreditCard1 } from "react-icons/ci";
import { FaHeadphones } from "react-icons/fa";
function Support() {
  return (
    <div className="grid grid-cols-4 gap-4 my-[150px] z-20 relative">
      <div className="w-full py-[75px] px-[15px] rounded-xl  hover:shadow-2xl bg-[#f4f6f8]">
        <div className="w-20 h-20 bg-[#FFB524] rounded-full flex justify-center items-center mx-auto">
          <FaRegHeart className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-semibold text-xl text-[#45595b]">
            <Link>Giá Tốt</Link>
          </div>
          <div className="text-base font-normal text-[#747d88]">
            <Link>Sản phấm tốt, giá cả cạnh tranh</Link>
          </div>
        </div>
      </div>
      <div className="w-full  py-[75px] px-[15px] rounded-xl hover:shadow-2xl bg-[#f4f6f8]">
        <div className="w-20 h-20 bg-[#FFB524] rounded-full flex justify-center items-center mx-auto">
          <GrDeliver  className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-semibold text-xl text-[#45595b]">
            <Link>Miễn Phí Giao Hàng</Link>
          </div>
          <div className="text-base font-normal text-[#747d88]">
            <Link>Miễn phí giao hàng khu vực nội thành cho các đơn hàng trên 500K</Link>
          </div>
        </div>
      </div>
      <div className="w-full py-[75px] px-[15px] rounded-xl hover:shadow-2xl bg-[#f4f6f8]">
        <div className="w-20 h-20 bg-[#FFB524] rounded-full flex justify-center items-center mx-auto">
          <CiCreditCard1  className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-semibold text-xl text-[#45595b]">
            <Link>Chính Sách Hoàn Tiền</Link>
          </div>
          <div className="text-base font-normal text-[#747d88]">
            <Link>Hoàn tiền cho các sản phẩm không đúng tiêu chuẩn, chính sách của cửa hàng</Link>
          </div>
        </div>
      </div>
      <div className="w-full py-[75px] px-[15px] rounded-xl hover:shadow-2xl bg-[#f4f6f8]">
        <div className="w-20 h-20 bg-[#FFB524] rounded-full flex justify-center items-center mx-auto">
          <FaHeadphones  className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-semibold text-xl text-[#45595b]">
            <Link>Hỗ Trợ Trực Tuyến</Link>
          </div>
          <div className="text-base font-normal text-[#747d88]">
            <Link>Đường dây hỗ trợ hệ thống cửa hàng Fruitables trực tuyến 24/7</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
