import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import Zoom from "react-medium-image-zoom";

// props: image = [{ id, name, image, price }, ...]
const My3DSlider = ({ images }) => {
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={2} // hiển thị 3 slide chính giữa
      loop
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      navigation
      modules={[EffectCoverflow, Pagination, Navigation]}
    >
      {images
        .filter((img) => img.isPrimary)
        .map((image, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Zoom>
                <img
                  src={image.imageUrl}
                  alt={`image-img-${index}`}
                  className="w-100"
                />
              </Zoom>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default My3DSlider;
