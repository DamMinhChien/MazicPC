import { Col, Container, Row } from "react-bootstrap";
import SocialIcon from "../../../../components/SocialIcon";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import ROUTERS from "../../../../utils/router";
import { MdArrowOutward } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-light text-dark p-4">
      <Container fluid>
        <Row>
          {/* Col 1 */}
          <Col lg={3} md={6} sm>
            <h6 className="fw-bold">CÔNG TY TNHH MAZICPC VIỆT NAM</h6>
            <ul className="list-unstyled">
              <li>Địa chỉ: Số 18, ngõ 121, Thái Hà, Đống Đa, Hà Nội</li>
              <li>Hotline: 0825 233 233</li>
              <li>Email: laptopaz2025@gmail.com</li>
              <li className="d-flex gap-2 mt-2">
                <SocialIcon
                  icon={<FaFacebookF />}
                  link="https://facebook.com"
                  size={45}
                  bgColor="#4267B2"
                />
                <SocialIcon
                  icon={<FaInstagram />}
                  link="https://instagram.com"
                  size={45}
                  bgColor="#E1306C"
                />
                <SocialIcon
                  icon={<FaYoutube />}
                  link="https://youtube.com"
                  size={45}
                  bgColor="#FF0000"
                />
                <SocialIcon
                  icon={<FaTiktok />}
                  link="https://tiktok.com"
                  size={45}
                  bgColor="#010101"
                />
              </li>
            </ul>
          </Col>

          {/* Col 2 */}
          <Col lg={3} md={6} sm>
            <h6 className="fw-bold">THÔNG TIN CÔNG TY</h6>
            <ul className="list-unstyled">
              <li>
                <Link to={ROUTERS.USER.GIOI_THIEU_CONG_TY}>
                  Giới thiệu công ty
                </Link>
              </li>
              <li>
                <a href="#">Tuyển dụng</a>
              </li>
              <li>
                <a href="http://online.gov.vn/Home/WebDetails/130444?AspxAutoDetectCookieSupport=1">
                  <img src="/bct.png" alt="bct" />
                </a>
              </li>
            </ul>
          </Col>

          {/* Col 3 */}
          <Col lg={3} md={6} sm>
            <h6 className="fw-bold">CHÍNH SÁCH CÔNG TY</h6>
            <ul className="list-unstyled">
              <li>
                <Link to={ROUTERS.USER.CHINH_SACH_CHAT_LUONG}>
                  Chính sách chất lượng
                </Link>
              </li>
              <li>
                <Link to={ROUTERS.USER.CHINH_SACH_BAO_HANH_BAO_TRI}>
                  Chính sách bảo hành - bảo trì
                </Link>
              </li>
              <li>
                <Link to={ROUTERS.USER.CHINH_SACH_DOI_TRA}>
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link to={ROUTERS.USER.CHINH_SACH_BAO_MAT_THONG_TIN}>
                  Chính sách bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link to={ROUTERS.USER.CHINH_SACH_VAN_CHUYEN}>
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link to={ROUTERS.USER.CHINH_SACH_VE_SINH_LAPTOP}>
                  Chính sách vệ sinh Laptop
                </Link>
              </li>
            </ul>
          </Col>

          {/* Col 4 */}
          <Col lg={3} md={6} sm>
            <h6 className="fw-bold">HỆ THỐNG CỬA HÀNG MAZICPC</h6>
            <ul className="list-unstyled">
              <li className="fw-bold">MAZICPC cơ sở Thái Hà</li>
              <li>Số 18, ngõ 121, Thái Hà, Đống Đa, Hà Nội</li>
              <li>
                <a href="tel:0825233233">Hotline: 0825 233 233</a>
              </li>
              <li className="d-flex align-items-center gap-2">
                <strong>Xem chỉ đường</strong>
                <SocialIcon
                  icon={<MdArrowOutward />}
                  size={30}
                  link="https://www.google.com/maps/place/LaptopAZ.vn+-+H%E1%BB%87+Th%E1%BB%91ng+B%C3%A1n+Laptop+v%C3%A0+Ph%E1%BB%A5+Ki%E1%BB%87n+Uy+T%C3%ADn/@21.0125382,105.8188835,19z/data=!3m1!4b1!4m5!3m4!1s0x3135ac82787208a5:0x9a791b75b791245f!8m2!3d21.0125382!4d105.8194307?hl=vi-VN&shorturl=1"
                />
              </li>
              <li>Số 56 Trần Phú, Hà Đông, Hà Nội</li>
              <li className="d-flex align-items-center gap-2">
                <strong>Xem chỉ đường</strong>
                <SocialIcon
                  icon={<MdArrowOutward />}
                  size={30}
                  link="https://www.google.com/maps/place/56+Tr%E1%BA%A7n+Ph%C3%BA,+P.+M%E1%BB%99+Lao,+H%C3%A0+%C4%90%C3%B4ng,+H%C3%A0+N%E1%BB%99i/@20.9812763,105.7865878,17z/data=!3m1!4b1!4m5!3m4!1s0x3135acce62e6dca3:0xa771487dd5bbbf65!8m2!3d20.9812763!4d105.7887765?hl=vi-VN&shorturl=1"
                />
              </li>
              <li>Bán hàng: Từ 8h30 - 18h00</li>
              <li>Kỹ thuật: Từ 8h30 - 12h & 13h30 - 17h30</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
