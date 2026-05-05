import { Swiper, SwiperSlide } from "swiper/react";

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
    <div className="mt-6 sm:mt-10 mx-auto">
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
        className="mySwiper h-[220px] sm:h-[320px] lg:h-[420px] overflow-hidden rounded"
      >
        <SwiperSlide>
          <img className="w-full h-full object-cover" src={b2} alt="Banner 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-full object-cover" src={b3} alt="Banner 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-full object-cover" src={b4} alt="Banner 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-full object-cover" src={b5} alt="Banner 5" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
