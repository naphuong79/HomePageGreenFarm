import { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { useLazyGetAllProductsQuery } from '../../features/Product/productApi.service';

function ShowHomeProduct() {
  const [activeBtn, setActiveBtn] = useState('all');
  const [getProduct, resultProducts] = useLazyGetAllProductsQuery();

  useEffect(() => {
    getProduct({
      page: 1,
      limit: 8,
      category: activeBtn === 'all' ? null : activeBtn
    });
  }, [activeBtn]);

  console.log(resultProducts?.data?.data);

  return (
    <div>
      <h1 className=" flex justify-center items-center font-black text-2xl  ">Sản phẩm hữu cơ của chúng tôi</h1>
  
      <div className="flex justify-center gap-8 py-[37px]">
        <button
          type="button"
          onClick={() => setActiveBtn('all')}
          className={`text-base text-[#747d88] p-2 m-2 rounded-3xl bg-[#f4f6f8] hover:text-[#87b106] font-normal ${activeBtn === 'all' && 'text-brown-50' && 'bg-[#FFB524]'}`}
        >
          Tất cả sản phẩm
        </button>
        <button
          type="button"
          onClick={() => setActiveBtn('65f5104644d16788d8f0f383')}
          className={`text-base text-[#747d88] p-2 m-2 rounded-3xl bg-[#f4f6f8] hover:text-[#87b106] font-normal ${activeBtn === '65f5104644d16788d8f0f383' && 'text-brown-50' && 'bg-[#FFB524]'}`}
        >
          Rau xanh
        </button>
        <button
          type="button"
          onClick={() => setActiveBtn('65f5105e44d16788d8f0f384')}
          className={`text-base text-[#747d88] p-2 m-2 rounded-3xl bg-[#f4f6f8] hover:text-[#87b106] font-normal ${activeBtn === '65f5105e44d16788d8f0f384' && 'text-brown-50' && 'bg-[#FFB524]'}`}
        >
          Trái cây
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {resultProducts?.data?.data.map((product, index) => <ProductItem key={index} data={product} />)}
      </div>
    </div>
  );
}

export default ShowHomeProduct;
