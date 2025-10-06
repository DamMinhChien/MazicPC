import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ROUTERS from "../utils/router";

function BannerCarousel({ banners }) {
  const navigate = useNavigate();

  const handleClick = (productId) => {
    if (productId) {
      const path = ROUTERS.USER.PRODUCT_DETAIL.replace(":id", productId);
      navigate(path);
    }
  };

  return (
    <Carousel interval={2000} pause="hover" ride="carousel">
      {banners.filter(banner => banner.isActive).map((banner) => (
        <Carousel.Item
          key={banner.id}
          onClick={() => handleClick(banner.productId)}
          style={{ cursor: banner.productId ? "pointer" : "default" }}
        >
          <img
            className="d-block w-100"
            src={banner.imageUrl}
            alt={`Product ${banner.productId}`}
          />
          <Carousel.Caption>
            <h3>{banner.productName}</h3>
            <p>{banner.title}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerCarousel;
