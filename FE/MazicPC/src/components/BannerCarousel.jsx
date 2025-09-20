import { Carousel } from "react-bootstrap";

function BannerCarousel() {
  return (
    <Carousel interval={2000} pause="hover" ride="carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/id/1018/1200/400"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Slide 1</h3>
          <p>Mô tả cho slide 1</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/id/1015/1200/400"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Slide 2</h3>
          <p>Mô tả cho slide 2</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default BannerCarousel;
