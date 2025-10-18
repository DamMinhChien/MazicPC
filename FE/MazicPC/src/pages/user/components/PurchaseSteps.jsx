import { Container, Row, Col } from "react-bootstrap";
import { FaShoppingBasket, FaLock, FaPaypal, FaPlane } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const steps = [
  {
    icon: <FaShoppingBasket size={28} />,
    bg: "bg-primary",
    text: "Thêm vào giỏ hàng",
  },
  {
    icon: <FaLock size={28} />,
    bg: "bg-dark",
    text: "Đăng nhập",
  },
  {
    icon: <FaPaypal size={28} />,
    bg: "bg-warning",
    text: "Thanh toán",
  },
  {
    icon: <FaPlane size={28} className="text-dark" />,
    bg: "bg-light",
    text: "Nhận giao hàng",
  },
];

const PurchaseSteps = () => {
  return (
    <section className="bg-danger-subtle py-5">
      <Container>
        <Row className="justify-content-center align-items-center text-center flex-nowrap">
          {steps.map((step, i) => (
            <Col
              key={i}
              xs="auto"
              className="d-flex flex-column align-items-center position-relative mx-3"
            >
              {/* Icon tròn */}
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center ${step.bg} text-white shadow-lg mb-3 step-icon`}
                style={{
                  width: "80px",
                  height: "80px",
                  transition: "transform 0.3s ease",
                }}
              >
                {step.icon}
              </div>

              {/* Text */}
              <div
                className="bg-dark text-white px-3 py-2 rounded-3 fw-medium fs-5"
                style={{
                  transform: "rotate(-2deg)",
                }}
              >
                {step.text}
              </div>

              {/* Icon mũi tên giữa các bước */}
              {i < steps.length - 1 && (
                <FaArrowRightLong
                  size={50}
                  className="text-dark position-absolute top-50 end-0 "
                  style={{
                    transform: "translate(60%, -50%) rotate(-2deg)",
                  }}
                />
              )}
            </Col>
          ))}
        </Row>
      </Container>

      {/* Hover hiệu ứng mượt */}
      <style>{`
        .step-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        }
      `}</style>
    </section>
  );
};

export default PurchaseSteps;
