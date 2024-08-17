import { Link } from "react-router-dom";
import { FaUsers } from 'react-icons/fa';
import { FaServicestack } from "react-icons/fa";
import { FaCertificate } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
function CategoryItem() {
  return (
    // <div className='grid grid-cols-3 gap-4'>
    //   <div>
    //     <h1 className="font-black pb-[30px] text-2xl"></h1>
    //     <p className="pb-[30px] text-[#555555]"></p>
    //     <div>
    //       <img src="https://htmldemo.net/pullman/pullman/assets/img/category/group-1.jpg" className="w-full" />
    //     </div>
    //   </div>
    //   <div>
    //     <h1 className="font-black pb-[30px] text-2xl"></h1>
    //     <p className="pb-[30px] text-[#555555]"></p>
    //     <div>
    //       <img src="https://htmldemo.net/pullman/pullman/assets/img/category/group-1.jpg" className="w-full" />
    //     </div>
    //   </div>
    //   <div>
    //     <h1 className="font-black pb-[30px] text-2xl"></h1>
    //     <p className="pb-[30px] text-[#555555]"></p>
    //     <div>
    //       <img src="https://htmldemo.net/pullman/pullman/assets/img/category/group-1.jpg" className="w-full" />
    //     </div>
    //   </div>
    // </div>
    <div className="grid grid-cols-4 gap-4 my-[150px] z-20 relative">
      <div className="w-full py-[75px] px-[15px] rounded-xl  hover:shadow-2xl bg-[#f4f6f8]">
        <div className="w-20 h-20 bg-[#FFB524] rounded-full flex justify-center items-center mx-auto">
          <FaUsers className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-semibold text-2xl text-[#81c408]">
            <Link className="uppercase">Khách hàng <br /> hài lòng</Link>
          </div>
          <div className="text-3xl font-semibold text-[#747d88]">
            <Link>1987</Link>
          </div>
        </div>
      </div>
      <div className="w-full  py-[75px] px-[15px] rounded-xl hover:shadow-2xl bg-[#f4f6f8]">
        <div className="w-20 h-20 bg-[#FFB524] rounded-full flex justify-center items-center mx-auto">
          <FaServicestack  className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-semibold text-2xl text-[#81c408]">
            <Link className="uppercase">Chất lượng <br /> dịch vụ</Link>
          </div>
          <div className="text-3xl font-semibold text-[#747d88]">
            <Link>99%</Link>
          </div>
        </div>
      </div>
      <div className="w-full py-[75px] px-[15px] rounded-xl hover:shadow-2xl bg-[#f4f6f8]">
        <div className="w-20 h-20 bg-[#FFB524] rounded-full flex justify-center items-center mx-auto">
          <FaCertificate  className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-semibold text-2xl text-[#81c408]">
            <Link className="uppercase">Chứng nhận <br /> chất lượng</Link>
          </div>
          <div className="text-3xl font-semibold text-[#747d88]">
            <Link>34</Link>
          </div>
        </div>
      </div>
      <div className="w-full py-[75px] px-[15px] rounded-xl hover:shadow-2xl bg-[#f4f6f8]">
        <div className="w-20 h-20 bg-[#FFB524] rounded-full flex justify-center items-center mx-auto">
          <FaProductHunt  className="w-10 h-10 text-white" />
        </div>
        <div className="mt-[42px] text-center">
          <div className="mb-5 font-semibold text-2xl text-[#81c408]">
            <Link className="uppercase">Sản phẩm <br /> có sẵn</Link>
          </div>
          <div className="text-3xl font-semibold text-[#747d88]">
            <Link>100+</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryItem;
