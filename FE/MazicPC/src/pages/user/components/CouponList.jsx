import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CouponCard from "./CouponCard";

export default function CouponList({ coupons }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      breakpoints={{
        0: {       // mobile
          slidesPerView: 1,
        },
        768: {     // tablet
          slidesPerView: 2,
        },
        992: {     // desktop
          slidesPerView: 3,
        },
      }}
    >
      {coupons.map((c) => (
        <SwiperSlide key={c.id}>
          <CouponCard coupon={c} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
