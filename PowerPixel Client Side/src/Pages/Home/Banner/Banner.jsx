// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import b2 from "../../../assets/BannerImg/b2.png";
import b3 from "../../../assets/BannerImg/b3.png";
import b4 from "../../../assets/BannerImg/b4.png";
import b5 from "../../../assets/BannerImg/b5.png";

const Banner = () => {
  return (
    <div className="mt-10">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[400px]"
      >
        <SwiperSlide>
          <img className="w-full rounded h-full " src={b2} alt="Banner 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-full rounded" src={b3} alt="Banner 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-full rounded " src={b4} alt="Banner 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-full rounded " src={b5} alt="Banner 5" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
