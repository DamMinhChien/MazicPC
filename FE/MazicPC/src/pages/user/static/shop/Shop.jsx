import { Carousel, Col, Row, Tab, Tabs } from "react-bootstrap";
import { FaCar, FaCogs, FaCreditCard, FaInfoCircle, FaLaptop, FaShopify, FaUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";

const Shop = () => {
  return (
    <div className="p-4 bg-white">
      <div className="container p-3 mb-4">
        <h1 className="text-center my-2">Cửa hàng của chúng tôi</h1>
        <p className="text-center my-2">
          Đến tận nơi và thỏa sức lựa chọn sản phẩm
        </p>
      </div>
      <div className="p-4 shadow-lg bg-light text-dark rounded-2 container mb-5">
        <Tabs
          defaultActiveKey="info"
          id="product-tabs"
          className="mb-4 border-0 justify-content-center"
          fill
        >
          <Tab
            eventKey="info"
            title={
              <span className="d-flex align-items-center justify-content-center gap-2 fw-semibold text-primary fs-5">
                <FaShopify />
                Thái Hà
              </span>
            }
          >
            <Row className="p-2 text-dark">
              <Col md={6}>
                <h3 className="fw-bold">Cửa hàng Thái Hà</h3>
                <p>
                  Số nhà 69, ngõ 96 Phố Thái Hà, Đống Đa, Hà Nội
                  <br />
                  (08) 1234 5678
                </p>
                <h6 class="fw-bold">Thời gian mở cửa:</h6>
                <p>
                  <strong>Thứ Hai - Thứ Bảy:</strong> 9:00 sáng - 9:00 tối
                  <br />
                  <strong>Chủ Nhật:</strong> 10:00 sáng - 6:00 tối
                </p>
              </Col>
              <Col md={6}>
                <img
                  src="./showroom/hd.jpg"
                  alt="Cửa hàng Thái Hà"
                  className="w-100"
                ></img>
              </Col>
            </Row>
          </Tab>

          <Tab
            eventKey="specs"
            title={
              <span className="d-flex align-items-center justify-content-center gap-2 fw-semibold text-primary fs-5">
                <FaShopify />
                Hà Đông
              </span>
            }
          >
            <Row className="p-2 text-dark">
              <Col md={6}>
                <h3 className="fw-bold">Cửa hàng Hà Đông</h3>
                <p>
                  Số nhà 69, ngõ 96 đường Lê Trọng Tấn, Hà Đông, Hà Nội
                  <br />
                  (08) 1234 5678
                </p>
                <h6 class="fw-bold">Thời gian mở cửa:</h6>
                <p>
                  <strong>Thứ Hai - Thứ Bảy:</strong> 9:00 sáng - 9:00 tối
                  <br />
                  <strong>Chủ Nhật:</strong> 10:00 sáng - 6:00 tối
                </p>
              </Col>
              <Col md={6}>
                <img
                  src="./showroom/th.jpg"
                  alt="Cửa hàng Thái Hà"
                  className="w-100"
                ></img>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </div>

      <section className="container">
        <Row className="mt-5 gap-4 flex-lg-nowrap">
          {/* LEFT COLUMN */}
          <Col
            lg={6}
            xs={12}
            className="mb-4 border border-secondary rounded-5 p-4"
          >
            <div>
              <h4>MazicPC Thái Hà</h4>
              <h6 className="d-flex align-items-center">
                <i className="bi bi-clock me-3"></i>8:00 - 22:00
              </h6>
              <h6 className="d-flex align-items-center">
                <i className="bi bi-geo-alt me-3"></i>Số nhà 69, ngõ 96 đường Lê Trọng Tấn, Hà Đông, Hà Nội
              </h6>
              <h6 className="d-flex align-items-center">
                <i className="bi bi-telephone me-3"></i>024 1234 5678
              </h6>
            </div>

            <div className="mt-4">
              <h4>MazicPC Hà Đông</h4>
              <h6 className="d-flex align-items-center">
                <i className="bi bi-clock me-3"></i>8:00 - 22:00
              </h6>
              <h6 className="d-flex align-items-center">
                <i className="bi bi-geo-alt me-3"></i>Số nhà 69, ngõ 96 đường Lê Trọng Tấn, Hà Đông, Hà Nội
              </h6>
              <h6 className="d-flex align-items-center">
                <i className="bi bi-telephone me-3"></i>0236 123 4567
              </h6>
            </div>

            <p className="mt-4">
              Tự hào là một trong những đơn vị hàng đầu trong lĩnh vực kinh
              doanh laptop, linh kiện laptop tại Hà Nội, Với trên 15 năm kinh
              nghiệm, theo phương châm "Uy tín trên từng sản phẩm" cùng hơn
              100.000 khách hàng thân thiết, chúng tôi cam kết tất cả các sản
              phẩm laptop bán ra đều có chất lượng tốt nhất trên thị trường hiện
              nay. Tất cả laptop, linh kiện tại showroom đều được bảo hành chuẩn
              chỉ theo quy chế của các hãng.
            </p>

            {/* CAROUSEL */}
            <Carousel interval={2000} className="p-4 mt-2">
              <Carousel.Item>
                <img className="d-block w-100 rounded-4" src="./showroom/th.jpg" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100 rounded-4" src="./showroom/hd.jpg" />
              </Carousel.Item>
            </Carousel>
          </Col>

          {/* RIGHT COLUMN */}
          <Col
            lg={6}
            xs={12}
            className="mb-4 border border-secondary rounded-5 p-4"
          >
            <p>
              MazicPC là thương hiệu bán laptop, linh kiện laptop cao
              cấp được thành lập và đi vào hoạt động bán lẻ từ năm 2008.
            </p>

            <Row className="g-4 mt-4 mb-4">
              {/* Item 1 */}
              <Col xs={12} lg={6}>
                <div className="border border-secondary rounded-5 p-2 h-100">
                  <Row>
                    <Col xs={2}>
                      <FaCar className="fs-2" />
                    </Col>
                    <Col xs={10}>
                      <h4>Gửi xe miễn phí</h4>
                      <p>
                        Khách hàng được hỗ trợ gửi xe miễn phí tại cửa hàng
                        MazicPC.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>

              {/* Item 2 */}
              <Col xs={12} lg={6}>
                <div className="border border-secondary rounded-5 p-2 h-100">
                  <Row>
                    <Col xs={2}>
                      <FaUser className="fs-2" />
                    </Col>
                    <Col xs={10}>
                      <h4>Nhân viên tư vấn</h4>
                      <p>
                        Đội ngũ nhân viên thân thiện, hỗ trợ bạn chọn lựa trang
                        phục phù hợp.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>

              {/* Item 3 */}
              <Col xs={12} lg={6}>
                <div className="border border-secondary rounded-5 p-2 h-100">
                  <Row>
                    <Col xs={2}>
                      <FaLaptop className="fs-2" />
                    </Col>
                    <Col xs={10}>
                      <h4>Laptop đa dạng</h4>
                      <p>
                        Sản phẩm phong phú, theo xu hướng, phù hợp nhiều nhu cầu học tâp và làm việc.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>

              {/* Item 4 */}
              <Col xs={12} lg={6}>
                <div className="border border-secondary rounded-5 p-2 h-100">
                  <Row>
                    <Col xs={2}>
                      <FaCreditCard className="fs-2" />
                    </Col>
                    <Col xs={10}>
                      <h4>Thanh toán linh hoạt</h4>
                      <p>
                        Chấp nhận nhiều hình thức thanh toán như thẻ tín dụng và
                        ví điện tử.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            {/* CAROUSEL */}
            <Carousel interval={2000} className="p-4">
              <Carousel.Item>
                <img className="d-block w-100 rounded-4" src="./banner/1.jpg" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100 rounded-4" src="./banner/2.jpg" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100 rounded-4" src="./banner/3.jpg" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100 rounded-4" src="./banner/4.jpg" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100 rounded-4" src="./banner/7.jpg" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100 rounded-4" src="./banner/8.jpg" />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Shop;
