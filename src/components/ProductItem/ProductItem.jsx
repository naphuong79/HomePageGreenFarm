import { FaCartShopping } from 'react-icons/fa6';
import { MdFiberNew } from 'react-icons/md';
import { addCart } from "../../features/Cart/cartSlice";
import { useDispatch } from "react-redux";
import { errorNotify, successNotify } from "../Toast/Toastify";
import { useFormatCurrency } from "../../hooks/useFormatNumber";


import { Link } from 'react-router-dom';
function ProductItem({data}) {
  const dispatch = useDispatch();
  const addToCart = () => {
      if (data?.stock === 0) return successNotify("Sản phẩm đã hết hàng");
      dispatch(
          addCart({
              ...data,
              quantity: 1,
          }),
      );
      successNotify("Thêm vào giỏ hàng thành công");
  };

  return (
    <div className="w-full border border-[#ffb524]">
      <div className="w-full ">
        <Link to={`/product/${data?.slug}`}>
          <img src={data?.imageMain} className="w-full" alt='' />
        </Link>
      </div>
      <div className="flex justify-between py-[26px] px-[10px]">
        <div>
          <div>
            <Link to={`/product/${data?.slug}`} className="font-normal uppercase text-base  hover:text-[#7aa93c]">{data?.name}</Link>
          </div>
          <div className="mt-[15px]">
            <del className="mr-[5px] text-[#999999] ">{useFormatCurrency(data?.price)}</del>
            <span className="text-[#D26B21]">{useFormatCurrency(data?.sale_price)}</span>
          </div>
        </div>
        <div>
          <button onClick={addToCart} className="w-10 h-10 bg-[#7aa93c] rounded-full flex justify-center items-center hover:bg-[#d26b31]">
            <FaCartShopping className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
