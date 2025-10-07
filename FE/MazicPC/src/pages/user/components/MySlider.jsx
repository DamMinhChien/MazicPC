import { Navigation, Scrollbar, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MyCard from "../../../components/MyCard";
import styles from "@styles/Slider.module.css"

const MySlider = ({ products, maxItem }) => {
  return (
    <div className={`w-100 p-2 ${styles.swiperContainer}`}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        slidesPerView={3}
        effect="slide" // chọn hiệu ứng hiển thị (coverflow, slide, fade, cube,...)
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={10}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoHeight
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {products.slice(0, maxItem).map((product) => (
          <SwiperSlide key={product.id}>
            <MyCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MySlider;
