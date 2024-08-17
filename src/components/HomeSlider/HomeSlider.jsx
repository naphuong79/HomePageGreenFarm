import { Swiper, SwiperSlide } from 'swiper/react';
import { GrLinkNext } from 'react-icons/gr';
import { GrLinkPrevious } from 'react-icons/gr';

// Import Swiper styles
import 'swiper/css/bundle';
import { useRef } from 'react';
function HomeSlider() {
  const sliderRef = useRef();
  return (
    <Swiper
      className="relative"
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      onSwiper={(swiper) => {
        sliderRef.current = swiper;
      }}
    >
      <button
        onClick={() => sliderRef.current.slideNext()}
        className="absolute top-1/2 -translate-y-1/2 right-[20px] z-20 w-12 h-12 bg-[#dbdbdb] rounded-full flex justify-center items-center hover:bg-[#87b106] "
      >
        <GrLinkNext />
      </button>
      <div className="rounded-3xl bg-gradient-to-r from-black bg-[url('../../../src/img/hero-img.jpg')]">
      <SwiperSlide>
        <img className="float-right rounded-xl w-[450px] m-[150px] bg-[#FFB524]" src="../../../src/img/hero-img-1.png" alt="" />
      </SwiperSlide>
      <SwiperSlide>
      <img className="float-right rounded-xl w-[450px] m-[150px]" src="../../../src/img/hero-img-2.jpg" alt="" />

      </SwiperSlide>
      </div>
      {/* <SwiperSlide>
        <img src="../../../src/img/hero-img-2.jpg" alt="" />
      </SwiperSlide> */}
      <button
        onClick={() => sliderRef.current.slidePrev()}
        className="absolute top-1/2 -translate-y-1/2 left-[20px] z-20 w-12 h-12 bg-[#dbdbdb] rounded-full flex justify-center items-center hover:bg-[#87b106]"
      >
        <GrLinkPrevious />
      </button>
    </Swiper>
  );
}

export default HomeSlider;
