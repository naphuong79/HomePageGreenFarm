import { FaCircleCheck } from 'react-icons/fa6';
import { Button, Divider, Flex, Radio } from 'antd';
import { useGetProductBySlugQuery } from '../../features/Product/productApi.service';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addCart } from '../../features/Cart/cartSlice';
import { useFormatCurrency } from '../../hooks/useFormatNumber';
import { useDispatch } from 'react-redux';
import { errorNotify, successNotify } from "../../components/Toast/Toastify";
import ProductItem from '../../components/ProductItem/ProductItem';

function ShopDetail() {
  const { slug } = useParams();
  const productSulg = useGetProductBySlugQuery(slug);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };


  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (isNaN(quantity)) {
      setQuantity(1);
    } else if (Number(quantity) < 1) {
      errorNotify('Số lượng phải lớn hơn 0');
    } else {
      if (quantity > 100) {
        errorNotify('Số lượng phải nhỏ hơn 100');
        setQuantity(100);
      }
    }
  }, [quantity]);

  const handleAddCart = (product) => {
    if (product?.stock === 0) return successNotify('Sản phẩm đã hết hàng');
    if (product?.category?._id === '65478f85e8e95c92d750a1fd') return errorNotify('Sản phẩm sắp về');
    dispatch(addCart({ ...product, quantity: Number(quantity) }));
    successNotify('Thêm vào giỏ hàng thành công');
  };

  return (
    <div className="container mx-auto">
      <div className="flex py-20">
        <div className="w-2/5 px-[15px]">
          <div className="overflow-hidden">
            <img className="w-[470px] h-[352px] object-cover" src={productSulg?.data?.data?.imageMain} alt="" />
          </div>
          <div className="mt-5 flex gap-5">
            {productSulg?.data?.data?.imageCollection.map((imageCollection, index) => (
              <button type="button" className="w-[103px] h-full">
                <img className="object-cover w-full" src={imageCollection} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="w-3/5 px-[15px]">
          <h2 className="text-2xl font-semibold pb-[15px]">{productSulg?.data?.data?.name}</h2>
          <div className="">
            <span className="line-through pr-[5px] text-[#999]">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                productSulg?.data?.data?.price,
              )}
            </span>
            <span className="font-bold text-2xl text-[#d26b31]">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                productSulg?.data?.data?.sale_price,
              )}
            </span>
          </div>
          <div className="flex items-center pt-[20px] pb-[30px] uppercase text-[#555555]">
            <FaCircleCheck className="text-[#87b106] mr-4" />
            <span>Trong kho còn {productSulg?.data?.data?.stock} KG</span>
          </div>
          <p className="mb-5 text-[#555555] text-base font-normal">{productSulg?.data?.data?.description_summary}</p>
          <div className="flex">
            <span className="flex items-center mr-[10px] text-[#222222] font-bold">Số lượng:</span>
            <div className="rounded-[50px] px-[15px] mr-[15px] border border-gray-300 h-10 w-[90px] flex items-center justify-between">
              <button onClick={handleDecreaseQuantity}>-</button>
              <input className="w-[20px] focus:border-none h-full focus:outline-none px-auto text-center bg-white" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
            <button
              onClick={() => handleAddCart(productSulg?.data?.data)}
              className="bg-[#87b106] text-[#fff] h-10 px-[25px] rounded-[50px]"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <ul className="flex">
          <li className="border border-gray-300 p-[8px]">
            <a href="#">Mô tả</a>
          </li>
        </ul>
        <p className="border border-gray-300 text-[#555555] text-base font-normal p-5">
          {productSulg?.data?.data?.description}
        </p>
      </div>
      <div className="py-20 text-center w-[600px] mx-auto">
        <h3 className="font-black text-2xl">SẢN PHẨM LIÊN QUAN</h3>
        {/* <h4 className="pt-[14px] text-[#777777] font-normal">
          Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius claritas est etiam processus
          dynamicus, qui sequitur mutationem.
        </h4> */}
      </div>
    </div>
  );
}

export default ShopDetail;
