import { Swiper, SwiperSlide } from 'swiper/react';
import { GrLinkNext } from 'react-icons/gr';
import { GrLinkPrevious } from 'react-icons/gr';
import ProductItem from '../../components/ProductItem';
import { useLazyGetAllProductsQuery } from '../../features/Product/productApi.service';
// Import Swiper styles
import 'swiper/css/bundle';
import { useRef, useEffect } from 'react';
function ShowHomeProduct2() {
  const sliderRef = useRef();

  const [getProduct, resultProducts] = useLazyGetAllProductsQuery();

  useEffect(() => {
    getProduct({
      page: 1,
      limit: 15,
    });
  }, []);

  console.log(resultProducts?.data?.data);
  return (
    <div>
      <h1 className=" flex justify-center items-center font-semibold text-3xl text-[#45595b] my-[10px]">Sản phẩm bán chạy nhất</h1>
   
      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          loop={true}
          onSwiper={(swiper) => {
            sliderRef.current = swiper;
          }}
        >
          <button
            type="button"
            onClick={() => sliderRef.current.slideNext()}
            className="absolute  top-1/2 -translate-y-1/2 right-[20px] z-20 w-12 h-12 bg-[#dbdbdb] flex justify-center items-center hover:bg-[#87b106] "
          >
            <GrLinkNext />
          </button>
          {resultProducts?.data?.data.map((product) => (
            <SwiperSlide key={product?._id}>
              <ProductItem data={product} />
            </SwiperSlide>
          ))}

          <button
            onClick={() => sliderRef.current.slidePrev()}
            className="absolute top-1/2 -translate-y-1/2 left-[20px] z-20 w-12 h-12 bg-[#dbdbdb] flex justify-center items-center hover:bg-[#87b106]"
          >
            <GrLinkPrevious />
          </button>
        </Swiper>
      </div>
    </div>
  );
}

export default ShowHomeProduct2;
