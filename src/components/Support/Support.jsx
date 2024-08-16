import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { GrDeliver } from "react-icons/gr";
import { CiCreditCard1 } from "react-icons/ci";
import { FaHeadphones } from "react-icons/fa";
function Support() {
  return (
    <div className="grid grid-cols-4 gap-4 -mt-[40px] z-20 relative">
      <div className="w-full py-[75px] px-[15px] border border-[#e5e5e5] hover:shadow-2xl bg-white">
        <div className="w-20 h-20 bg-[#7aa93c] rounded-full flex justify-center items-center mx-auto">
          <FaRegHeart className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-normal text-xl">
            <Link>GÍA TỐT</Link>
          </div>
          <div className="text-base text-[#777777]">
            <Link>Sản phấm tốt, giá cả cạnh tranh</Link>
          </div>
        </div>
      </div>
      <div className="w-full py-[75px] px-[15px] border border-[#e5e5e5] hover:shadow-2xl bg-white">
        <div className="w-20 h-20 bg-[#7aa93c] rounded-full flex justify-center items-center mx-auto">
          <GrDeliver  className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-normal text-xl">
            <Link>MIỄN PHÍ GIAO HÀNG</Link>
          </div>
          <div className="text-base text-[#777777]">
            <Link>Miễn phí giao hàng khu vực nội thành cho các đơn hàng trên 500K</Link>
          </div>
        </div>
      </div>
      <div className="w-full py-[75px] px-[15px] border border-[#e5e5e5] hover:shadow-2xl bg-white">
        <div className="w-20 h-20 bg-[#7aa93c] rounded-full flex justify-center items-center mx-auto">
          <CiCreditCard1  className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-normal text-xl">
            <Link>CHÍNH SÁCH HOÀN TIỀN</Link>
          </div>
          <div className="text-base text-[#777777]">
            <Link>Hoàn tiền cho các sản phẩm không đúng tiêu chuẩn, chính sách của cửa hàng</Link>
          </div>
        </div>
      </div>
      <div className="w-full py-[75px] px-[15px] border border-[#e5e5e5] hover:shadow-2xl bg-white">
        <div className="w-20 h-20 bg-[#7aa93c] rounded-full flex justify-center items-center mx-auto">
          <FaHeadphones  className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-normal text-xl">
            <Link>HỖ TRỢ TRỰC TUYẾN</Link>
          </div>
          <div className="text-base text-[#777777]">
            <Link>Đường dây hỗ trợ hệ thống cửa hàng Pets Care trực tuyến 24/7</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
