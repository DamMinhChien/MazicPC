import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import shippingGif from "/icons/shipping.gif";
import mapGif from "/icons/map.gif";
import returnGif from "/icons/return.gif";
import paymentGif from "/icons/payment.gif";
import phoneGif from "/icons/phone.gif";
import ROUTERS from "../../../utils/router";

const FooterPolicy = () => {
  const navigate = useNavigate();

  const policies = [
    {
      icon: shippingGif,
      text: "Giao hàng miễn phí toàn quốc",
      link: ROUTERS.USER.CHINH_SACH_VAN_CHUYEN,
    },
    {
      icon: mapGif,
      text: "Mua hàng từ xa",
      link: ROUTERS.USER.CHINH_SACH_VAN_CHUYEN,
    },
    {
      icon: returnGif,
      text: "Đổi trả hàng trong 15 ngày",
      link: ROUTERS.USER.CHINH_SACH_DOI_TRA,
    },
    {
      icon: paymentGif,
      text: "Thanh toán linh hoạt: tiền mặt, visa/master, trả góp",
      link: ROUTERS.USER.CHINH_SACH_BAO_MAT_THONG_TIN,
    },
    {
      icon: phoneGif,
      text: (
        <>
          Hỗ trợ suốt thời gian
          <br />
          Hotline: <span className="text-danger">0825 233 233</span>
        </>
      ),
      link: "tel:0825233233",
    },
  ];

  return (
    <div className="footer-policy py-4 bg-light border-top">
      <div>
        <Row className="gy-3 justify-content-center align-items-center text-center text-md-start d-flex">
          {policies.map((item, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={2}
              className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 policy-item bg-white p-2"
              onClick={() =>
                item.link.startsWith("tel")
                  ? (window.location.href = item.link)
                  : navigate(item.link)
              }
              style={{ cursor: "pointer" }}
            >
              <div className="icon-footer d-flex align-items-center justify-content-center">
                <img
                  src={item.icon}
                  alt="policy icon"
                  className="policy-gif"
                  width="48"
                  height="48"
                />
              </div>
              <div className="policy-text small fw-semibold">{item.text}</div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FooterPolicy;
